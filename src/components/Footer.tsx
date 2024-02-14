'use client'
import type { FC, MutableRefObject } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import type { SetterOrUpdater } from 'recoil'
import { Button } from './Button'
import type { ChatType } from '@/types'

type Props = {
  setState: SetterOrUpdater<ChatType | undefined>
  socketRef: MutableRefObject<WebSocket | undefined>
  roomId: string
}

export const Footer: FC<Props> = (props) => {
  const { register, handleSubmit, reset } = useForm<ChatType>()

  const handleSubmitChat: SubmitHandler<ChatType> = async (data: ChatType) => {
    const req = {
      message: data.message,
      roomId: props.roomId,
    }

    props.socketRef.current!.send(JSON.stringify(req))
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
