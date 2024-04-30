'use client'
import { useEffect } from 'react'
import { AuthScreen } from '@/screens/AuthScreen'

export type Window = typeof globalThis & {
  dataLayer: any
}

declare let window: Window

export default function Home() {
  useEffect(() => {
    window.dataLayer.push({ user_id: 'asdfasdfasdfasdf1234213412341234' })
  }, [])
  return (
    <>
      <AuthScreen />
    </>
  )
}
