import { defineStore } from 'pinia'
import { ChatStoreType } from './chatStore.d'

// 系统数据记录
export const useChatStore = defineStore({
  id: 'useChatStore',
  state: (): ChatStoreType => ({
    // 用户自己的数据
    targetData: null,
    // 基本数据
    keyInstance: {
      socket: null,
      map: null
    }
  }),
  getters: {
    getTargetData(): any {
      return this.targetData
    },
    getKeyInstance(): any {
      return this.keyInstance
    }
  }
})
