import type { Metadata } from 'next'
import './globals.css'

import { Header } from '@/components/Header'
import { AppProvider } from '@/provider/queryProvider'
import { ToastProvider } from '@/provider/toastProvider'

export const metadata: Metadata = {
  title: 'Homework App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <AppProvider>
          <ToastProvider>
            <div className="wrapper">
              <Header />
              <main>{children}</main>
            </div>
          </ToastProvider>
        </AppProvider>
      </body>
    </html>
  )
}
