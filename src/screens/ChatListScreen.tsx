'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, type FC, Suspense } from 'react'
import { useRecoilState } from 'recoil'
import Loading from '@/app/loading'
import { Button } from '@/components/Button'
import { useMutateRoom } from '@/hooks/useRoom'
import { useMutateUser } from '@/hooks/useUser'
import { userListState } from '@/store/state'
import type { UserType } from '@/types'

export const ChatListScreen: FC = () => {
  const { getUsersMutation } = useMutateUser()
  const { createRoomMutarion } = useMutateRoom()
  const [users, setUsers] = useRecoilState<UserType[]>(userListState)

  useEffect(() => {
    getUsersMutation.mutateAsync().then((res) => {
      setUsers(res.data)
    })
  }, [])

  const onClickChatRoom = async (id: string) => {
    await createRoomMutarion.mutateAsync({
      user_id: id,
    })
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
                <p>{user.userName}</p>
              </div>
              {user.roomId ? (
                <Link className="text-3xl" href={`/chat/${user.roomId}`}>
                  &gt;
                </Link>
              ) : (
                <Button
                  handleClick={async () => await onClickChatRoom(user.id)}
                >
                  チャットを始める
                </Button>
              )}
            </li>
          ))}
        </ul>
      </Suspense>
      <div className="hidden"></div>
    </div>
  )
}
