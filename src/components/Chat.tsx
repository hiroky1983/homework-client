'use client'
import dayjs from 'dayjs'
import Image from 'next/image'
import { type FC, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { Modal } from './Modal'
import { useMutateChat } from '@/hooks/useMutateChat'
import { chatState, isOpenState } from '@/store/state'
import type { ChatType } from '@/types'

type Props = {
  chats: ChatType
  roomId: string
}

export const Chat: FC<Props> = (props) => {
  const [chats, setChats] = useRecoilState<ChatType[]>(chatState)
  const [isOpne, setIsOpen] = useRecoilState(isOpenState)
  const { getChatMutation, deleteChatMutation } = useMutateChat(setChats)

  useEffect(() => {
    getChatMutation.mutateAsync({ roomId: props.roomId })
  }, [])

  useEffect(() => {
    if (props.chats) {
      setChats((prev) => [...prev, props.chats])
    }
  }, [props.chats])

  const onClickDelete = async (c: ChatType) => {
    await deleteChatMutation.mutateAsync({
      id: c.id,
    })
    setChats((prev) => prev.filter((chat) => chat.id !== c.id))
    setIsOpen(false)
  }

  const onOpen = () => {
    setIsOpen(!isOpne)
  }

  return (
    <div className="w-full h-full overflow-scroll text-gray-500 text-sm">
      <div className="flex flex-col gap-8">
        {chats.map((chat) => (
          <div key={chat?.id}>
            {isOpne && (
              <Modal
                onOpen={onOpen}
                hadleClick={async () => onClickDelete(chat)}
              />
            )}
            <div
              className={
                chat.sender === 'me' ? 'flex flex-row-reverse' : 'flex gap-2'
              }
            >
              {chat.sender === 'other' && (
                <Image src="/icon.png" alt="icon" width={40} height={5} />
              )}
              <div className={chat?.sender === 'me' ? 'chat-me' : 'chat-other'}>
                {chat?.message}
              </div>
              <div className="ml-2">
                <p>{dayjs(chat.createdAt).format('YYYY/MM/DD')}</p>
                {chat.sender === 'me' && (
                  <p
                    className="hover:cursor-pointer hover:text-red-500"
                    onClick={onOpen}
                  >
                    削除する
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
