<template>
  <div class="go-border-07">
    <svg v-if="direction === 'up'" xmlns="http://www.w3.org/2000/svg" :width="w" :height="h">
      <polyline
        style="fill: none; stroke-width: 3; stroke-opacity: 0.5"
        class="stroke"
        :points="`16.5 ${h - 16.5},12.5 40,${w - 16.5} 40`"
      />
      <circle class="fill" cx="15.5" :cy="h - 20" r="6" stroke="black" fill="#5eacff" />
    </svg>
    <svg v-if="direction === 'down'" xmlns="http://www.w3.org/2000/svg" :width="w" :height="h">
      <polyline
        style="fill: none; stroke-width: 3; stroke-opacity: 0.5"
        class="stroke"
        :points="`16.5 40,16.5  ${h - 40},${w - 16.5} ${h - 40}`"
      />
      <circle class="fill" cx="15.5" :cy="40" r="6" stroke="black" fill="#5eacff" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { PropType, toRefs } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { getUUID } from '@/utils'
const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const id = getUUID()
const { w, h } = toRefs(props.chartConfig.attr)
const { colors, dataset, textSize, textColor, direction } = toRefs(props.chartConfig.option)
</script>

<style lang="scss" scoped>
@include go('border-07') {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    position: absolute;
    z-index: -1;
  }

  .fill {
    fill: v-bind('colors[0]');
  }
  .fill-none {
    fill: none;
  }
  .stroke {
    stroke: v-bind('colors[1]');
  }

  .text {
    color: v-bind('textColor');
    font-size: v-bind('textSize+"px"');
    position: absolute;
    width: 190px;
    height: 80px;
    line-height: 80px;
    right: 0;
    top: 0;
  }

  .down {
    position: absolute;
    width: 190px;
    height: 80px;
    line-height: 80px;
    bottom: 0;
    right: 0;
    color: v-bind('textColor');
    font-size: v-bind('textSize+"px"');
  }
}
</style>
