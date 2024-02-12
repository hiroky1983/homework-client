import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

import { useRouter } from 'next/navigation'
import { useError } from './useError'
import type { CredentialType } from '@/types'

export const useMutateAuth = () => {
  const router = useRouter()
  const { switchErrorHandling } = useError()
  const loginMutation = useMutation({
    mutationFn: async (user: CredentialType) =>
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, user),
    onSuccess: () => {
      router.push('/top')
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
    mutationFn: async (user: CredentialType) =>
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/signup`, user),
    onSuccess: () => {
      router.push('/confirm')
    },
    onError: (err: any) => {
      if (err.response.data.message) {
        switchErrorHandling(err.response.data.message)
      } else {
        switchErrorHandling(err.response.data)
      }
    },
  })
  const googleLoginMutation = useMutation({
    mutationFn: async () => {
      const data = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/google`)
      router.push(data.data)
    },
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
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/logout`),
    onSuccess: () => {
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
  return {
    loginMutation,
    registerMutation,
    logoutMutation,
    googleLoginMutation,
  }
}
