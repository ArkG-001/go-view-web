<template>
  <div class="go-border-box" :style="{ background: backgroundColor }"></div>
</template>

<script setup lang="ts">
import { PropType, toRefs } from 'vue'
import { CreateComponentType } from '@/packages/index.d'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const { w, h } = toRefs(props.chartConfig.attr)
const { colors, backgroundColor } = toRefs(props.chartConfig.option)
console.log(props.chartConfig, 'props.chartConfig')
</script>

<style lang="scss" scoped>
@include go('border-box') {
  polyline {
    fill: none;
  }

  box-shadow: 0 0.10417vw 0.625vw #0000001a;
  border-radius: 0.2vw;
  //background-color: #fff;
}
</style>
