'use client'
import { useEffect, useRef, useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { Button } from './Button'
import { useMutateAuth } from '@/hooks/useMutateAuth'
import type { Chat } from '@/types'

export const Top = () => {
  const [formMessage, setFormMessage] = useState('')
  const [sentMessage, setSentMessage] = useState('')

  const { register, handleSubmit, reset } = useForm<Chat>()
  const { logoutMutation } = useMutateAuth()
  const socketRef = useRef<WebSocket>()
  const [isConnected, setIsConnected] = useState(false)

  const logout = async () => {
    await logoutMutation.mutateAsync()
  }

  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:8080/socket')
    if (!socketRef.current) {
      setIsConnected(!isConnected)
    }
    socketRef.current = websocket

    websocket.onopen = (event) => {
      console.log('connected', event)
      setIsConnected(true)
    }

    if (isConnected) {
      socketRef.current!.onmessage = function (event) {
        setSentMessage(event.data)
      }
      return () => {
        socketRef.current!.onclose = () => {
          console.log('closed')
          setIsConnected(false)
        }
      }
    }
  }, [isConnected])

  const handleSubmitChat: SubmitHandler<Chat> = async (data: Chat) => {
    socketRef.current!.send(data.message)
    socketRef.current!.onmessage = (event) => {
      setFormMessage(event.data)
    }
    reset()
  }

  return (
    <div className="flex gap-4 justify-center items-center flex-col min-h-screen text-gray-600 font-mono">
      <p>Top</p>
      <button
        className="py-2 px-4 rounded text-white bg-indigo-600 hover:opacity-70"
        onClick={logout}
      >
        ログアウト
      </button>
      <form onSubmit={handleSubmit(handleSubmitChat)}>
        <div className="flex gap-2">
          <input
            {...register('message', { required: true })}
            className="px-2 text-sm py-2 border border-gray-300"
            name="message"
            type="text"
            autoFocus
            placeholder="chat内容を入力してください"
          />
          <Button type="submit">送信</Button>
        </div>
      </form>
      <p>{`${isConnected}`}</p>
      <p>{`formMessage: ${formMessage}`}</p>
      <p>{`sentMessage: ${sentMessage}`}</p>
    </div>
  )
}
