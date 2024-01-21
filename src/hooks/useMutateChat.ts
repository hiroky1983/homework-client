import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import type { Dispatch, SetStateAction } from 'react'
import type { ChatType, DeleteChatType } from '@/types'

export const useMutateChat = (
  setState: Dispatch<SetStateAction<ChatType[]>>
) => {
  const getChatMutation = useMutation({
    mutationFn: async () =>
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/chat/get`),
    onSuccess: (data) => {
      setState(data.data)
    },
  })
  const deleteChatMutation = useMutation({
    mutationFn: async (chatId: DeleteChatType) =>
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/chat/delete`, chatId),
  })
  return {
    getChatMutation,
    deleteChatMutation,
  }
}
