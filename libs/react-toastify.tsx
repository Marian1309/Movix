import type { FC, ReactNode } from 'react'

import type { Id, ToastOptions } from 'react-toastify'
import { ToastContainer as Container, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const toastOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 1000,
  draggable: true,
  theme: 'dark',
  pauseOnFocusLoss: false
}

export const ToastError = (message: string) => {
  return toast.error(message, toastOptions)
}

export const ToastSuccess = (message: string) => {
  return toast.success(message, toastOptions)
}

export const ToastWarn = (message: string) => {
  return toast.warn(message, toastOptions)
}

export const ToastLoading = (message: string) => {
  return toast.loading(message, toastOptions)
}

export const ToastInfo = (message: string) => {
  return toast.info(message, toastOptions)
}

export const ToastDismiss = (toastId: Id) => {
  return toast.dismiss(toastId)
}

const ToastContainer: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      {children}
      <Container />
    </>
  )
}

export default ToastContainer
