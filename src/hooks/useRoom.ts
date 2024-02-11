import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export const useMutateRoom = () => {
  const router = useRouter()
  const createRoomMutarion = useMutation({
    mutationFn: async () =>
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/room/create`),
  })
  return { createRoomMutarion }
}
