import { CommonServiceDTO } from '../../../../common'

export type DeleteByIdServiceDTO<DTOType = undefined> = CommonServiceDTO & {
  entityId: string
  data?: DTOType
}
