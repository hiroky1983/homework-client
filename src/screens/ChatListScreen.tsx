'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, type FC, Suspense } from 'react'
import { useRecoilState } from 'recoil'
import Loading from '@/app/loading'
import { Button } from '@/components/Button'
import { useMutateUser } from '@/hooks/useUser'
import { userListState } from '@/store/state'
import type { UserType } from '@/types'

export const ChatListScreen: FC = () => {
  const { getUsersMutation } = useMutateUser()
  const [users, setUsers] = useRecoilState<UserType[]>(userListState)
  const router = useRouter()

  useEffect(() => {
    getUsersMutation.mutateAsync().then((res) => {
      setUsers(res.data)
    })
  }, [])

  const onClickChatRoom = async (id: string) => {
    router.push(`/chat/${id}`)
  }

  return (
    <div className="h-screen">
      <Suspense fallback={<Loading />}>
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
              <Button handleClick={() => onClickChatRoom(user.id)}>
                チャットを始める
              </Button>
            </li>
          ))}
        </ul>
      </Suspense>
      <div className="hidden"></div>
    </div>
  )
}
