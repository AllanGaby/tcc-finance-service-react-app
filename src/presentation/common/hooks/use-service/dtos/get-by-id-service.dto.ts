import { CommonServiceDTO } from '../../../../common'

export type GetByIdServiceDTO = CommonServiceDTO & {
  entityId: string
}
