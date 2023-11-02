import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'
export const FormsInputConfig: ConfigType = {
  key: 'FormsInput',
  chartKey: 'VFormsInput',
  conKey: 'VCFormsInput',
  title: '普通输入框',
  category: ChatCategoryEnum.FORMS,
  categoryName: ChatCategoryEnumName.FORMS,
  package: PackagesCategoryEnum.FormEngine,
  chartFrame: ChartFrameEnum.STATIC,
  image: 'inputs_select.png'
}
