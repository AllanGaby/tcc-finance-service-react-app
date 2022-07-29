import { RecoverAccessSessionUseCase, AccessSessionModel } from '../../../../domain/common'
import { HttpMethod, HttpStatusCode, HttpAuthenticatedClientProtocol } from '../../../../protocols/http-client'
import { EntityNotFoundError, UnauthorizedError, UnexpectedError, UnprocessableEntityError } from '../../../../data/common/errors'

export class RemoteRecoverAccessSessionUseCase implements RecoverAccessSessionUseCase {
  constructor (
    protected endPoint: string,
    private readonly httpClientAuthenticated: HttpAuthenticatedClientProtocol,
    private readonly entityName: string
  ) {}

  async recoverAccessSession (): Promise<AccessSessionModel> {
    const response = await this.httpClientAuthenticated.request<AccessSessionModel>({
      method: HttpMethod.get,
      url: this.endPoint,
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
