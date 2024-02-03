import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { Dispatch, SetStateAction } from 'react'
import type { ChatType, DeleteChatType } from '@/types'

const getChatQuery = async () => {
  const { data } = await axios.get<ChatType[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/chat/get`
  )
  return data
}
export const useQueryChat = () => {
  return useQuery({
    queryKey: ['chats'],
    queryFn: getChatQuery,
    staleTime: Infinity,
  })
}
