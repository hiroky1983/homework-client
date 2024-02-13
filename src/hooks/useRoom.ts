import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import type { CreateRoomRequestType, CreateRoomResponseType } from '@/types'

export const useMutateRoom = () => {
  const router = useRouter()
  const createRoomMutarion = useMutation({
    mutationFn: async (data: CreateRoomRequestType) =>
      (
        await axios.post<CreateRoomResponseType>(
          `${process.env.NEXT_PUBLIC_API_URL}/room/create`,
          data
        )
      ).data,
    onSuccess: (data: CreateRoomResponseType) => {
      router.push(`/chat/${data.roomId}`)
    },
  })
  return { createRoomMutarion }
}
