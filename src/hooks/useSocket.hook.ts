import { io, Socket } from 'socket.io-client'
export class UseSocketHook {
  socket: Socket
  socketEventName: string

  constructor(socketEventName: string, socketOriginUrl: string) {
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
