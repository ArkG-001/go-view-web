import BarCommon from './index.vue'
import image from '@/assets/images/chart/charts/bar_x.png'
import { ConfigType } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const BarCommonConfig: ConfigType = {
  key: 'VBarCommon',
  title: '柱状图',
  category: ChatCategoryEnum.BAR,
  categoryName: ChatCategoryEnumName.BAR,
  node: BarCommon,
  image: image
}
