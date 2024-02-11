'use client'
import Link from 'next/link'
import { Button } from './Button'
import { useMutateAuth } from '@/hooks/useMutateAuth'

export const Header = () => {
  const { logoutMutation } = useMutateAuth()

  const logout = async () => {
    await logoutMutation.mutateAsync()
  }

  return (
    <div className="flex pt-4 justify-between">
      <Link href="/top">
        <h1>Home work</h1>
      </Link>
      <Link href="/profile">Profile</Link>
      <Link href="/users">users</Link>
      <Button handleClick={logout} isLogout>
        Logout
      </Button>
    </div>
  )
}
