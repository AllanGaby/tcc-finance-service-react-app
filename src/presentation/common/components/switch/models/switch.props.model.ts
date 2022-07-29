import { Size } from '../../../../common'

export type SwitchProps = {
  name: string
  label: string
  size?: Size
  toolTip?: string
  helpText?: string
  errorMessage?: string
  isDisabled?: boolean
  value?: string
  checkedValue?: string
  uncheckedValue?: string
}
