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
    <div className="w-full h-full overflow-scroll text-white">
      <div className="flex flex-col gap-8">
        {chat.map((chat) => (
          <div key={chat?.id}>
            <div className={chat?.sender === 'me' ? 'chat-me' : 'chat-other'}>
              {chat?.message}
            </div>
            {chat.sender === 'me' && (
              <div>
                <span>{dayjs(chat.createdAt).format('YYYY/MM/DD')}</span>
                <div>
                  <span
                    className="hover:cursor-pointer hover:text-red-500"
                    onClick={async () => await onClickDelete(chat)}
                  >
                    削除する
                  </span>
                </div>
              </div>
            )}
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
