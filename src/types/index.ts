export type CredentialType = {
  email: string
  password: string
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

export type UpdateUserProfileType = {
  userName: string
}

export type UserProfileType = {
  userName: string
  email: string
}

export type UserType = {
  id: string
  userName: string
  email: string
  roomID: string
}
