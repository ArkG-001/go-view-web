<template>
  <div class="go-chart-data-display">
    <n-scrollbar style="max-height: 570px">
      <div class="go-mr-3">
        <div>
          <setting-item-box name="主体信息">
            <setting-item name="接口名称">
              <n-input size="small" :placeholder="targetData?.dataPondName || '暂无'" :disabled="true"> </n-input>
            </setting-item>
            <setting-item name="接口类型">
              <n-input size="small" :placeholder="requestHttpType || '暂无'" :disabled="true"></n-input>
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
            <n-input size="small" :placeholder="globalData?.requestOriginUrl || '暂无'" :disabled="true">
              <template #prefix>
                <n-icon :component="PulseIcon" />
              </template>
            </n-input>
          </setting-item-box>

          <setting-item-box name="标识" :alone="true">
            <n-input
              size="small"
              :placeholder="requestUrl || '暂无'"
              :disabled="true"
            >
              <template #prefix>
                <n-icon :component="FlashIcon" />
              </template>
            </n-input>
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
import { MonacoEditor } from '@/components/Pages/MonacoEditor'
import { SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { RequestDataPondItemType, RequestGlobalConfigType } from '@/store/modules/chartEditStore/chartEditStore.d'
import displayTable from './displayTable.vue'
import {
  RequestBodyEnum,
  RequestParamsTypeEnum,
  SelectHttpTimeNameObj,
  RequestContentTypeEnum,
  RequestBodyEnumList,
  RequestParamsObjType
} from '@/enums/httpEnum'

const props = defineProps({
  globalData: Object as PropType<RequestGlobalConfigType>,
  targetData: Object as PropType<RequestDataPondItemType>
})

const { HelpOutlineIcon, FlashIcon, PulseIcon } = icon.ionicons5
const {
  requestUrl,
  requestInterval,
  requestHttpType,
  requestContentType,
  requestSQLContent,
  requestParams,
  requestParamsBodyType,
  requestIntervalUnit
} = toRefs((props.targetData as RequestDataPondItemType).dataPondRequestConfig)

const tabs = [RequestParamsTypeEnum.HEADER]
const requestContentTypeObj = {
  [RequestContentTypeEnum.DEFAULT]: '普通请求',
  [RequestContentTypeEnum.SQL]: 'SQL 请求'
}
const tabValue = ref<RequestParamsTypeEnum>(RequestParamsTypeEnum.PARAMS)

// 更新参数表格数据
const updateRequestParams = (paramsObj: RequestParamsObjType) => {
  if (tabValue.value !== RequestParamsTypeEnum.BODY) {
    requestParams.value[tabValue.value] = paramsObj
  }
}

// 更新参数表格数据
const updateRequestBodyTable = (paramsObj: RequestParamsObjType) => {
  if (
    tabValue.value === RequestParamsTypeEnum.BODY &&
    // 仅有两种类型有 body
    (requestParamsBodyType.value === RequestBodyEnum.FORM_DATA ||
      requestParamsBodyType.value === RequestBodyEnum.X_WWW_FORM_URLENCODED)
  ) {
    requestParams.value[RequestParamsTypeEnum.BODY][requestParamsBodyType.value] = paramsObj
  }
}
</script>

<style lang="scss" scoped>
@include go('chart-data-display') {
  flex: 1;
}
</style>
