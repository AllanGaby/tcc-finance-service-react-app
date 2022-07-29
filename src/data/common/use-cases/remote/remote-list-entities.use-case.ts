import { ListEntitiesUseCase, EntityModel, ListEntityModel, ListEntitiesDTO, MapFilterToURLParamsUseCase, OrderDirection } from '../../../../domain/common'
import { HttpClientProtocol, HttpMethod, HttpStatusCode } from '../../../../protocols/http-client'
import { UnauthorizedError, UnexpectedError, UnprocessableEntityError, EntityNotFoundError } from '../../../../data/common/errors'

export class RemoteListEntitiesUseCase<EntityType extends EntityModel> implements ListEntitiesUseCase<EntityType> {
  constructor (
    protected endPoint: string,
    private readonly httpClient: HttpClientProtocol,
    private readonly mapFilterToURLParamsUseCase: MapFilterToURLParamsUseCase,
    private readonly entityName: string,
    private readonly orderDefault: string,
    private readonly directionDefault: OrderDirection
  ) {}

  async list (filter: ListEntitiesDTO): Promise<ListEntityModel<EntityType>> {
    filter.orderColumn = filter.orderColumn || this.orderDefault
    filter.orderDirection = filter.orderDirection || this.directionDefault
    const response = await this.httpClient.request<ListEntityModel<EntityType>>({
      method: HttpMethod.get,
      url: `${this.endPoint}${this.mapFilterToURLParamsUseCase.map(filter)}`,
      body: undefined
    })
    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body
      case HttpStatusCode.notFound:
        throw new EntityNotFoundError(this.entityName)
      case HttpStatusCode.unauthorized:
        throw new UnauthorizedError(response.body)
      case HttpStatusCode.unprocessableEntity:
        throw new UnprocessableEntityError(response.body)
      default:
        throw new UnexpectedError(response.body)
    }
  }
}
