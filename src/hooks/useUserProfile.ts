import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

import { useRouter } from 'next/navigation'
import type { Dispatch, SetStateAction } from 'react'
import type { UseFormSetValue } from 'react-hook-form'
import type { UpdateUserProfileType, UserProfileType } from '@/types'

export const useMutateUserProfile = (
  setState: Dispatch<SetStateAction<UserProfileType>>,
  setValue: UseFormSetValue<UpdateUserProfileType>
) => {
  const router = useRouter()
  const updateProfileMutarion = useMutation({
    mutationFn: async (user: UpdateUserProfileType) =>
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
      setValue('userName', data.data.userName)
      setState({
        userName: data.data.userName,
        email: data.data.email,
      })
    },
  })
  return {
    updateProfileMutarion,
    getProfileMutation,
  }
}
