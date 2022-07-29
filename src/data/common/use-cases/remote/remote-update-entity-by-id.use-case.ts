import { UpdateEntityByIdUseCase, EntityModel } from '../../../../domain/common'
import { HttpClientProtocol, HttpMethod, HttpStatusCode } from '../../../../protocols/http-client'
import { UnauthorizedError, UnexpectedError, UnprocessableEntityError, EntityNotFoundError, ConflictError } from '../../../../data/common/errors'

export class RemoteUpdateEntityByIdUseCase<UpdateEntityDTO, EntityType extends EntityModel> implements UpdateEntityByIdUseCase<UpdateEntityDTO, EntityType> {
  constructor (
    protected endPoint: string,
    private readonly httpClient: HttpClientProtocol,
    private readonly entityName: string,
    private readonly httpMethod: HttpMethod = HttpMethod.put
  ) {}

  async updateById (entityId: string, paramsDTO: UpdateEntityDTO): Promise<EntityType> {
    const response = await this.httpClient.request<EntityType>({
      method: this.httpMethod,
      url: `${this.endPoint}/${entityId}`,
      body: paramsDTO
    })
    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body
      case HttpStatusCode.unauthorized:
        throw new UnauthorizedError(response.body)
      case HttpStatusCode.notFound:
        throw new EntityNotFoundError(this.entityName)
      case HttpStatusCode.conflict:
        throw new ConflictError(this.entityName)
      case HttpStatusCode.unprocessableEntity:
        throw new UnprocessableEntityError(response.body)
      default:
        throw new UnexpectedError(response.body)
    }
  }
}
