import { IconProps } from '@chakra-ui/react'
import { ButtonType, Size } from '../../../../common'

export type ButtonProps = {
  label?: string
  loadingLabel?: string
  toolTip?: string
  type?: ButtonType
  size?: Size
  leftIcon?: IconProps
  rightIcon?: IconProps
  onClick?: () => Promise<void>
}
