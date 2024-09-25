import { toast, ToastOptions } from "react-toastify"

interface ToastProps {
  text: string
  type: "info" | "success" | "warning" | "error"
  options?: ToastOptions
}

export const Toast = ({ type, text, options }: ToastProps) => {
  return toast[type](text, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    ...options
  })
}