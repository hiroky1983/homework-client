'use client'
import { useRecoilState } from 'recoil'
import { userStatusState } from '@/store/state'

export const useUserStatus = () => {
  const [userStatus, setUserStatus] = useRecoilState(userStatusState)
  return { userStatus, setUserStatus }
}
