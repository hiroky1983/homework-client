import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'

import { useRouter } from 'next/navigation'
import type { UpdateUserProfileType } from '@/types'

export const useMutateUserProfile = () => {
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
  return {
    updateProfileMutarion,
  }
}
