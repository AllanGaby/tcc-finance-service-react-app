import { OrderDirection } from '@/domain/common'

export type GridColumnHeaderProps = {
  name: string
  order?: string
  label?: string
  width?: number
  backgroundColor?: string
  onHandleColumnHeader?: () => JSX.Element
  disableOrder?: boolean
  direction?: OrderDirection
}
