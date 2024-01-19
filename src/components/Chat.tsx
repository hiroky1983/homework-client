import type { FC } from 'react'

type Chat = {
  id: number
  message: string
  sender: 'me' | 'other'
  createdAt: string
}

const demoChat: Chat[] = [
  {
    id: 1,
    message: 'Hello Hoge',
    sender: 'me',
    createdAt: '2021-10-10',
  },
  {
    id: 2,
    message: 'Hello Too, Fuga',
    sender: 'other',
    createdAt: '2021-10-11',
  },
  {
    id: 3,
    message: 'Hew are you?',
    sender: 'me',
    createdAt: '2021-10-12',
  },
]
export const Chat: FC = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-8">
        {demoChat.map((chat) => (
          <div key={chat.id}>
            <div
              className={
                chat.sender === 'me'
                  ? 'float-left text-white bg-green-700 rounded-md p-8'
                  : 'float-right text-gray-700 bg-white rounded-md p-8'
              }
            >
              {chat.message}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
