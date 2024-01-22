'use client'
import { useEffect, useRef } from 'react'
import { useRecoilState } from 'recoil'
import { Chat } from './Chat'
import { Footer } from './Footer'
import { formMessageState, isConnectedState } from '@/store/state'
import type { ChatType } from '@/types'

export const Top = () => {
  const [formMessage, setFormMessage] = useRecoilState<ChatType | undefined>(
    formMessageState
  )
  const [isConnected, setIsConnected] = useRecoilState(isConnectedState)
  const socketRef = useRef<WebSocket>()

  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:8080/chat/socket')
    if (!socketRef.current) {
      setIsConnected(!isConnected)
    }
    socketRef.current = websocket

    websocket.onopen = (event) => {
      console.log('connected', event)
      setIsConnected(true)
    }

    return () => {
      socketRef.current!.onclose = () => {
        console.log('closed')
        setIsConnected(false)
      }
    }
  }, [isConnected])

  return (
    <div className="flex gap-4 justify-center items-center flex-col min-h-screen text-gray-600 font-mono">
      <p>Top</p>
      <Chat chat={formMessage!} />
      <Footer setState={setFormMessage} socketRef={socketRef} />
    </div>
  )
}
