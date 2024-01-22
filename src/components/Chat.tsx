'use client'
import dayjs from 'dayjs'
import { type FC, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { useMutateChat } from '@/hooks/useMutateChat'
import { chatState } from '@/store/state'
import type { ChatType } from '@/types'

type Props = {
  chat: ChatType
}

export const Chat: FC<Props> = (props) => {
  const [chat, setChat] = useRecoilState<ChatType[]>(chatState)
  const { getChatMutation, deleteChatMutation } = useMutateChat(setChat)

  useEffect(() => {
    getChatMutation.mutateAsync()
  }, [])

  useEffect(() => {
    if (props.chat) {
      setChat((prev) => [...prev, props.chat])
    }
  }, [props.chat])

  const onClickDelete = async (c: ChatType) => {
    await deleteChatMutation.mutateAsync({
      id: c.id,
    })
    setChat((prev) => prev.filter((chat) => chat.id !== c.id))
  }

  return (
    <div className="w-full overflow-scroll">
      <div className="flex flex-col gap-8">
        {chat.map((chat) => (
          <div key={chat?.id}>
            {chat.sender === 'me' && (
              <div>
                <span
                  className="hover:cursor-pointer"
                  onClick={async () => await onClickDelete(chat)}
                >
                  削除する
                </span>
                <span>{dayjs(chat.createdAt).format('YYYY/MM/DD')}</span>
              </div>
            )}
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
