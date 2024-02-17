import { atom } from 'recoil'
import type { ChatType, UserProfileType, UserType } from '@/types'

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

export const profileState = atom<UserProfileType>({
  key: 'profile',
  default: undefined,
})

export const userListState = atom<UserType[]>({
  key: 'userList',
  default: [],
})

export const isOpenState = atom({
  key: 'isOpen',
  default: false,
})
