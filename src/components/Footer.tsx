'use client'
import type { FC } from 'react'
import type { SubmitHandler} from 'react-hook-form';
import { useForm } from 'react-hook-form'
import { Button } from './Button'
import { useMutateAuth } from '@/hooks/useMutateAuth'
import type { ChatType } from '@/types'

type Props = {
  setState: React.Dispatch<React.SetStateAction<ChatType | undefined>>
  socketRef: React.MutableRefObject<WebSocket | undefined>
}

export const Footer: FC<Props> = (props) => {
  const { register, handleSubmit, reset } = useForm<ChatType>()

  const { logoutMutation } = useMutateAuth()

  const logout = async () => {
    await logoutMutation.mutateAsync()
  }

  const handleSubmitChat: SubmitHandler<ChatType> = async (data: ChatType) => {
    props.socketRef.current!.send(data.message)
    props.socketRef.current!.onmessage = (event) => {
      const res = JSON.parse(event.data)
      props.setState(res)
    }
    reset()
  }

  return (
    <>
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
    </>
  )
}
