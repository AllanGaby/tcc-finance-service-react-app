import { CommonServiceDTO } from '../../../../common'

export type CreateServiceDTO<DTOType> = CommonServiceDTO & {
  data: DTOType
}
