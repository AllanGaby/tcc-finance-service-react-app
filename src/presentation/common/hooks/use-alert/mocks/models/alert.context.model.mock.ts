import { AlertContextModel, AlertMessage } from '../../../'

export const mockAlertContextModel = (): AlertContextModel => ({
  show: (message: AlertMessage) => { return undefined }
})
