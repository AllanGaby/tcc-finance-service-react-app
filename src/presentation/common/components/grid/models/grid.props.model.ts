import { GridColumn } from '../../../../common'

export type GridProps = {
  search?: boolean
  title?: string
  listURL?: string
  entities?: Object[]
  columns: GridColumn[]
  onHandleCustomHeaders?: () => JSX.Element
}
