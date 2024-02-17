import type { FC, ReactNode } from 'react'
import { IoIosClose } from 'react-icons/io'
import { Button } from '../Button'

type Props = {
  onOpen: () => void
  hadleClick: () => void
  children: ReactNode
}

export const Modal: FC<Props> = ({ onOpen, hadleClick, children }) => {
  return (
    <div className="bg-gray-500 bg-opacity-50 fixed inset-0 flex justify-center items-center">
      <div className="bg-white w-1/2 h-1/3 fixed flex justify-center items-center rounded-md">
        <div
          className="absolute top-4 right-4 hover:opacity-70 cursor-pointer text-2xl"
          onClick={onOpen}
        >
          <IoIosClose />
        </div>
        <div>
          {children}
          <Button handleClick={hadleClick}>削除</Button>
        </div>
      </div>
    </div>
  )
}
