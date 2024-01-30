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
        className={`button-primary ${isGoogleSvg && 'button-p-with-icon'} 
          ${isLogout && 'button-s-with-icon'}
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
