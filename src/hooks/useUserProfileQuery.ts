import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { UserProfileType } from '@/types'

const getUserProfileQuery = async () => {
  const { data } = await axios.get<UserProfileType>(
    `${process.env.NEXT_PUBLIC_API_URL}/user/get_profile`
  )
  return data
}
export const useUserProfileQuery = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getUserProfileQuery,
    staleTime: Infinity,
  })
}
