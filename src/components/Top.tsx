'use client'
import { useEffect, useRef } from 'react'
import { useRecoilState } from 'recoil'
import { Button } from './Button'
import { Chat } from './Chat'
import { Footer } from './Footer'
import { useMutateAuth } from '@/hooks/useMutateAuth'
import { useCookie } from '@/hooks/useSetCookie'
import { formMessageState, isConnectedState } from '@/store/state'
import type { ChatType } from '@/types'

export const Top = () => {
  const [formMessage, setFormMessage] = useRecoilState<ChatType | undefined>(
    formMessageState
  )
  const [isConnected, setIsConnected] = useRecoilState(isConnectedState)
  const socketRef = useRef<WebSocket>()
  const { sendMailMutation } = useMutateAuth()
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

  const onClickSendMail = async () => {
    await sendMailMutation.mutateAsync()
  }

  return (
    <div className="flex gap-4 justify-center items-center flex-col min-h-screen text-gray-600 font-mono">
      <p>Top</p>
      <Button type="button" handleClick={onClickSendMail}>
        メール送る
      </Button>
      <Chat chat={formMessage!} />
      <Footer setState={setFormMessage} socketRef={socketRef} />
    </div>
  )
}
