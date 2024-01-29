import { atom } from 'recoil'
import type { ChatType, UserProfile } from '@/types'

export const isLoginState = atom({
  key: 'isLogin',
  default: true,
})

export const isConnectedState = atom({
  key: 'isConnected',
  default: false,
})

export const formMessageState = atom<ChatType | undefined>({
  key: 'formMessage',
  default: undefined,
})

export const chatState = atom<ChatType[]>({
  key: 'chat',
  default: [],
})

export const profileState = atom<UserProfile>({
  key: 'profile',
  default: undefined,
})
