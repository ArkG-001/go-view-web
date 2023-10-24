<template>
  <!-- 选中内容 -->
  <div class="go-chart-data-pond">
    <n-card class="n-card-shallow">
      <setting-item-box name="请求名称" :alone="true">
        <n-input size="small" :placeholder="pondData?.dataPondName || '暂无'" :disabled="true">
          <template #prefix>
            <n-icon :component="FishIcon" />
          </template>
        </n-input>
      </setting-item-box>

      <setting-item-box name="接口地址" :alone="true">
        <n-input size="small" :placeholder="pondData?.dataPondRequestConfig.requestUrl || '暂无'" :disabled="true">
          <template #prefix>
            <n-icon :component="FlashIcon" />
          </template>
        </n-input>
      </setting-item-box>

      <div class="edit-text" @click="controlModelHandle">
        <div class="go-absolute-center">
          <n-button type="primary" secondary>编辑配置socket</n-button>
        </div>
      </div>
    </n-card>
  </div>

  <setting-item-box :alone="true">
    <template #name>
      测试
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-icon size="21" :depth="3">
            <help-outline-icon></help-outline-icon>
          </n-icon>
        </template>
        默认赋值给 dataset 字段
      </n-tooltip>
    </template>
    <n-button type="primary" ghost @click="sendHandle">
      <template #icon>
        <n-icon>
          <flash-icon />
        </n-icon>
      </template>
      连接测试
    </n-button>
    <n-button type="primary" ghost @click="offHandle">
      <template #icon>
        <n-icon>
          <flash-icon />
        </n-icon>
      </template>
      断开连接
    </n-button>
  </setting-item-box>

  <!-- 底部数据展示 -->
  <chart-data-matching-and-show :show="showMatching && !loading" :ajax="true"></chart-data-matching-and-show>

  <!-- 骨架图 -->
  <go-skeleton :load="loading" :repeat="3"></go-skeleton>

  <!-- 编辑 / 新增弹窗 -->
  <chart-data-socket-control v-model:modelShow="controlModel" @sendHandle="sendHandle"></chart-data-socket-control>
</template>

<script setup lang="ts">
import { ref, toRefs, toRaw, onBeforeUnmount, computed, watchEffect, watch } from 'vue'
import { icon } from '@/plugins'
import { TargetSocket } from '@/api/socket'
import { SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { ChartDataSocketControl } from './components/ChartDataSocketControl'
import { useDesignStore } from '@/store/modules/designStore/designStore'
import { useTargetData } from '../../../hooks/useTargetData.hook'
import { ChartDataMatchingAndShow } from '../ChartDataMatchingAndShow'
import { newFunctionHandle } from '@/utils'

const designStore = useDesignStore()
const { HelpOutlineIcon, FlashIcon, PulseIcon, FishIcon } = icon.ionicons5
const { targetData, chartEditStore } = useTargetData()

const { requestDataPond } = toRefs(chartEditStore.getRequestGlobalConfig)
const { socketInstance, targetChart } = toRefs(chartEditStore) as any

const loading = ref(false)
const controlModel = ref(false)
const showMatching = ref(false)

let firstFocus = 0
let lastFilter: any = undefined

// 所选数据池
const pondData = computed(() => {
  const selectId = targetData.value.request.requestDataPondId
  if (!selectId) return undefined
  const data = requestDataPond.value.filter(item => {
    return selectId === item.dataPondId
  })
  console.log(requestDataPond.value, 'data')
  return data[0]
})

// 颜色
const themeColor = computed(() => {
  return designStore.getAppTheme
})

// 请求配置 model
const controlModelHandle = () => {
  controlModel.value = true
}

// 发送请求
const sendHandle = async () => {
  if (!targetData.value?.request) {
    window.$message.warning('请选择一个公共接口！')
    return
  }
  try {
    console.log('连接测试')
    socketInstance.value = new TargetSocket(
      toRaw(targetData.value.request),
      toRaw(chartEditStore.getRequestGlobalConfig)
    )
    socketInstance.value.connect(() => {
      console.log('连接成功-----')
      window['$message'].success('连接成功！')
      socketInstance.value.subscribe()
    })

    socketInstance.value.on((data: any) => {
      const key = targetData.value?.request?.socketFilterKey
      const val = targetData.value?.request?.socketFilterValue
      const res = JSON.parse(data)
      console.log('监听2：', res, key, val)
      if (res && res[key] === val) {
        console.log('监听是需要的值：', res)
        targetData.value.option.dataset = newFunctionHandle(res, res, targetData.value.filter)
        console.log(targetData.value.option.dataset, 'targetData.value.option.dataset1')
        console.log(targetData.value.filter, 'targetData.value.option.dataset2')
        showMatching.value = true
        return
      } else if (!res) {
        window['$message'].warning('没有拿到返回值，请检查接口！')
      }
    })
    socketInstance.value.onDisconnect(() => {
      console.log('断开连接')
      window['$message'].success('断开连接成功!')
      socketInstance.value = undefined
    })
  } catch (error) {
    console.error(error)
    window['$message'].warning('数据异常，请检查参数！')
  }
}

// 监听未选中时关闭websocket
watch(
  () => targetChart.value?.selectId,
  (newData: any) => {
    if (targetData.value?.id && !newData.includes(targetData.value.id)) {
      socketInstance.value.close()
    }
  }
)

// 断开连接
const offHandle = () => {
  console.log('断开')
  if (!socketInstance.value) {
    window['$message'].warning('请先连接！')
    return
  }
  socketInstance.value.close()
}
watchEffect(() => {
  const filter = targetData.value?.filter
  if (lastFilter !== filter && firstFocus) {
    lastFilter = filter
    sendHandle()
  }
  firstFocus++
})

onBeforeUnmount(() => {
  lastFilter = null
})
</script>

<style scoped lang="scss">
@include go('chart-data-pond') {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  .n-card-shallow {
    &.n-card {
      @extend .go-background-filter;
      @include deep() {
        .n-card__content {
          padding: 10px;
        }
      }
    }
    .edit-text {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 325px;
      height: 136px;
      cursor: pointer;
      opacity: 0;
      transition: all 0.3s;
      @extend .go-background-filter;
      backdrop-filter: blur(2px) !important;
    }
    &:hover {
      border-color: v-bind('themeColor');
      .edit-text {
        opacity: 1;
      }
    }
  }
}
</style>
