'use client'
import dayjs from 'dayjs'
import { useState, type FC, useEffect } from 'react'
import { useMutateChat } from '@/hooks/useMutateChat'
import type { ChatType } from '@/types'

type Props = {
  chat: ChatType
}

export const Chat: FC<Props> = (props) => {
  const [chat, setChat] = useState<ChatType[]>([])
  const { getChatMutation } = useMutateChat(setChat)

  useEffect(() => {
    getChatMutation.mutateAsync()
  }, [])

  useEffect(() => {
    if (props.chat) {
      setChat((prev) => [...prev, props.chat])
    }
  }, [props.chat])

  return (
    <div className="w-full overflow-scroll">
      <div className="flex flex-col gap-8">
        {chat.map((chat) => (
          <div key={chat?.id}>
            <span>
              {chat.sender === 'me' &&
                dayjs(chat.createdAt).format('YYYY/MM/DD')}
            </span>
            <div
              className={
                chat?.sender === 'me'
                  ? 'float-left text-white bg-green-700 rounded-md p-8'
                  : 'float-right text-gray-700 bg-white rounded-md p-8'
              }
            >
              {chat?.message}
            </div>
            <span className="float-right">
              {chat.sender === 'other' &&
                dayjs(chat.createdAt).format('YYYY/MM/DD')}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
