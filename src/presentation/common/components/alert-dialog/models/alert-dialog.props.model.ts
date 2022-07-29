import { ButtonProps } from '../../../../common'

export type AlertDialogProps = {
  title?: string
  onClose?: () => void
  message: string
  confirmButton?: ButtonProps
  cancelButton?: ButtonProps
}
