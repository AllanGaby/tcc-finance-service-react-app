import { HttpMethod } from '@/protocols/http-client'
import { CommonServiceDTO } from '../../../../common'

export type UpdateByIdServiceDTO<DTOType> = CommonServiceDTO & {
  data: DTOType
  method?: HttpMethod
  entityId: string
}
