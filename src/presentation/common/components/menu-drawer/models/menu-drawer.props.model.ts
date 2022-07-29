import { MenuItemProps, MenuDrawerPlacement } from '../../../../common'

export type MenuDrawerProps = {
  isOpen: boolean
  onClose: () => void
  title?: string
  route?: string
  onHandleTitle?: () => JSX.Element
  onClick?: () => Promise<void>
  items?: MenuItemProps[]
  placement?: MenuDrawerPlacement
  onHandleFooter?: () => JSX.Element
}
