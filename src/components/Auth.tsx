'use client'
import React, { useEffect, useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { useMutateAuth } from '@/hooks/useMutateAuth'
import type { Credential, IsLogin } from '@/types'
import { useCookie } from '@/hooks/useSetCookie'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export const Auth = () => {
  const { register, handleSubmit } = useForm<Credential>()
  const queryClient = useQueryClient()
  queryClient.setQueryData<IsLogin>(['isLogin'], { isLogin: false })

  // const isLogin = useQuery(['isLogin'], {
  //   initialData: { isLogin: false },
  //   enabled: false,
  // }).data

  const isLogin = queryClient.getQueryData<IsLogin>(['isLogin'])
  const setIsLogin = (isLogin: boolean) => {
    queryClient.setQueryData<IsLogin>(['isLogin'], { isLogin })
  }
  // const [isLogin, setIsLogin] = useState(true)
  const { loginMutation, registerMutation } = useMutateAuth()
  const { getCsrfToken } = useCookie()

  useEffect(() => {
    getCsrfToken()
  }, [])

  const submitAuthHandler: SubmitHandler<Credential> = async (data) => {
    if (isLogin) {
      loginMutation.mutate({
        email: data.email,
        password: data.password,
      })
    } else {
      await registerMutation
        .mutateAsync({
          email: data.email,
          password: data.password,
        })
        .then(() =>
          loginMutation.mutate({
            email: data.email,
            password: data.password,
          })
        )
    }
  }
  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-gray-600 font-mono">
      <div className="flex items-center">
        <span className="text-center text-3xl font-extrabold">
          Todo app by React/Go(Echo)
        </span>
      </div>
      <h2 className="my-6">{isLogin ? 'Login' : 'Create a new account'}</h2>
      <form onSubmit={handleSubmit(submitAuthHandler)}>
        <div>
          <input
            {...register('email', { required: true })}
            className="mb-3 px-3 text-sm py-2 border border-gray-300"
            name="email"
            type="email"
            autoFocus
            placeholder="Email"
          />
        </div>
        <div>
          <input
            {...register('password', { required: true })}
            className="mb-3 px-3 text-sm py-2 border border-gray-300"
            name="password"
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="flex justify-center my-2">
          <button
            className="disabled:opacity-40 py-2 px-4 rounded text-white bg-indigo-600"
            type="submit"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </div>
      </form>
      <div
        onClick={() => setIsLogin(!isLogin)}
        className="h-6 w-6 my-2 text-blue-500 cursor-pointer"
      >
        change mode
      </div>
    </div>
  )
}
