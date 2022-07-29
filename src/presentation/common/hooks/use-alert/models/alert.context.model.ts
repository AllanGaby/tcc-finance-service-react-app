import { AlertMessage } from '../../../../common'

export type AlertContextModel = {
  show: (message: AlertMessage) => void
}
