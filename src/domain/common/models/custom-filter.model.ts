import { CustomFilterOperator, CustomFilterConditional } from '../../../domain/common'

export type CustomFilterModel = {
  field: string
  value?: string | number | string[] | number[] | boolean
  conditional: CustomFilterConditional
  operator?: CustomFilterOperator
}
