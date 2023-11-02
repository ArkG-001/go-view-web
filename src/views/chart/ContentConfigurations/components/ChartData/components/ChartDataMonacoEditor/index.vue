<template>
  <template v-if="targetData.filter">
    <n-card>
      <p><span class="func-keyword">function</span>&nbsp;&nbsp;filter(data, res)&nbsp;&nbsp;{</p>
      <!-- 函数体 -->
      <div class="go-ml-4">
        <n-code :code="targetData.filter" language="typescript"></n-code>
      </div>
      <p>}</p>
      <template #footer>
        <n-space justify="end">
          <n-button type="primary" tertiary size="small" @click="addFilter">
            <template #icon>
              <n-icon>
                <filter-edit-icon />
              </n-icon>
            </template>
            编辑
          </n-button>
          <n-button tertiary size="small" @click="delFilter"> 删除 </n-button>
        </n-space>
      </template>
    </n-card>
  </template>
  <template v-else>
    <n-button class="go-ml-3" @click="addFilter">
      <template #icon>
        <n-icon>
          <filter-icon />
        </n-icon>
      </template>
      新增过滤器
    </n-button>
  </template>

  <!-- 弹窗 -->
  <ChartDataFilterDeveloper v-model:showModal="showModal" v-if="developerMode"></ChartDataFilterDeveloper>
  <ChartDataFilterClient v-model:showModal="showModal" v-else></ChartDataFilterClient>
</template>

<script lang="ts" setup>
import { ref, computed, watch, toRef, toRefs, toRaw, reactive } from 'vue'
import { useTargetData } from '../../../hooks/useTargetData.hook'
import { ChartDataFilterDeveloper } from './components/ChartDataFilterDeveloper'
import { ChartDataFilterClient } from './components/ChartDataFilterClient'
import { MonacoEditor } from '@/components/Pages/MonacoEditor'
import { icon } from '@/plugins'
import { goDialog, newFunctionHandle, toString } from '@/utils'
import { customizeHttp } from '@/api/http'
import cloneDeep from 'lodash/cloneDeep'
import debounce from 'lodash/debounce'
import { useSettingStore } from '@/store/modules/settingStore/settingStore'

const { DocumentTextIcon } = icon.ionicons5
const { FilterIcon, FilterEditIcon } = icon.carbon
const { targetData, chartEditStore } = useTargetData()
const { requestDataType } = toRefs(targetData.value.request)
const { developerMode } = toRefs(useSettingStore())

const { requestOriginUrl } = toRefs(chartEditStore.getRequestGlobalConfig)
console.log(requestDataType, 'requestDataType')
const { socketInstance, targetChart } = toRefs(chartEditStore) as any

// 受控弹窗
const showModal = ref(false)
// filter 函数模板
const filter = ref(targetData.value.filter || `return data`)
// 过滤错误标识
const errorFlag = ref(false)
// 目标静态/接口数据
const sourceData = ref<any>('')

// 动态获取数据
const fetchTargetData = async () => {
  try {
    let res
    if (requestDataType.value === 3) {
      socketInstance.value.on((data: any) => {
        if (!targetData.value) return
        const key = targetData.value.request.socketFilterKey
        const val = targetData.value.request.socketFilterValue
        const res = JSON.parse(data)
        if (!key || !val) return
        if (res[key] !== val) return
        sourceData.value = res
      })
    } else {
      res = await customizeHttp(toRaw(targetData.value.request), toRaw(chartEditStore.getRequestGlobalConfig))
      if (res) {
        sourceData.value = res
        return
      }
    }
    window['$message'].warning('没有拿到返回值，请检查接口！')
  } catch (error) {
    console.error(error)
    window['$message'].warning('数据异常，请检查参数！')
  }
}

// 过滤结果
const filterRes = computed(() => {
  try {
    const fn = new Function('data', 'res', filter.value)
    const response = cloneDeep(sourceData.value)
    let res
    if (requestDataType.value === 3) {
      res = fn(response, response)
    } else {
      res = fn(response?.data, response)
    }
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    errorFlag.value = false
    return toString(res)
  } catch (error) {
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    errorFlag.value = true
    return `过滤函数错误，日志：${error}`
  }
})

// 新增过滤器
const addFilter = () => {
  if (requestDataType.value === 3 && !socketInstance.value) {
    window['$message'].warning('socket连接异常，请连接后重试！')
    return
  }
  showModal.value = true
}

// 删除过滤器
const delFilter = () => {
  goDialog({
    message: '是否删除过滤器',
    onPositiveCallback: () => {
      targetData.value.filter = undefined
    }
  })
}

// 关闭过滤器
const closeFilter = () => {
  showModal.value = false
}

// 新增过滤器
const saveFilter = () => {
  if (errorFlag.value) {
    window['$message'].error('过滤函数错误，无法进行保存')
    return
  }
  targetData.value.filter = filter.value
  closeFilter()
}

watch(
  () => showModal.value,
  (newData: boolean) => {
    if (newData) {
      fetchTargetData()
      filter.value = targetData.value.filter || `return data`
    }
  }
)

// 表格数据
const dataTableRef = ref<any>(null)
const checkedRowKeys = ref([])
const columns = [
  {
    type: 'selection',
    multiple: false
  },
  {
    title: '点位名称',
    key: 'k',
    width: 200,
    defaultSortOrder: 'ascend',
    sorter: 'default',
    filter(value: any, row: any) {
      console.log(value, 'value---1')
      return ~row.k.indexOf(value)
    }
  },
  {
    title: '点位值',
    key: 'v',
    width: 200
  }
]

const tableData = ref([])
const handleCheck = (newData: any) => {
  console.log(newData, 'newData---1')
  checkedRowKeys.value = newData
}
watch(
  () => sourceData.value,
  newData => {
    if (!newData) return
    console.log(newData, 'newData')
    console.log(newData?.data?.data?.workData, 'newData')
    tableData.value = newData?.data?.data?.workData.map((item: any) => {
      return {
        k: item.k,
        v: item.v
      }
    })
    console.log(tableData.value, 'newData')
  },
  { deep: true }
)
// 表格过滤
const filterValue = ref('')
const handleFilterChange = debounce((value: string) => {
  console.log('value---', value)
  const filterArr = []
  filterArr.push(value)
  dataTableRef.value.filter({ k: filterArr })
}, 300)
</script>

<style lang="scss" scoped>
.func-keyword {
  color: #b478cf;
}
@include go('chart-data-monaco-editor') {
  &.n-card.n-modal,
  .n-card {
    @extend .go-background-filter;
  }
  .editor-data-show {
    @include fetch-bg-color('filter-color');
    width: 420px;
    padding: 20px;
    border-radius: 5px;
  }
}
</style>
