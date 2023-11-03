<script setup lang="ts">
import { nextTick, onMounted, ref, toRefs } from 'vue'
import { io, Socket } from 'socket.io-client'
import { useSystemStore } from '@/store/modules/systemStore/systemStore'
import { useChatStore } from '@/store/modules/chatStore/chatStore'
import { MessageAvatar } from './components/MessageAvatar/index'
import { updateUserInfo } from '@/api/path/chat.api'

const { userInfo } = toRefs(useSystemStore())
let { map, socket } = toRefs(useChatStore()) as any
onMounted(() => {
  loadMapScript() // 加载百度地图资源
})
// 初始化地图

const init = () => {
  const BMap = window.BMap // 注意要带window，不然会报错（注意官方api,会有改动，之前是Bmap,后面3.0版本改为了BMap,最好查文档或者打印一下window）
  map = new BMap.Map('map') // allmap必须和dom上的id一直
  map.centerAndZoom(new BMap.Point(104.04263635868074, 30.556100647961866), 11) // 初始化地图,设置中心点坐标和地图级别
  map.setCurrentCity('成都')
  map.enableScrollWheelZoom(true)
  // 获取定位
  const geolocation = new BMap.Geolocation()
  geolocation.getCurrentPosition(async (res: any) => {
    console.log(res, 'res')
    const point = new BMap.Point(res.longitude, res.latitude)
    await updateUserInfo({
      userId: userInfo.value.userId,
      lng: point.lng,
      lat: point.lat
    })
    map.centerAndZoom(point, 17) // 初始化地图,设置中心点坐标和地图级别
    const marker = new BMap.Marker(point)
    const marker2 = new BMap.Marker(new BMap.Point(121.313307, 31.133756))
    map.addOverlay(marker)
    map.addOverlay(marker2)
  })
}
const loadMapScript = () => {
  // 此处在所需页面引入资源就是，不用再public/index.html中引入
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.className = 'loadmap' // 给script一个类名
  script.src = 'https://api.map.baidu.com/getscript?v=3.0&ak=sfo3vk4lAtLo8w4qscWp418wOQIVVTb9'
  // 此处需要注意：申请ak时，一定要应用类别一定要选浏览器端，不能选服务端，不然地图会报ak无效
  script.onload = () => {
    // 使用script.onload，待资源加载完成，再初始化地图
    init()
  }
  const loadmap = document.getElementsByClassName('loadmap')
  if (loadmap) {
    // 每次append script之前判断一下，避免重复添加script资源标签
    for (let i = 0; i < loadmap.length; i++) {
      document.body.removeChild(loadmap[i])
    }
  }

  document.body.appendChild(script)
}

const message = ref('')
// 发送消息
const handleSend = () => {
  console.log(message, 'message')
  // 向服务器发送消息
  socket.emit('sendToServer', {
    userId: userInfo.value.userId,
    message: message.value
  })
  message.value = ''
}

// socket = io('ws://192.168.1.144:4445')
socket = io('wss://vueark.com')

// 与服务器连接成功
socket.on('connect', () => {
  console.log('socket链接成功！' + socket.id)
})

// 聊天记录显示
const messageRecord = ref([
  {
    message: '我是客户端,来陪我聊聊-1',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPtVM31ouveAZu8XIgufiVHvpzVgiLyaqOBS-Oef-b&s',
    isOwn: false
  }
])
// 接收服务器发送的消息
socket.on('sendToClient', ({ data }: any) => {
  console.log(data)
  const { message, userId } = data
  // 判断是否是自己发送的消息
  if (userInfo.value.userId === userId) {
    messageRecord.value.push({
      message,
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPtVM31ouveAZu8XIgufiVHvpzVgiLyaqOBS-Oef-b&s',
      isOwn: true
    })
    // 滚动到底部
    nextTick(() => {
      recordRef.value.scrollBy({ left: 0, top: 10000000 })
    })
    return
  } else {
    messageRecord.value.push({
      message,
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPtVM31ouveAZu8XIgufiVHvpzVgiLyaqOBS-Oef-b&s',
      isOwn: false
    })
  }
})
const recordRef = ref()
</script>

<template>
  <div id="map" />
  <div class="chat">
    <!-- 聊天记录 -->
    <n-scrollbar ref="recordRef" class="chat__record" trigger="hover">
      <div
        v-for="(item, index) in messageRecord"
        :key="index"
        :class="{ chat__message: !item.isOwn, 'chat__own-message': item.isOwn }"
      >
        <MessageAvatar :item="item" v-if="!item.isOwn"></MessageAvatar>
        <div class="message-content">
          {{ item.message }}
        </div>
        <MessageAvatar :item="item" v-if="item.isOwn"></MessageAvatar>
      </div>
    </n-scrollbar>
    <!-- 发送框 -->
    <div style="padding: 12px">
      <n-divider style="margin: 0" />
      <n-input
        class="chat__input"
        autofocus
        type="textarea"
        placeholder=""
        :autosize="{
          minRows: 3,
          maxRows: 5
        }"
        v-model:value="message"
        @keyup.enter="handleSend"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
#map {
  height: 100vh;
}

.chat {
  width: 400px;
  height: calc(100vh - 20px);
  position: fixed;
  right: 10px;
  top: 10px;
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  &__record {
    flex: 1;

    .chat__message {
      display: flex;
      justify-content: flex-start;
      //margin-bottom: 10px;
      margin: 10px 0;

      .message-content {
        background-color: #e1e8ed;
        border-radius: 8px;
        padding: 10px;
        word-wrap: break-word;
        max-width: 80%;
      }
    }

    .chat__own-message {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 10px;

      .message-content {
        background-color: #dcf8c6;
        border-radius: 8px;
        padding: 10px;
        word-wrap: break-word;
        max-width: 80%;
      }
    }
  }

  &__input {
    margin-top: 10px;
    border: none;
  }
}

::v-deep .chat__input .n-input__border {
  border: none !important;
}
</style>
