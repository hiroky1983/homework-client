import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

import { useRouter } from 'next/navigation'
import { useAuthError } from './useAuthError'
import type { CredentialType } from '@/types'

export const useMutateAuth = () => {
  const router = useRouter()
  const { authenticationErrorHandling, authorizationErrorHandling } =
    useAuthError()
  const loginMutation = useMutation({
    mutationFn: async (user: CredentialType) =>
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, user),
    onSuccess: () => {
      router.push('/top')
    },
    onError: (err: any) => {
      if (err.response.data.message) {
        authenticationErrorHandling(err.response.data.message)
      } else {
        authenticationErrorHandling(err.response.data)
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
        authenticationErrorHandling(err.response.data.message)
      } else {
        authenticationErrorHandling(err.response.data)
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
        authenticationErrorHandling(err.response.data.message)
      } else {
        authenticationErrorHandling(err.response.data)
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
        authenticationErrorHandling(err.response.data.message)
      } else {
        authenticationErrorHandling(err.response.data)
      }
    },
  })
  const authorizationMutation = useMutation({
    mutationFn: async () =>
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/auth`),
    onError: (err: any) => {
      if (err.response.data.message) {
        authorizationErrorHandling(err.response.data.message)
      } else {
        authorizationErrorHandling(err.response.data)
      }
    },
  })
  return {
    loginMutation,
    registerMutation,
    logoutMutation,
    googleLoginMutation,
    authorizationMutation,
  }
}
