import { VersionedEntityModel, mockEntityModel } from '../../../../domain/common'
import { datatype, date } from 'faker'

export const mockVersionedEntityModel = (id: string = datatype.uuid()): VersionedEntityModel => ({
  ...mockEntityModel(id),
  deleted_at: date.past(),
  version: datatype.number(),
  current_version_id: datatype.uuid(),
  last_version_id: datatype.uuid()
})
