'use client'
import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react'
import { Toast } from '@/components/toast/toast'

interface ToastContextType {
  showToast: (message: string, status: 'success' | 'error' | 'warning') => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const useToast = () => {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toastProps, setToastProps] = useState<{
    message: string
    status: 'success' | 'error' | 'warning'
    show: boolean
  } | null>(null)

  const showToast = useCallback(
    (message: string, status: 'success' | 'error' | 'warning') => {
      setToastProps({ message, status, show: true })
      setTimeout(() => setToastProps(null), 3500) // Toastを表示後、自動的に非表示にする
    },
    []
  )

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toastProps && (
        <Toast
          message={toastProps.message}
          status={toastProps.status}
          show={toastProps.show}
          onClose={() => setToastProps(null)}
        />
      )}
    </ToastContext.Provider>
  )
}
