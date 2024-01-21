import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useMutateChat = (setState: any) => {
  const getChatMutation = useMutation({
    mutationFn: async () =>
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/chat/get`),
    onSuccess: (data) => {
      setState(data.data)
    },
  })
  return {
    getChatMutation,
  }
}
