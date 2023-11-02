<template>
  <suspense>
    <suspense-index></suspense-index>
  </suspense>
</template>

<script setup lang="ts">
import suspenseIndex from './suspenseIndex.vue'
import { toRefs, watch } from 'vue'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { UseSocketHook } from '@/hooks'
const chartEditStore = useChartEditStore()
const { socketInstance, requestGlobalConfig } = toRefs(chartEditStore) as any

// 连接websocket
socketInstance.value = new UseSocketHook(
  requestGlobalConfig.value.subscribeChannel,
  requestGlobalConfig.value.socketOriginUrl
)
watch(
  () => requestGlobalConfig.value,
  newVal => {
    socketInstance.value.disconnect()
    socketInstance.value = new UseSocketHook(newVal.subscribeChannel, newVal.socketOriginUrl)
  },
  { deep: true, immediate: true }
)
if (socketInstance.value) {
  socketInstance.value.connect(() => {
    console.log('websocket连接成功')
    socketInstance.value.subscribe()
  })
}
</script>
