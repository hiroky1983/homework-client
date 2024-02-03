'use client'
import React, { useEffect } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'

import { Button } from '@/components/Button'
import { useMutateAuth } from '@/hooks/useMutateAuth'
import { useCookie } from '@/hooks/useSetCookie'
import { isLoginState } from '@/store/state'
import type { Credential } from '@/types'

export const AuthScreen = () => {
  const { register, handleSubmit } = useForm<Credential>()
  const [isLogin, setIsLogin] = useRecoilState(isLoginState)
  const { loginMutation, registerMutation, googleLoginMutation } =
    useMutateAuth()
  const { getCsrfToken } = useCookie()

  useEffect(() => {
    getCsrfToken()
  }, [getCsrfToken])

  const onClickGoogleLogin = async () => {
    await googleLoginMutation.mutateAsync()
  }

  const submitAuthHandler: SubmitHandler<Credential> = async (data) => {
    if (isLogin) {
      loginMutation.mutate({
        email: data.email,
        password: data.password,
      })
    } else {
      await registerMutation.mutateAsync({
        email: data.email,
        password: data.password,
      })
    }
  }
  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-gray-600 font-mono">
      <div className="flex items-center">
        <span className="text-center text-3xl font-extrabold">
          Homework app
        </span>
      </div>
      <h2 className="my-6">{isLogin ? 'Login' : 'Create a new account'}</h2>
      <form
        className="flex flex-col gap-3"
        onSubmit={handleSubmit(submitAuthHandler)}
      >
        <div>
          <input
            {...register('email', { required: true })}
            className="input"
            name="email"
            type="email"
            autoFocus
            placeholder="Email"
          />
        </div>
        <div>
          <input
            {...register('password', { required: true })}
            className="input"
            name="password"
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="flex justify-center my-2">
          <Button type="submit">{isLogin ? 'Login' : 'Sign Up'}</Button>
        </div>
      </form>
      <div
        onClick={() => setIsLogin(!isLogin)}
        className="my-2 text-blue-500 cursor-pointer p-2 hover:opacity-70"
      >
        change mode
      </div>
      <Button handleClick={onClickGoogleLogin} isGoogleSvg>
        Google Login
      </Button>
    </div>
  )
}
