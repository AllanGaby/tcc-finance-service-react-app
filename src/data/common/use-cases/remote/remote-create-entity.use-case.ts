import { CreateEntityUseCase, EntityModel } from '../../../../domain/common'
import { HttpClientProtocol, HttpMethod, HttpStatusCode } from '../../../../protocols/http-client'
import { ConflictError, UnauthorizedError, UnexpectedError, UnprocessableEntityError } from '../../../../data/common/errors'

export class RemoteCreateEntityUseCase<CreateEntityDTO, EntityType extends EntityModel> implements CreateEntityUseCase<CreateEntityDTO, EntityType> {
  constructor (
    protected endPoint: string,
    private readonly httpClient: HttpClientProtocol,
    private readonly entityName: string
  ) {}

  async create (paramsDTO: CreateEntityDTO): Promise<EntityType> {
    const response = await this.httpClient.request<EntityType>({
      method: HttpMethod.post,
      url: this.endPoint,
      body: paramsDTO
    })
    switch (response.statusCode) {
      case HttpStatusCode.created:
        return response.body
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
