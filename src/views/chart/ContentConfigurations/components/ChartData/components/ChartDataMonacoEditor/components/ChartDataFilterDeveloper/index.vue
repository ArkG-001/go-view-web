<template>
  <n-modal class="go-chart-data-monaco-editor" :show="showModal" :mask-closable="false" :closeOnEsc="false">
    <n-card :bordered="false" role="dialog" size="small" aria-modal="true" style="width: 1000px; height: 600px">
      <template #header>
        <n-space>
          <n-text>过滤器函数编辑器</n-text>
        </n-space>
      </template>
      <template #header-extra> </template>
      <n-space size="small" vertical>
        <n-space justify="space-between">
          <div>
            <n-space vertical>
              <n-tag type="info">
                <span class="func-keyword">function</span>&nbsp;&nbsp;filter(data, res)&nbsp;&nbsp;{
              </n-tag>
              <monaco-editor v-model:modelValue="filter" width="460px" height="380px" language="javascript" />
              <n-tag type="info">}</n-tag>
            </n-space>
          </div>
          <n-divider vertical style="height: 480px" />
          <n-scrollbar style="max-height: 480px">
            <n-space :size="15" vertical>
              <div class="editor-data-show">
                <n-space>
                  <n-text depth="3">默认过滤数据(data)：</n-text>
                  <n-code :code="toString(sourceData?.data) || '暂无'" language="json" :word-wrap="true"></n-code>
                </n-space>
              </div>
              <div class="editor-data-show">
                <n-space>
                  <n-text depth="3">接口返回数据(res)：</n-text>
                  <n-code :code="toString(sourceData) || '暂无'" language="json" :word-wrap="true"></n-code>
                </n-space>
              </div>
              <div class="editor-data-show">
                <n-space>
                  <n-text depth="3">过滤器结果：</n-text>
                  <n-code :code="filterRes || '暂无'" language="json" :word-wrap="true"></n-code>
                </n-space>
              </div>
            </n-space>
          </n-scrollbar>
        </n-space>
      </n-space>
      <template #action>
        <n-space justify="space-between">
          <div class="go-flex-items-center">
            <n-tag :bordered="false" type="primary">
              <template #icon>
                <n-icon :component="DocumentTextIcon" />
              </template>
              规则
            </n-tag>
            <n-text class="go-ml-2" depth="2">过滤器默认处理接口返回值的「data」字段</n-text>
          </div>

          <n-space>
            <n-button size="medium" @click="closeFilter">取消</n-button>
            <n-button size="medium" type="primary" @click="saveFilter">保存</n-button>
          </n-space>
        </n-space>
      </template>
    </n-card>
  </n-modal>
</template>
<script setup lang="ts">
import { ref, computed, watch, toRef, toRefs, toRaw, reactive } from 'vue'
import { useTargetData } from '../../../../../hooks/useTargetData.hook'
import { MonacoEditor } from '@/components/Pages/MonacoEditor'
import { icon } from '@/plugins'
import { goDialog, newFunctionHandle, toString } from '@/utils'
import cloneDeep from 'lodash/cloneDeep'
import debounce from 'lodash/debounce'
import { customizeHttp } from '@/api/http'

const { DocumentTextIcon } = icon.ionicons5
const { targetData, chartEditStore } = useTargetData()
const { socketInstance, targetChart } = toRefs(chartEditStore) as any
const { requestDataType } = toRefs(targetData.value.request)

const props = defineProps({
  showModal: {
    required: true,
    type: Boolean
  }
})

const emits = defineEmits(['update:showModal'])

// filter 函数模板
const filter = ref(targetData.value.filter || `return data`)
// 目标静态/接口数据
const sourceData = ref<any>('')
// 过滤错误标识
const errorFlag = ref(false)

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

// 关闭过滤器
const closeFilter = () => {
  emits('update:showModal', false)
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
  () => props.showModal,
  (newData: boolean) => {
    if (newData) {
      fetchTargetData()
      filter.value = targetData.value.filter || `return data`
    }
  }
)

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
