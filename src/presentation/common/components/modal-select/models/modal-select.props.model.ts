import { GridColumn } from '../../../../common'

export type ModalSelectProps = {
  search?: boolean
  title: string
  columns: GridColumn[]
  isOpen: boolean
  listURL?: string
  entities?: Object[]
  onClose?: () => void
  onSelect: (entity: Object) => void
}
