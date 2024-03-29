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
  profile: string
}

export type UserProfileType = {
  userName: string
  email: string
  profile: string
  imagePath: string
}

export type UserType = {
  id: string
  userName: string
  email: string
  roomId: string
  imagePath: string
}

export type CreateRoomRequestType = {
  user_id: string
}

export type CreateRoomResponseType = {
  roomId: string
}

export type GetChatRequestType = {
  roomId: string
}

export type CreateChatRequestType = {
  roomId: string
  message: string
}

export type ErrorMessageType = {
  message: string
}

export type UserStatusType = {
  isDeleted: boolean
  isExpired: boolean
  isLogin: boolean
  isVerified: boolean
}
