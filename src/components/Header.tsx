'use client'
import { Button } from './Button'
import { useMutateAuth } from '@/hooks/useMutateAuth'

export const Header = () => {
  const { logoutMutation } = useMutateAuth()

  const logout = async () => {
    await logoutMutation.mutateAsync()
  }

  return (
    <div className="flex py-4 justify-between">
      <h1>Home work</h1>
      <Button handleClick={logout} isLogout>
        Logout
      </Button>
    </div>
  )
}
