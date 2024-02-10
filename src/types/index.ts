export type CsrfToken = {
  csrf_token: string
}
export type Credential = {
  email: string
  password: string
}

export type IsLogin = {
  isLogin: boolean
}

export type ChatType = {
  id: number
  message: string
  sender: 'me' | 'other'
  createdAt: string
}

export type DeleteChatType = {
  id: number
}

export type UpdateUserProfile = {
  userName: string
}

export type UserProfile = {
  userName: string
  email: string
}

// todo user_nameをキャメルケースにリファクタリングする
export type UserType = {
  id: string
  user_name: string
  email: string
}
