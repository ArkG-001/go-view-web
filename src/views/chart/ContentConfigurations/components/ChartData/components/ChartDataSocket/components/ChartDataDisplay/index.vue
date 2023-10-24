<template>
  <div class="go-chart-data-display">
    <n-scrollbar style="max-height: 570px">
      <div class="go-mr-3">
        <div>
          <setting-item-box name="主体信息">
            <setting-item name="接口名称">
              <n-input size="small" :placeholder="targetData?.dataPondName || '暂无'" :disabled="true"> </n-input>
            </setting-item>
          </setting-item-box>

          <setting-item-box>
            <setting-item name="组件间隔">
              <n-input size="small" :placeholder="`${requestInterval || '暂无'}`" :disabled="true">
                <template #suffix>
                  {{ targetData && SelectHttpTimeNameObj[requestIntervalUnit] }}
                </template>
              </n-input>
            </setting-item>
            <setting-item name="全局间隔（默认）">
              <n-input size="small" :placeholder="`${globalData?.requestInterval || '暂无'}`" :disabled="true">
                <template #suffix> {{ globalData && SelectHttpTimeNameObj[globalData.requestIntervalUnit] }} </template>
              </n-input>
            </setting-item>
          </setting-item-box>

          <setting-item-box name="源地址" :alone="true">
            <n-input size="small" :placeholder="globalData?.socketOriginUrl || '暂无'" :disabled="true">
              <template #prefix>
                <n-icon :component="PulseIcon" />
              </template>
            </n-input>
          </setting-item-box>

          <setting-item-box name="标识" :alone="true">
            <n-input size="small" :placeholder="socketEventName || '暂无'" :disabled="true">
              <template #prefix>
                <n-icon :component="FlashIcon" />
              </template>
            </n-input>
          </setting-item-box>
          <setting-item-box name="过滤键" :alone="true">
            <n-input size="small" :placeholder="socketFilterKey || '暂无'" :disabled="true"> </n-input>
          </setting-item-box>
          <setting-item-box name="过滤值" :alone="true">
            <n-input size="small" :placeholder="socketFilterValue || '暂无'" :disabled="true"> </n-input>
          </setting-item-box>
        </div>
        <n-divider />
      </div>
    </n-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, toRefs } from 'vue'
import { icon } from '@/plugins'
import { SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { RequestGlobalConfigType, RequestDataPondItemType } from '@/store/modules/chartEditStore/chartEditStore.d'
import { RequestParamsTypeEnum, SelectHttpTimeNameObj } from '@/enums/httpEnum'

const props = defineProps({
  globalData: Object as PropType<RequestGlobalConfigType>,
  targetData: Object as PropType<RequestDataPondItemType>
})

const { HelpOutlineIcon, FlashIcon, PulseIcon } = icon.ionicons5
const { requestInterval, requestParams, requestIntervalUnit, socketEventName, socketFilterKey, socketFilterValue } =
  toRefs((props.targetData as RequestDataPondItemType).dataPondRequestConfig)

const tabs = [RequestParamsTypeEnum.HEADER]
const tabValue = ref<RequestParamsTypeEnum>(RequestParamsTypeEnum.PARAMS)
</script>

<style lang="scss" scoped>
@include go('chart-data-display') {
  flex: 1;
}
</style>
