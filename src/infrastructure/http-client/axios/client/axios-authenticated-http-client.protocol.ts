import { HttpAuthenticatedClientProtocol, HttpRequest, HttpResponse } from '../../../../protocols/http-client'
import { AccessSessionModel, RecoverValueInStorageUseCase } from '../../../../domain/common'
import axios, { AxiosResponse } from 'axios'

export class AxiosAuthenticatedHttpClientAdapter implements HttpAuthenticatedClientProtocol {
  constructor (
    private readonly accessTokenKey: string,
    private readonly accessTokenName: string,
    private readonly getAccessTokenUseCase: RecoverValueInStorageUseCase
  ) {}

  async axiosRequest <ResponseBodyType = any>(data: HttpRequest): Promise<HttpResponse<ResponseBodyType>> {
    const accessToken = await this.getAccessTokenUseCase.recoverValue<AccessSessionModel>(this.accessTokenKey) as AccessSessionModel
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: {
          [this.accessTokenName]: accessToken.access_token,
          ...data.headers
        }
      })
    } catch (error) {
      axiosResponse = error.response
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }

  async request <ResponseBodyType = any>(data: HttpRequest): Promise<HttpResponse<ResponseBodyType>> {
    return this.axiosRequest<ResponseBodyType>(data)
  }
}
