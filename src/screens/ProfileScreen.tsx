'use client'
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
            <label htmlFor="email">email</label>
            <p>{profile?.email}</p>
          </li>
          <li>
            <label htmlFor="">username</label>
            <div>
              <input
                {...register('userName', { required: true })}
                className="input"
                type="text"
                name="userName"
              />
            </div>
          </li>
          <Button type="submit">登録する</Button>
        </ul>
      </form>
    </div>
  )
}
