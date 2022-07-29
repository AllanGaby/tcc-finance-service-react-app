import { EntityModel, ListEntityModel, ListEntitiesDTO } from '@/domain/common'

export interface ListEntitiesUseCase<EntityType extends EntityModel> {
  list: (filter: ListEntitiesDTO) => Promise<ListEntityModel<EntityType>>
}
