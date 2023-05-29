import type { FC, ReactNode } from 'react'

const ContextWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className='w-full max-w-[1200px] my-0 mx-auto py-0 px-[20px]'>{children}</div>
  )
}

export default ContextWrapper
