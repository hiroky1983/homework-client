import type { FC, ReactNode } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { FiLogOut } from 'react-icons/fi'

type Props = {
  children: ReactNode
  type?: 'button' | 'submit' | 'reset'
  handleClick?: () => void
  isGoogleSvg?: boolean
  isLogout?: boolean
}

export const Button: FC<Props> = ({
  children,
  type = 'button',
  handleClick,
  isGoogleSvg = false,
  isLogout = false,
}) => {
  return (
    <div>
      <button
        className={`disabled:opacity-40 py-2 px-4 rounded text-white bg-indigo-600 hover:opacity-70 ${
          isGoogleSvg &&
          'flex gap-3 items-center py-2 px-6 rounded text-white bg-indigo-600 hover:opacity-70'
        } 
          ${
            isLogout &&
            'flex gap-3 items-center py-2 px-6 rounded text-white bg-indigo-600 hover:opacity-70'
          }
          `}
        type={type}
        onClick={handleClick}
      >
        {isGoogleSvg && <FcGoogle />}
        {children}
        {isLogout && <FiLogOut />}
      </button>
    </div>
  )
}
