import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import type { UserType } from '@/types'

export const useMutateUser = () => {
  const getUsersMutation = useMutation({
    mutationFn: async () =>
      await axios.get<UserType[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/user/users`
      ),
  })
  return { getUsersMutation }
}
