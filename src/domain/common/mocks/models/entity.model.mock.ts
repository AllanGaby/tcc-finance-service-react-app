import { EntityModel } from '../../../../domain/common'
import { datatype, date } from 'faker'

export const mockEntityModel = (id: string = datatype.uuid()): EntityModel => ({
  id,
  created_at: date.past(),
  updated_at: date.past()
})
