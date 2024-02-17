'use client'
import Image from 'next/image'
import { useEffect, type FC } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'

import { Button } from '@/components/Button'
import { useMutateUserProfile } from '@/hooks/useUserProfile'
import { profileState } from '@/store/state'
import type { UpdateUserProfileType, UserProfileType } from '@/types'

export const ProfileScreen: FC = () => {
  const { handleSubmit, register, setValue } = useForm<UpdateUserProfileType>()
  const [profile, setProfile] = useRecoilState<UserProfileType>(profileState)
  const { updateProfileMutarion, getProfileMutation } = useMutateUserProfile(
    setProfile,
    setValue
  )

  const submitUpdateProfileHandler: SubmitHandler<
    UpdateUserProfileType
  > = async (data) => {
    await updateProfileMutarion.mutateAsync({
      userName: data.userName,
      profile: data.profile,
    })
  }

  useEffect(() => {
    getProfileMutation.mutateAsync()
  }, [])

  return (
    <div className="flex flex-col justify-center items-center min-h-screen font-mono">
      <h2>Profile</h2>
      <form onSubmit={handleSubmit(submitUpdateProfileHandler)}>
        <ul className="flex flex-col gap-4">
          <li>
            <Image src="/icon.png" alt="icon" width={100} height={100} />
          </li>
          <li>
            <label htmlFor="email">メールアドレス</label>
            <p>{profile?.email}</p>
          </li>
          <li>
            <label htmlFor="userName">ユーザー名</label>
            <div>
              <input
                {...register('userName', { required: true })}
                className="input"
                type="text"
                name="userName"
              />
            </div>
          </li>
          <li>
            <label htmlFor="profile">プロフィール</label>
            <div>
              <textarea
                {...register('profile', { required: true })}
                name="profile"
                className="input"
                rows={5}
                cols={30}
              />
            </div>
          </li>
          <Button type="submit">登録する</Button>
        </ul>
      </form>
    </div>
  )
}
