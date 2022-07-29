import { EntityModel, CreateEntityUseCase } from '../../../../domain/common'

export class CreateEntityUseCaseSpy<CreateEntityDTO, EntityType extends EntityModel>
implements CreateEntityUseCase<CreateEntityDTO, EntityType> {
  paramsDTO: CreateEntityDTO
  entity: EntityType

  async create (paramsDTO: CreateEntityDTO): Promise<EntityType> {
    this.paramsDTO = paramsDTO
    return this.entity
  }
}
