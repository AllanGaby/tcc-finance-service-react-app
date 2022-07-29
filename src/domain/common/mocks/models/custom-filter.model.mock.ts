import { CustomFilterModel, mockCustomFilterOperator, mockCustomFilterConditional } from '../../../../domain/common'
import { database, datatype } from 'faker'

export const mockCustomFilterModel = (): CustomFilterModel => ({
  field: database.column(),
  value: datatype.string(),
  conditional: mockCustomFilterConditional(),
  operator: mockCustomFilterOperator()
})
