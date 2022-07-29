import { EntityModel } from '../../../domain/common'

export interface DeleteEntityByIdUseCase<EntityType extends EntityModel, DeleteEntityDTO> {
  deleteById: (entityId: string, paramsDTO?: DeleteEntityDTO) => Promise<EntityType | undefined>
}
