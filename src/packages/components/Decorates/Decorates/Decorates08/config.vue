<template>
  <CollapseItem name="内容" expanded>
    <SettingItemBox name="高度">
      <SettingItem name="左边高度">
        <n-input-number v-model:value="optionData.longerHeight" size="small" :min="1" :max="4"></n-input-number>
      </SettingItem>
      <SettingItem name="右边高度">
        <n-input-number v-model:value="optionData.shorterHeight" size="small" :min="1" :max="4"></n-input-number>
      </SettingItem>
    </SettingItemBox>
  </CollapseItem>

  <CollapseItem name="样式" expanded>
    <SettingItemBox :name="`颜色-${index + 1}`" v-for="(item, index) in optionData.colors" :key="index">
      <SettingItem name="颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.colors[index]"></n-color-picker>
      </SettingItem>
      <SettingItem>
        <n-button size="small" @click="optionData.colors[index] = option.colors[index]"> 恢复默认 </n-button>
      </SettingItem>
    </SettingItemBox>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { option } from './config'

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})
</script>
