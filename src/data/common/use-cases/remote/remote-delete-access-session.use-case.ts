import { DeleteAccessSessionUseCase } from '../../../../domain/common'
import { HttpMethod, HttpStatusCode, HttpAuthenticatedClientProtocol } from '../../../../protocols/http-client'
import { ConflictError, UnauthorizedError, UnexpectedError, UnprocessableEntityError } from '../../../../data/common/errors'

export class RemoteDeleteAccessSessionUseCase implements DeleteAccessSessionUseCase {
  constructor (
    protected endPoint: string,
    private readonly httpClient: HttpAuthenticatedClientProtocol,
    private readonly entityName: string
  ) {}

  async deleteAccessSession (): Promise<void> {
    const response = await this.httpClient.request({
      method: HttpMethod.delete,
      url: this.endPoint,
      body: undefined
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
