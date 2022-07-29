import { GetEntityByIdUseCase, EntityModel } from '../../../../domain/common'
import { HttpClientProtocol, HttpMethod, HttpStatusCode } from '../../../../protocols/http-client'
import { EntityNotFoundError, UnauthorizedError, UnexpectedError, UnprocessableEntityError } from '../../../../data/common/errors'

export class RemoteGetEntityByIdUseCase<EntityType extends EntityModel> implements GetEntityByIdUseCase<EntityType> {
  constructor (
    protected endPoint: string,
    private readonly httpClient: HttpClientProtocol,
    private readonly entityName: string
  ) {}

  async getById (entityId: string): Promise<EntityType> {
    const response = await this.httpClient.request<EntityType>({
      method: HttpMethod.get,
      url: `${this.endPoint}/${entityId}`,
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
