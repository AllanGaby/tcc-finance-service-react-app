import { ListEntitiesDTO } from '@/domain/common'
import { CommonServiceDTO } from '../../../../common'

export type ListServiceDTO = CommonServiceDTO & {
  filter: ListEntitiesDTO
}
