'use client'
import { useState, type FC, useEffect } from 'react'
import { FaCircleCheck } from 'react-icons/fa6'

type Props = {
  status: 'success' | 'error' | 'warning'
  message: string | null
  show: boolean
  onClose: () => void
}

export const Toast: FC<Props> = ({ status, message, show, onClose }) => {
  const [shouldRender, setShouldRender] = useState(show)

  useEffect(() => {
    if (show) setShouldRender(true)
  }, [show])

  useEffect(() => {
    let timerId: NodeJS.Timeout
    if (show && shouldRender) {
      timerId = setTimeout(() => {
        onClose() // 3秒後に onClose を呼び出す
        setTimeout(() => setShouldRender(false), 500) // アニメーション完了後に非表示
      }, 3000)
    }
    return () => clearTimeout(timerId)
  }, [show, shouldRender, onClose])
  const success = 'text-green-500'
  const error = 'text-red-500'
  const warning = 'text-yellow-500'

  const statusColor = () => {
    if (status === 'success') return success
    if (status === 'error') return error
    if (status === 'warning') return warning
  }
  return show ? (
    <div
      className={`flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 ${
        show ? 'animate-fadeIn' : 'animate-fadeOut'
      }`}
    >
      <FaCircleCheck className={statusColor()} />
      <div className="ms-3 text-sm font-normal">{message}</div>
      <button
        type="button"
        className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  ) : null
}
