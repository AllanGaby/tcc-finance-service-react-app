import { ToastType, ToastPosition } from '../../../../common'

export type ToastMessage = {
  title?: string
  message: string
  type?: ToastType
  position?: ToastPosition
}
