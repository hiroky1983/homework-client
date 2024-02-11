'use client'
import Image from 'next/image'
import { useEffect, type FC, Suspense } from 'react'
import { useRecoilState } from 'recoil'
import Loading from '@/app/loading'
import { Button } from '@/components/Button'
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
    <Suspense fallback={<Loading />}>
      <div>UserListScreen</div>
      <ul className="flex justify-between flex-col gap-6">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex justify-between gap-2 border-b-2 py-2"
          >
            <div className="flex items-center gap-2">
              <Image src="/icon.png" alt="icon" width={40} height={40} />
              <p>{user.user_name}</p>
            </div>
            <Button>チャットを始める</Button>
          </li>
        ))}
      </ul>
    </Suspense>
  )
}
