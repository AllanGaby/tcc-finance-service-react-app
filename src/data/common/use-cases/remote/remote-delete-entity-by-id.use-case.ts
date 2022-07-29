import { DeleteEntityByIdUseCase, EntityModel } from '../../../../domain/common'
import { HttpClientProtocol, HttpMethod, HttpStatusCode } from '../../../../protocols/http-client'
import { ConflictError, UnauthorizedError, UnexpectedError, UnprocessableEntityError } from '../../../../data/common/errors'

export class RemoteDeleteEntityByIdUseCase<EntityType extends EntityModel, DeleteEntityDTO> implements DeleteEntityByIdUseCase<EntityType, DeleteEntityDTO> {
  constructor (
    protected endPoint: string,
    private readonly httpClient: HttpClientProtocol,
    private readonly entityName: string
  ) {}

  async deleteById (entityId: string, paramsDTO?: DeleteEntityDTO): Promise<EntityType| undefined> {
    const response = await this.httpClient.request<EntityType>({
      method: HttpMethod.delete,
      url: `${this.endPoint}/${entityId}`,
      body: paramsDTO
    })
    switch (response.statusCode) {
      case HttpStatusCode.noContent:
        return undefined
      case HttpStatusCode.conflict:
        throw new ConflictError(this.entityName)
      case HttpStatusCode.unauthorized:
        throw new UnauthorizedError(response.body)
      case HttpStatusCode.unprocessableEntity:
        throw new UnprocessableEntityError(response.body)
      default:
        throw new UnexpectedError(response.body)
    }
  }
}
