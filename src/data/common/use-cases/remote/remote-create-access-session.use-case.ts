import { AccessSessionModel, CreateAccessSessionDTO, CreateAccessSessionUseCase } from '@/domain/common'
import { EncryptMessageProtocol } from '../../../../protocols/rsa'
import { HttpClientProtocol, HttpMethod, HttpStatusCode } from '../../../../protocols/http-client'
import { UnauthorizedError, UnexpectedError, UnprocessableEntityError } from '../../../../data/common/errors'

export class RemoteCreateAccessSessionUseCase implements CreateAccessSessionUseCase {
  constructor (
    private readonly encryptMessage: EncryptMessageProtocol,
    private readonly endPoint: string,
    private readonly httpClient: HttpClientProtocol
  ) { }

  async createAccessSession (params: CreateAccessSessionDTO): Promise<AccessSessionModel> {
    console.log(params)
    const token = this.encryptMessage.encrypt(JSON.stringify(params))
    console.log(token)
    const response = await this.httpClient.request<AccessSessionModel>({
      method: HttpMethod.post,
      url: this.endPoint,
      body: {
        token
      }
    })
    console.log(response.statusCode)
    switch (response.statusCode) {
      case HttpStatusCode.created:
        return response.body
      case HttpStatusCode.unprocessableEntity:
        throw new UnprocessableEntityError(response.body)
      case HttpStatusCode.serverError:
        throw new UnexpectedError(response.body)
      case HttpStatusCode.unauthorized:
        throw new UnauthorizedError(response.body)
    }
  }
}
