import cloneDeep from 'lodash/cloneDeep'
import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { chartInitConfig } from '@/settings/designSetting'
import { COMPONENT_INTERACT_EVENT_KET } from '@/enums/eventEnum'
import { interactActions, ComponentInteractEventEnum } from './interact'
import { FormsInputConfig } from './index'

export const option = {
  // 时间组件展示类型，必须和 interactActions 中定义的数据一致
  [COMPONENT_INTERACT_EVENT_KET]: ComponentInteractEventEnum.DATA,
  // 默认值
  inputValue: '0',
  // 暴露配置内容给用户
  dataset: '',
  // 占位提示
  placeholder: '',
  // 前缀
  prefix: '',
  // 后缀
  suffix: '',
  // 字段名
  label: '字段名',
  // 字段名显示位置
  labelPlacement: 'left',
  // 字段名对齐方式
  labelAlign: 'left',
  // 字段名宽度
  labelWidth: '80',
  // 是否必填
  required: false,
  // 必填的星号位置
  requirePlacement: 'left',
  // 是否可清空
  clearable: false
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = FormsInputConfig.key
  public attr = { ...chartInitConfig, w: 260, h: 32, zIndex: -1 }
  public chartConfig = cloneDeep(FormsInputConfig)
  public interactActions = interactActions
  public option = cloneDeep(option)
}
