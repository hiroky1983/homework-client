import { useMutateAuth } from '@/hooks/useMutateAuth'

export const Todo = () => {
  const { logoutMutation } = useMutateAuth()
  const logout = async () => {
    await logoutMutation.mutateAsync()
  }
  return (
    <div>
      <p>Todo</p>
      <button
        className="h-6 w-6 my-6 text-blue-500 cursor-pointer"
        onClick={logout}
      >
        button
      </button>
    </div>
  )
}
