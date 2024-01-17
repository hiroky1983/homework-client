// hooks/useSocket.js
import { useState } from 'react'
import { io } from 'socket.io-client'
import type { Chat } from '@/types'

export const useSocket = (setState: any) => {
  const [socket, setSocket] = useState<any>(null)

  const connectSocket = () => {
    if (!socket) {
      const newSocket = io({
        autoConnect: false,
      })
      setSocket(newSocket)
      newSocket.connect()
    }
  }

  const disconnectSocket = () => {
    if (socket) {
      socket.disconnect()
    }
  }

  const socketInitializer = (socket: any) => {
    socket.on('connect', () => {
      console.log('Connected to the server')
    })
    socket.on('disconnect', () => {
      console.log('Disconnected from the server')
    })
    socket.on('message', (chat: Chat) => {
      setState(chat.message)
    })
  }

  return {
    socket,
    connectSocket,
    disconnectSocket,
    socketInitializer,
  }
}
