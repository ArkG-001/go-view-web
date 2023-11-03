import { io, Socket } from 'socket.io-client'

export enum ChatStoreKeyInstanceTypeEnum {
  SOCKET = 'socket',
  MAP = 'map'
}

export enum ChatStoreEnum {
  // 当前用户信息
  TARGET_DATA = 'targetData',
  // 关键实例
  KEY_INSTANCE = 'keyInstance'
}

export interface KeyInstanceType {
  [ChatStoreKeyInstanceTypeEnum.SOCKET]: Socket | null
  [ChatStoreKeyInstanceTypeEnum.MAP]: any
}

export interface TargetDataType {}

export interface ChatStoreType {
  [ChatStoreEnum.TARGET_DATA]: TargetDataType | null
  [ChatStoreEnum.KEY_INSTANCE]: KeyInstanceType
}
