import { ToastMessage } from '../../../../common'

export type ToastContextModel = {
  show: (message: ToastMessage) => void
}
