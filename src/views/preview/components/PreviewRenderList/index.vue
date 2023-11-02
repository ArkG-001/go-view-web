<template>
  <div
    class="chart-item"
    v-for="(item, index) in chartEditStore.componentList"
    :class="animationsClass(item.styles.animations)"
    :key="item.id"
    :style="{
      ...getComponentAttrStyle(item.attr, index),
      ...getTransformStyle(item.styles),
      ...getStatusStyle(item.status),
      ...getPreviewConfigStyle(item.preview),
      ...getBlendModeStyle(item.styles) as any,
      ...getSizeStyle(item.attr)
    }"
  >
    <!-- 分组 -->
    <preview-render-group
      v-if="item.isGroup"
      :groupData="(item as CreateComponentGroupType)"
      :groupIndex="index"
      :themeSetting="themeSetting"
      :themeColor="themeColor"
    ></preview-render-group>

    <!-- 单组件 -->
    <component
      v-else
      :is="item.chartConfig.chartKey"
      :id="item.id"
      :chartConfig="item"
      :themeSetting="themeSetting"
      :themeColor="themeColor"
      :style="{
        ...getSizeStyle(item.attr),
        ...getFilterStyle(item.styles)
      }"
      v-on="useLifeHandler(item)"
    ></component>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed, onMounted, toRefs } from 'vue'
import { useChartDataPondFetch } from '@/hooks'
import { ChartEditStorageType } from '../../index.d'
import { PreviewRenderGroup } from '../PreviewRenderGroup/index'
import { CreateComponentGroupType } from '@/packages/index.d'
import { chartColors } from '@/settings/chartThemes/index'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import {
  animationsClass,
  getFilterStyle,
  getTransformStyle,
  getBlendModeStyle,
  colorCustomMerge,
  newFunctionHandle
} from '@/utils'
import { getSizeStyle, getComponentAttrStyle, getStatusStyle, getPreviewConfigStyle } from '../../utils'
import { useLifeHandler } from '@/hooks'
import { RequestDataTypeEnum } from '@/enums/httpEnum'

// 初始化数据池
const { initDataPond, clearMittDataPondMap } = useChartDataPondFetch()
const chartEditStore = useChartEditStore()
const { componentList, socketInstance } = toRefs(chartEditStore) as any

console.log(componentList.value, 'componentList')

socketInstance.value.on((data: any) => {
  console.log(JSON.parse(data), 'data')
  setDateset(componentList.value, data)
})

const setDateset = (componentList: Array<object>, data: any) => {
  componentList.forEach((item: any) => {
    if (item.isGroup) {
      setDateset(item.groupList, data)
    }
    if (item.request.requestDataType === RequestDataTypeEnum.SOCKET) {
      if (!item) return
      const key = item.request?.socketFilterKey
      const val = item.request?.socketFilterValue
      const res = JSON.parse(data)
      if (res && res[key] === val) {
        item.option.dataset = newFunctionHandle(res, res, item.filter)
      }
    }
  })
}
// const props = defineProps({
//   localStorageInfo: {
//     type: Object as PropType<ChartEditStorageType>,
//     required: true
//   }
// })

// 主题色
const themeSetting = computed(() => {
  const chartThemeSetting = chartEditStore.editCanvasConfig.chartThemeSetting
  return chartThemeSetting
})

// 配置项
const themeColor = computed(() => {
  const colorCustomMergeData = colorCustomMerge(chartEditStore.editCanvasConfig.chartCustomThemeColorInfo)
  return colorCustomMergeData[chartEditStore.editCanvasConfig.chartThemeColor]
})

// 组件渲染结束初始化数据池
clearMittDataPondMap()
onMounted(() => {
  initDataPond(useChartEditStore)
})
</script>

<style lang="scss" scoped>
.chart-item {
  position: absolute;
}
</style>
