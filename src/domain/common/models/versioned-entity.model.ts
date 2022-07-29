import { EntityModel } from '../../../domain/common'

export type VersionedEntityModel = EntityModel & {
  current_version_id?: string
  last_version_id?: string
  version: number
  deleted_at?: Date
}
