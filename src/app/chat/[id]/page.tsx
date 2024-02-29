import { ChatScreen } from '@/screens/ChatScreen'

export default function page({ params }: { params: { id: string } }) {
  return (
    <>
      <ChatScreen roomId={params.id} />
    </>
  )
}
