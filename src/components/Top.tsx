'use client'
import { useEffect, useRef, useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { useMutateChat } from '@/hooks/useChat'
import { useMutateAuth } from '@/hooks/useMutateAuth'
import type { Chat } from '@/types'

export const Top = () => {
  const [formMessage, setFormMessage] = useState('')
  const [sentMessage, setSentMessage] = useState('')

  const { register, handleSubmit } = useForm<Chat>()
  const { logoutMutation } = useMutateAuth()
  const { getChat } = useMutateChat()
  const socketRef = useRef<WebSocket>()
  const [isConnected, setIsConnected] = useState(false)

  const logout = async () => {
    await logoutMutation.mutateAsync()
  }

  useEffect(() => {
    if (!socketRef.current) {
      setIsConnected(!isConnected)
    }
    socketRef.current = new WebSocket('ws://localhost:8080/socket')
    if (socketRef.current) {
      socketRef.current!.onopen = function (event) {
        console.error('WebSocket Error:', event)
        setIsConnected(true)

        console.log('Connected')
      }

      socketRef.current!.onclose = function () {
        console.log('closed')
        setIsConnected(false)
      }

      // server 側から送られてきたデータを受け取る
      socketRef.current!.onmessage = function (event) {
        setSentMessage(event.data)
      }
    }

    return () => {
      if (socketRef.current == null) {
        return
      }
      socketRef.current.close()
    }
  }, [isConnected])

  const handleSubmitChat: SubmitHandler<Chat> = async (data: Chat) => {
    setFormMessage(data.message)
    socketRef.current?.send(data.message)
  }

  console.log('socket', socketRef.current)

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
        <button
          className="py-2 px-4 rounded text-white bg-indigo-600 hover:opacity-70"
          type="submit"
        >
          chatする
        </button>
        <div>
          <input
            {...register('message', { required: true })}
            className="mb-3 px-3 text-sm py-2 border border-gray-300"
            name="message"
            type="text"
            autoFocus
            placeholder="chat内容を入力してください"
          />
        </div>
      </form>
      <p>{`${isConnected}`}</p>
      <p>{`formMessage: ${formMessage}`}</p>
      <p>{`sentMessage: ${sentMessage}`}</p>
    </div>
  )
}
