import { EntityModel, DeleteEntityByIdUseCase } from '../../../../domain/common'

export class DeleteEntityByIdUseCaseSpy<EntityType extends EntityModel, DeleteEntityDTO = undefined>
implements DeleteEntityByIdUseCase<EntityType, DeleteEntityDTO> {
  entityId: string

  async deleteById (entityId: string): Promise<EntityType | undefined> {
    this.entityId = entityId
    return undefined
  }
}
