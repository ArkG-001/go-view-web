<template>
  <suspense>
    <suspense-index></suspense-index>
  </suspense>
</template>

<script setup lang="ts">
import suspenseIndex from './suspenseIndex.vue'
import { toRefs } from 'vue'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { UseSocketHook } from '@/hooks'

const chartEditStore = useChartEditStore()
const { socketInstance } = toRefs(chartEditStore) as any

// 连接websocket
socketInstance.value = new UseSocketHook('92218050236', 'ws://47.103.75.123:9200')
socketInstance.value.connect(() => {
  console.log('websocket连接成功')
  socketInstance.value.subscribe()
})
</script>
