<template>
  <div>
    <n-form-item
      :label="option.value.label"
      :label-width="option.value.labelWidth"
      :label-align="option.value.labelAlign"
      :label-placement="option.value.labelPlacement"
      :show-require-mark="option.value.required"
      :require-mark-placement="option.value.requirePlacement"
      path="inputValue"
    >
      <n-input
        v-if="option.value.inputType === 'text'"
        :style="`width:${w}px;`"
        type="text"
        :clearable="option.value.clearable"
        v-model:value="option.value.dataset"
        :placeholder="option.value.placeholder"
        @change="onChange"
      >
        <template #prefix>
          {{ option.value.prefix }}
        </template>
        <template #suffix> {{ option.value.suffix }} </template>
      </n-input>
      <n-input-number
        v-else-if="option.value.inputType === 'number'"
        :style="`width:${w}px;`"
        type="text"
        :clearable="option.value.clearable"
        v-model:value="option.value.dataset"
        :placeholder="option.value.placeholder"
        @on-update:value="onChange"
        :max="option.value.numberMax"
        :min="option.value.numberMin"
      >
        <template #prefix>
          {{ option.value.prefix }}
        </template>
        <template #suffix> {{ option.value.suffix }} </template>
      </n-input-number>
      <n-input-number
        v-else-if="option.value.inputType === 'number'"
        :style="`width:${w}px;`"
        type="text"
        :clearable="option.value.clearable"
        v-model:value="option.value.dataset"
        :placeholder="option.value.placeholder"
        @on-update:value="onChange"
        :max="option.value.numberMax"
        :min="option.value.numberMin"
      >
        <template #prefix>
          {{ option.value.prefix }}
        </template>
        <template #suffix> {{ option.value.suffix }} </template>
      </n-input-number>
    </n-form-item>
  </div>
</template>

<script lang="ts" setup>
import { PropType, toRefs, shallowReactive, watch } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { useChartInteract } from '@/hooks'
import { InteractEventOn } from '@/enums/eventEnum'
import { ComponentInteractParamsEnum } from './interact'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const { w, h } = toRefs(props.chartConfig.attr)
const option = shallowReactive({
  value: {
    inputValue: props.chartConfig.option.inputValue,
    dataset: props.chartConfig.option.dataset,
    label: props.chartConfig.option.label,
    labelPlacement: props.chartConfig.option.labelPlacement,
    labelAlign: props.chartConfig.option.labelAlign,
    labelWidth: props.chartConfig.option.labelWidth,
    required: props.chartConfig.option.required,
    clearable: props.chartConfig.option.clearable,
    placeholder: props.chartConfig.option.placeholder,
    requirePlacement: props.chartConfig.option.requirePlacement,
    prefix: props.chartConfig.option.prefix,
    suffix: props.chartConfig.option.suffix,
    inputType: props.chartConfig.option.inputType,
    numberMax: props.chartConfig.option.numberMax,
    numberMin: props.chartConfig.option.numberMin
  }
})

const onChange = (v: string) => {
  if (v == undefined) return
  // 存储到联动数据
  useChartInteract(
    props.chartConfig,
    useChartEditStore,
    { [ComponentInteractParamsEnum.DATA]: v },
    InteractEventOn.CHANGE
  )
}

// 手动更新
watch(
  () => props.chartConfig.option,
  (newData: any) => {
    option.value = newData
    onChange(newData.inputValue)
  },
  {
    immediate: true,
    deep: true
  }
)
</script>
