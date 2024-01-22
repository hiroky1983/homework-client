import { atom } from 'recoil'
import type { ChatType } from '@/types'

export const isLoginState = atom({
  key: 'isLogin',
  default: true,
})

export const isConnectedState = atom({
  key: 'isConnected',
  default: false,
})

export const formMessageState = atom<ChatType>({
  key: 'formMessage',
  default: {
    id: 0,
    message: '',
    sender: 'me',
    createdAt: '',
  },
})

export const chatState = atom<ChatType[]>({
  key: 'chat',
  default: [],
})
