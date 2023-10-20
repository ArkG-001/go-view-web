<template>
  <div class="go-project-items">
    <project-items-list></project-items-list>
  </div>
</template>

<script setup lang="ts">
import { ProjectItemsList } from './components/ProjectItemsList'
import {io} from "socket.io-client";

const socket = io('ws://192.168.1.230:9200')
socket.on('connect', () => {
  console.log('连接成功--=33333')
  // 订阅频道：clientuuid
  socket.emit('subscribe', '92205070286')
  socket.on('message', (data: any) => {
    const res = JSON.parse(data)
    console.log('接收到消息', res)
    sessionStorage.setItem('message', JSON.stringify(res.Data))
  })
})

socket.on('92205070286', (data: any) => {
  const res = JSON.parse(data)
  console.log('接收到消息', res)
  sessionStorage.setItem('message', JSON.stringify(res.Data))
})
</script>

<style lang="scss" scoped>
@include go(project-items) {
  padding: 20px 20px;
}
</style>
