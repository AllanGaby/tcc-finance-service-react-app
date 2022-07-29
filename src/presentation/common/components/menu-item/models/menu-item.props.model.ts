import { IconProps } from '@chakra-ui/icons'

export type MenuItemProps = {
  isActive?: boolean
  isDisabled?: boolean
  title?: string
  icon?: IconProps
  path?: string
  onClick?: () => Promise<void>
  onHandleMenuItem?: () => JSX.Element
  items?: MenuItemProps[]
}
