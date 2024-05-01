'use client'
import { useEffect, useState } from 'react'
import { Button } from '@/components/Button'
import { AuthScreen } from '@/screens/AuthScreen'

export type Window = typeof globalThis & {
  dataLayer: any
}

declare let window: Window

export default function Home() {
  const [userId, setUserId] = useState('')
  const [customerId, setCustomerId] = useState('')

  const rand1 = () => {
    return String(Math.floor(Math.random() * 1000000))
  }

  const rand2 = () => {
    return String(Math.floor(Math.random() * 1000000))
  }

  useEffect(() => {
    window.dataLayer.push({
      user_id: userId,
      customer_id: customerId,
    })

    console.log('userId', userId)
    console.log('customerId', customerId)
    console.log('dataLayer', window.dataLayer)
  }, [customerId, userId])
  return (
    <>
      <AuthScreen />
      <Button
        handleClick={() => {
          setUserId(rand1())
          setCustomerId(rand2())
          window.dataLayer.push({
            event: 'page_view',
          })
        }}
      >
        ろぐいん
      </Button>
    </>
  )
}
