import { EntityModel } from '../../../domain/common'

export interface CreateEntityUseCase<CreateEntityDTO, EntityType extends EntityModel> {
  create: (paramsDTO: CreateEntityDTO) => Promise<EntityType>
}
