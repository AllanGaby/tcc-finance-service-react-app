import { ToastContextModel, ToastMessage } from '../../../'

export const mockToastContextModel = (): ToastContextModel => ({
  show: (message: ToastMessage) => { return undefined }
})
