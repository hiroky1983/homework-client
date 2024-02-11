type Props = {
  params: {
    slug: string
  }
}

export default function page({ params }: { params: { id: string } }) {
  return (
    <div>
      <div>{params.id}</div>
    </div>
  )
}
