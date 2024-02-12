import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import type { CreateRoomRequestType } from '@/types'

export const useMutateRoom = () => {
  const router = useRouter()
  const createRoomMutarion = useMutation({
    mutationFn: async (data: CreateRoomRequestType) =>
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/room/create`, data),
    onSuccess: (data) => {
      router.push(`/chat/${data}`)
    },
  })
  return { createRoomMutarion }
}
