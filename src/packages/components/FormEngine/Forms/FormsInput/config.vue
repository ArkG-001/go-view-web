<template>
  <!-- 输入框样式 -->
  <collapse-item name="输入框样式" :expanded="true">
    <setting-item-box name="宽度" :alone="true">
      <n-input v-model:value="optionData.labelWidth" placeholder="若未输入，则默认值80" />
    </setting-item-box>
    <setting-item-box name="布局" :alone="true">
      <n-select
        v-model:value="optionData.labelPlacement"
        :options="labelPlacementOptions"
        placeholder="若未输入，则默认左右"
      />
    </setting-item-box>
    <setting-item-box name="对齐方式" :alone="true">
      <n-select
        v-model:value="optionData.labelAlign"
        :options="labelAlignOptions"
        placeholder="若未输入，则默认左对齐"
      />
    </setting-item-box>
    <!-- 必填的星号的位置 -->
    <setting-item-box name="星号位置" :alone="true">
      <n-select
        v-model:value="optionData.requirePlacement"
        :options="requirePlacementOptions"
        placeholder="若未输入，则默认左对齐"
      />
    </setting-item-box>
  </collapse-item>
  <!-- 输入框配置 -->
  <collapse-item name="输入框配置" :expanded="true">
    <setting-item-box name="类型" :alone="true">
      <n-select v-model:value="optionData.inputType" :options="inputTypeOptions" placeholder="若未输入，则默认文本" />
    </setting-item-box>
    <setting-item-box name="字段名" :alone="true">
      <n-input v-model:value="optionData.label" placeholder="若未输入，则默认值空字符串" />
    </setting-item-box>
    <setting-item-box name="前缀" :alone="true">
      <n-input v-model:value="optionData.prefix" placeholder="若未输入，则默认值没有前缀" />
    </setting-item-box>
    <setting-item-box name="后缀" :alone="true">
      <n-input v-model:value="optionData.suffix" placeholder="若未输入，则默认值没有后缀" />
    </setting-item-box>
    <setting-item-box name="能否清空" :alone="true" :itemRightStyle="{ display: 'block' }">
      <n-switch :round="false" v-model:value="optionData.clearable">
        <template #checked> 是 </template>
        <template #unchecked> 否 </template>
      </n-switch>
    </setting-item-box>
    <setting-item-box name="占位提示" :alone="true">
      <n-input v-model:value="optionData.placeholder" placeholder="若未输入，默认展示请输入${字段名}" />
    </setting-item-box>
  </collapse-item>
  <!-- 规则配置 -->
  <collapse-item name="规则配置" :expanded="true">
    <setting-item-box name="必填" :alone="true" :itemRightStyle="{ display: 'block' }">
      <n-switch :round="false" v-model:value="optionData.required">
        <template #checked> 是 </template>
        <template #unchecked> 否 </template>
      </n-switch>
    </setting-item-box>

    <!--  数字输入框  -->
    <div v-if="optionData.inputType === 'number'">
      <setting-item-box name="最小值" :alone="true" :itemRightStyle="{ display: 'block' }">
        <n-input-number v-model:value="optionData.numberMin"></n-input-number>
      </setting-item-box>
      <setting-item-box name="最大值" :alone="true" :itemRightStyle="{ display: 'block' }">
        <n-input-number v-model:value="optionData.numberMax"></n-input-number>
      </setting-item-box>
    </div>
  </collapse-item>
</template>
<script setup lang="ts">
import { PropType, watch } from 'vue'
import { CollapseItem, SettingItemBox } from '@/components/Pages/ChartItemSetting'
import { option } from './config'
const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})

const labelPlacementOptions = [
  { label: '左右', value: 'left' },
  { label: '上下', value: 'top' }
]

const labelAlignOptions = [
  { label: '左对齐', value: 'left' },
  { label: '右对齐', value: 'right' }
]

const requirePlacementOptions = [
  { label: '左', value: 'left' },
  { label: '右', value: 'right' }
]

const inputTypeOptions = [
  { label: '文本', value: 'text' },
  { label: '数字', value: 'number' },
  { label: '选择器', value: 'select' }
]

//
watch(
  () => props.optionData?.inputType,
  newVal => {
    console.log('newVal', newVal)
  },
  { immediate: true }
)
</script>
