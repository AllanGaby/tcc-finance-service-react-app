import { EntityModel, UpdateEntityByIdUseCase } from '../../../../domain/common'

export class UpdateEntityByIdUseCaseSpy<UpdateEntityDTO, EntityType extends EntityModel>
implements UpdateEntityByIdUseCase<UpdateEntityDTO, EntityType> {
  entityId: string
  paramsDTO: UpdateEntityDTO
  entity: EntityType

  async updateById (entityId: string, paramsDTO: UpdateEntityDTO): Promise<EntityType> {
    this.entityId = entityId
    this.paramsDTO = paramsDTO
    return this.entity
  }
}
