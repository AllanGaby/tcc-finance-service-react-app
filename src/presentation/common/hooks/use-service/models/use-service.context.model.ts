import { ListEntityModel } from '@/domain/common'
import {
  CreateServiceDTO,
  DeleteByIdServiceDTO,
  GetByIdServiceDTO,
  ListServiceDTO,
  UpdateByIdServiceDTO,
  DownloadServiceDTO
} from '../../../../common'

export type ServiceContextModel = {
  create: <EntityType extends Object, DTOType>(params: CreateServiceDTO<DTOType>) => Promise<EntityType>
  updateById: <EntityType extends Object, DTOType>(params: UpdateByIdServiceDTO<DTOType>) => Promise<EntityType>
  deleteById: <DTOType extends Object>(params: DeleteByIdServiceDTO<DTOType>) => Promise<void>
  getById: <EntityType extends Object>(params: GetByIdServiceDTO) => Promise<EntityType>
  list: <EntityType extends Object>(params: ListServiceDTO) => Promise<ListEntityModel<EntityType>>
  download: (params: DownloadServiceDTO) => Promise<void>
}
