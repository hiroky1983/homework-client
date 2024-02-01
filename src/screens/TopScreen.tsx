'use client'
import { Suspense, useEffect, useRef } from 'react'
import { useRecoilState } from 'recoil'

import Loading from '@/app/loading'
import { Chat } from '@/components/Chat'
import { Footer } from '@/components/Footer'
import { useCookie } from '@/hooks/useSetCookie'
import { formMessageState, isConnectedState } from '@/store/state'
import type { ChatType } from '@/types'

export const TopScreen = () => {
  const [formMessage, setFormMessage] = useRecoilState<ChatType | undefined>(
    formMessageState
  )
  const [isConnected, setIsConnected] = useRecoilState(isConnectedState)
  const socketRef = useRef<WebSocket>()
  const { getCsrfToken } = useCookie()

  useEffect(() => {
    getCsrfToken()
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
    <Suspense fallback={<Loading />}>
      <div className="flex gap-4 justify-center items-center flex-col min-h-screen text-gray-600 font-mono">
        <p>Top</p>
        <Chat chat={formMessage!} />
        <Footer setState={setFormMessage} socketRef={socketRef} />
      </div>
    </Suspense>
  )
}
