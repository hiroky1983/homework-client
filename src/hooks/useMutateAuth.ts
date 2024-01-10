import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'

import { useRouter } from 'next/router'
import { useError } from './useError'
import useStore from '@/store'
import type { Credential } from '@/types'

type LoginResponse = {
  code: number
  message: string
}

export const useMutateAuth = () => {
  const router = useRouter()
  const resetEditedTask = useStore((state) => state.resetEditedTask)
  const { switchErrorHandling } = useError()
  const loginMutation = useMutation({
    mutationFn: async (user: Credential) =>
      await axios.post(`${process.env.REACT_APP_API_URL}/login`, user),
    onSuccess: () => {
      router.push('/todo')
    },
    onError: (err: any) => {
      if (err.response.data.message) {
        switchErrorHandling(err.response.data.message)
      } else {
        switchErrorHandling(err.response.data)
      }
    },
  })
  const registerMutation = useMutation({
    mutationFn: async (user: Credential) =>
      await axios.post(`${process.env.REACT_APP_API_URL}/signup`, user),
    onError: (err: any) => {
      if (err.response.data.message) {
        switchErrorHandling(err.response.data.message)
      } else {
        switchErrorHandling(err.response.data)
      }
    },
  })
  const logoutMutation = useMutation({
    mutationFn: async () =>
      await axios.post(`${process.env.REACT_APP_API_URL}/logout`),
    onSuccess: () => {
      resetEditedTask()
      router.push('/')
    },
    onError: (err: any) => {
      if (err.response.data.message) {
        switchErrorHandling(err.response.data.message)
      } else {
        switchErrorHandling(err.response.data)
      }
    },
  })
  return { loginMutation, registerMutation, logoutMutation }
}
