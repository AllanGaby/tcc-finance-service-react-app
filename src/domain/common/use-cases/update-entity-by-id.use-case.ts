import { EntityModel } from '../../../domain/common'

export interface UpdateEntityByIdUseCase<UpdateEntityDTO, EntityType extends EntityModel> {
  updateById: (entityId: string, paramsDTO: UpdateEntityDTO) => Promise<EntityType>
}
