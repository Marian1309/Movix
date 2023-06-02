import type { FC, ReactNode } from 'react'

import clsx from 'clsx'

interface ContextWrapperProps {
  children: ReactNode
  className?: string
}

const ContentWrapper: FC<ContextWrapperProps> = ({ children, className }) => {
  return (
    <div className={clsx('w-full max-w-[1200px] my-0 mx-auto py-0 px-[20px]', className)}>
      {children}
    </div>
  )
}

export default ContentWrapper
