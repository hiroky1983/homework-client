import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

import { useRouter } from 'next/navigation'
import type { Dispatch, SetStateAction } from 'react'
import type { UseFormSetValue } from 'react-hook-form'
import type { UpdateUserProfile, UserProfile } from '@/types'

export const useMutateUserProfile = (
  setState: Dispatch<SetStateAction<UserProfile>>,
  setValue: UseFormSetValue<UpdateUserProfile>
) => {
  const router = useRouter()
  const updateProfileMutarion = useMutation({
    mutationFn: async (user: UpdateUserProfile) =>
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/create_profile`,
        user
      ),
    onSuccess: () => {
      router.push('/top')
    },
  })

  const getProfileMutation = useMutation({
    mutationFn: async () =>
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/get_profile`),
    onSuccess: (data) => {
      setValue('userName', data.data.user_name)
      setState({
        userName: data.data.user_name,
        email: data.data.email,
      })
    },
  })
  return {
    updateProfileMutarion,
    getProfileMutation,
  }
}
