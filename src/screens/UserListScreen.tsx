'use client'
import { useEffect, type FC } from 'react'
import { useRecoilState } from 'recoil'
import { useMutateUser } from '@/hooks/useUser'
import { userListState } from '@/store/state'
import type { UserType } from '@/types'

export const UserListScreen: FC = () => {
  const { getUsersMutation } = useMutateUser()
  const [users, setUsers] = useRecoilState<UserType[]>(userListState)
  console.log(users)

  useEffect(() => {
    getUsersMutation.mutateAsync().then((res) => {
      setUsers(res.data)
    })
  }, [])

  return (
    <>
      <div>UserListScreen</div>
      {users.map((user) => (
        <div key={user.id}>{user.user_name}</div>
      ))}
    </>
  )
}
