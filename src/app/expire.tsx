import Link from 'next/link'

export default function Expire() {
  return (
    <div>
      <h2>Token Expired</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Auth Try Again</Link>
    </div>
  )
}
