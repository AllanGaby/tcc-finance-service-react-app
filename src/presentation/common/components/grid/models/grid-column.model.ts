import { GridColumnContentProps, GridColumnHeaderProps } from '../../../../common'

export type GridColumn = Omit<Omit<GridColumnContentProps, 'entity'>, 'rowId'> & GridColumnHeaderProps
