import { useMutateAuth } from '@/hooks/useMutateAuth'

export const Top = () => {
  const { logoutMutation } = useMutateAuth()
  const logout = async () => {
    await logoutMutation.mutateAsync()
  }
  return (
    <div>
      <p>Top</p>
      <button
        className="py-2 px-4 rounded text-white bg-indigo-600 hover:opacity-70"
        onClick={logout}
      >
        ログアウト
      </button>
    </div>
  )
}
