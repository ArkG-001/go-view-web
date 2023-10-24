import { io, Socket } from 'socket.io-client'
import type { RequestGlobalConfigType, RequestConfigType } from '@/store/modules/chartEditStore/chartEditStore.d'
export const socket = io('ws://47.103.75.123:9200')

const prefix = 'javascript:'
// 对输入字符进行转义处理
export const translateStr = (target: string | Record<any, any>) => {
  if (typeof target === 'string') {
    if (target.startsWith(prefix)) {
      const funcStr = target.split(prefix)[1]
      let result
      try {
        result = new Function(`${funcStr}`)()
      } catch (error) {
        console.log(error)
        window['$message'].error('js内容解析有误！')
      }
      return result
    } else {
      return target
    }
  }
  for (const key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      const subTarget = target[key]
      target[key] = translateStr(subTarget)
    }
  }
  return target
}

export class TargetSocket {
  socket: Socket
  socketEventName: string

  constructor(targetParams: RequestConfigType, globalParams: RequestGlobalConfigType) {
    const { socketEventName } = targetParams
    const { socketOriginUrl } = globalParams
    this.socket = io(socketOriginUrl || '')
    this.socketEventName = socketEventName || ''
    if (!socketOriginUrl) {
      return window['$message'].error('URL地址格式有误!')
    }
  }

  public connect(callback: (...args: any[]) => void) {
    this.socket.on('connect', callback)
  }

  public subscribe() {
    this.socket.emit('subscribe', this.socketEventName)
  }

  public close() {
    this.socket.close()
    console.log('socket已关闭')
  }

  // 断开连接时触发
  public onDisconnect(callback: (...args: any[]) => void) {
    this.socket.on('disconnect', callback)
  }

  public unsubscribe(channel: string) {
    this.socket.emit('unsubscribe', channel)
  }

  public on(callback: (...args: any[]) => void) {
    this.socket.on(this.socketEventName, callback)
  }

  public emit(channel: string, data: any) {
    this.socket.emit(channel, data)
  }

  public send(data: any) {
    this.socket.send(data)
  }
}
