'use client'
import type { FC, MutableRefObject } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import type { SetterOrUpdater } from 'recoil'
import { Button } from './Button'
import { useMutateChat } from '@/hooks/useMutateChat'
import type { ChatType } from '@/types'

type Props = {
  setState: SetterOrUpdater<ChatType | undefined>
  socketRef: MutableRefObject<WebSocket | undefined>
  roomId: string
}

export const Footer: FC<Props> = (props) => {
  const { register, handleSubmit, reset } = useForm<ChatType>()
  const { createChatMutaion } = useMutateChat((_) => _)
  const handleSubmitChat: SubmitHandler<ChatType> = async (data: ChatType) => {
    const req = {
      message: data.message,
      roomId: props.roomId,
    }
    const res = await createChatMutaion.mutateAsync(req)
    const wsReq = {
      id: res.data.id,
      message: res.data.message,
      roomId: props.roomId,
      userId: res.data.userId,
    }
    console.log(wsReq)

    props.socketRef.current!.send(JSON.stringify(wsReq))
    props.socketRef.current!.onmessage = (event) => {
      const res = JSON.parse(event.data)
      props.setState(res)
    }
    reset()
  }

  return (
    <form className="m-8" onSubmit={handleSubmit(handleSubmitChat)}>
      <div className="flex gap-4">
        <input
          {...register('message', { required: true })}
          className="input w-2/3"
          name="message"
          type="text"
          autoFocus
          placeholder="chat内容を入力してください"
        />
        <Button type="submit">送信</Button>
      </div>
    </form>
  )
}
