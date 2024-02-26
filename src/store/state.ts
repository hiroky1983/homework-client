import { atom } from 'recoil'
import type {
  ChatType,
  ErrorMessageType,
  UserProfileType,
  UserStatusType,
  UserType,
} from '@/types'

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

export const isOpenModalState = atom({
  key: 'isOpenModal',
  default: false,
})

export const errorMessage = atom<ErrorMessageType>({
  key: 'error',
  default: { message: '' },
})

export const isShowToastState = atom({
  key: 'isShowToast',
  default: false,
})

export const userStatusState = atom<UserStatusType>({
  key: 'userStatus',
  default: {
    isDeleted: false,
    isLogin: false,
    isExpired: false,
    isVerified: false,
  },
})
