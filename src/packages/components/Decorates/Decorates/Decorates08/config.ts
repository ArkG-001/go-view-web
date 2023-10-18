import { PublicConfigClass } from '@/packages/public'
import { chartInitConfig } from '@/settings/designSetting'
import { CreateComponentType } from '@/packages/index.d'
import { Decorates08Config } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  colors: ['#1DC1F533', '#1DC1F5FF', '#36f4fb'],
  dataset: '我是标题',
  textColor: '#fff',
  textSize: 32,
  longerHeight: 4,
  shorterHeight: 2
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = Decorates08Config.key
  public attr = { ...chartInitConfig, w: 500, h: 70, zIndex: 1 }
  public chartConfig = cloneDeep(Decorates08Config)
  public option = cloneDeep(option)
}
