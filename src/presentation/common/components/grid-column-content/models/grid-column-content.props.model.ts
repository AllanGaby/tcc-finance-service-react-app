export type GridColumnContentProps = {
  name: string
  label: string
  entity: Object
  rowId?: number
  width?: number
  backgroundColor?: string
  date?: boolean
  currency?: boolean
  onHandleColumnContent?: (entity: Object, rowIndex: number) => JSX.Element
}
