<template>
  <!-- 组件配置 -->
  <n-divider class="go-my-3" title-placement="left"></n-divider>
  <setting-item-box
    :itemRightStyle="{
      gridTemplateColumns: '6fr 2fr'
    }"
    style="padding-right: 25px"
  >
    <template #name> 过滤键 </template>
    <setting-item>
      <n-input-group>
        <n-input v-model:value.trim="socketFilterKey" :min="1" placeholder="请输入过滤键"> </n-input>
      </n-input-group>
      <!-- 组件url -->
    </setting-item>
  </setting-item-box>
  <setting-item-box
    :itemRightStyle="{
      gridTemplateColumns: '6fr 2fr'
    }"
    style="padding-right: 25px"
  >
    <template #name> 过滤值 </template>
    <setting-item>
      <n-input-group>
        <n-input v-model:value.trim="socketFilterValue" :min="1" placeholder="请输入过滤值"> </n-input>
      </n-input-group>
      <!-- 组件url -->
    </setting-item>
  </setting-item-box>
</template>

<script setup lang="ts">
import { PropType, toRefs } from 'vue'
import { SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { useTargetData } from '@/views/chart/ContentConfigurations/components/hooks/useTargetData.hook'
import { selectTypeOptions, selectTimeOptions } from '@/views/chart/ContentConfigurations/components/ChartData/index.d'
import { RequestConfigType } from '@/store/modules/chartEditStore/chartEditStore.d'
import { RequestHeader } from '../RequestHeader'
import { isDev } from '@/utils'
import { icon } from '@/plugins'

const props = defineProps({
  targetDataRequest: Object as PropType<RequestConfigType>
})

const { HelpOutlineIcon } = icon.ionicons5
const { chartEditStore } = useTargetData()
const { requestOriginUrl } = toRefs(chartEditStore.getRequestGlobalConfig)
const { socketFilterKey, socketFilterValue } = toRefs(props.targetDataRequest as RequestConfigType)
</script>

<style lang="scss" scoped>
.select-time-number {
  width: 100%;
}
.select-time-options {
  width: 100px;
}
.select-type-options {
  width: 120px;
}
</style>
