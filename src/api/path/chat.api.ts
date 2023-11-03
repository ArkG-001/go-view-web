import { http } from '@/api/http'
import { httpErrorHandle } from '@/utils'
import { RequestHttpEnum, ModuleTypeEnum } from '@/enums/httpEnum'
import { LoginResult } from './system'

// * 更新用户信息 地理位置
export const updateUserInfo = async (data: object) => {
  try {
    const res = await http(RequestHttpEnum.POST)<LoginResult>(`${ModuleTypeEnum.SYSTEM}/updateUserInfo`, data)
    return res
  } catch (err) {
    httpErrorHandle()
  }
}
