import { useEffect, type FC } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import { Button } from './Button'
import { useMutateUserProfile } from '@/hooks/useUserProfile'
import { profileState } from '@/store/state'
import type { UpdateUserProfile, UserProfile } from '@/types'

export const Profile: FC = () => {
  const { handleSubmit, register, setValue } = useForm<UpdateUserProfile>()
  const [profile, setProfile] = useRecoilState<UserProfile>(profileState)
  const { updateProfileMutarion, getProfileMutation } = useMutateUserProfile(
    setProfile,
    setValue
  )

  const submitUpdateProfileHandler: SubmitHandler<UpdateUserProfile> = async (
    data
  ) => {
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
                className="text-gray-600"
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
