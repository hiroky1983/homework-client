import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import type { SetterOrUpdater } from 'recoil'
import type {
  ChatType,
  CreateChatRequestType,
  DeleteChatType,
  GetChatRequestType,
} from '@/types'

export const useMutateChat = (setState: SetterOrUpdater<ChatType[]>) => {
  const getChatMutation = useMutation({
    mutationFn: async (data: GetChatRequestType) =>
      await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/chat/get/${data.roomId}`
      ),
    onSuccess: (data) => {
      setState(data.data)
    },
  })
  const createChatMutaion = useMutation({
    mutationFn: async (data: CreateChatRequestType) =>
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/chat/create`, data),
  })
  const deleteChatMutation = useMutation({
    mutationFn: async (chatId: DeleteChatType) =>
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/chat/delete`, chatId),
  })
  return {
    getChatMutation,
    createChatMutaion,
    deleteChatMutation,
  }
}
