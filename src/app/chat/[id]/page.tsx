import { ChatScreen } from '@/screens/ChatScreen'

type Props = {
  params: {
    slug: string
  }
}

export default function page({ params }: { params: { id: string } }) {
  console.log(params.id)
  return (
    <>
      <ChatScreen id={params.id} />
    </>
  )
}
