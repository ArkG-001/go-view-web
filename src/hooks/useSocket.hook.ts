import { io, Socket } from 'socket.io-client'
export class UseSocketHook {
  socket: Socket
  subscribeChannel: string

  constructor(socketEventName: string, socketOriginUrl: string) {
    this.socket = io(socketOriginUrl)
    this.subscribeChannel = socketEventName
    if (!socketOriginUrl) {
      console.log('URL地址格式有误!')
      return window['$message'].error('URL地址格式有误!')
    }
    if (!socketEventName) {
      console.log('频道格式有误!')
      return window['$message'].error('频道格式有误!')
    }
  }

  // 连接
  public connect(callback: (...args: any[]) => void) {
    this.socket.on('connect', callback)
  }

  public getListeners = () => {
    return this.socket.listenersAnyOutgoing()
  }

  // public unConnect(callback: (...args: any[]) => void) {
  //   this.socket.off('connect', callback)
  //   // then, later
  //   this.socket.offAny(myListener)
  // }

  public disconnect() {
    this.socket.disconnect()
  }

  // 订阅
  public subscribe() {
    this.socket.emit('subscribe', this.subscribeChannel)
  }

  // 关闭连接
  public close() {
    this.socket.close()
    console.log('socket已关闭')
  }

  // 断开连接时触发
  public onDisconnect(callback: (...args: any[]) => void) {
    this.socket.on('disconnect', callback)
  }

  // 取消订阅
  public unsubscribe(channel: string) {
    this.socket.emit('unsubscribe', channel)
  }

  public on(callback: (...args: any[]) => void) {
    this.socket.on(this.subscribeChannel, callback)
  }

  public emit(channel: string, data: any) {
    this.socket.emit(channel, data)
  }

  public send(data: any) {
    this.socket.send(data)
  }
}
