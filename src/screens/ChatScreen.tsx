'use client'
import { type FC, Suspense, useEffect, useRef } from 'react'
import { useRecoilState } from 'recoil'

import Loading from '@/app/loading'
import { Chat } from '@/components/Chat'
import { Footer } from '@/components/Footer'
import { useCookie } from '@/hooks/useSetCookie'
import { formMessageState, isConnectedState } from '@/store/state'
import type { ChatType } from '@/types'

type Props = {
  roomId: string
}

export const ChatScreen: FC<Props> = (props) => {
  const [formMessage, setFormMessage] = useRecoilState<ChatType | undefined>(
    formMessageState
  )
  const [isConnected, setIsConnected] = useRecoilState(isConnectedState)
  const socketRef = useRef<WebSocket>()
  const { getCsrfToken } = useCookie()

  useEffect(() => {
    getCsrfToken()
    const websocket = new WebSocket(
      `ws://localhost:8080/socket/${props.roomId}`
    )
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
    <div>
      <Suspense fallback={<Loading />}>
        <div className="flex gap-4 items-center flex-col text-gray-600 font-mono">
          <Chat chats={formMessage!} roomId={props.roomId} />
        </div>
        <Footer
          setState={setFormMessage}
          socketRef={socketRef}
          roomId={props.roomId}
        />
      </Suspense>
    </div>
  )
}
