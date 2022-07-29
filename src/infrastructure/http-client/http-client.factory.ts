import { AxiosHttpClientAdapter, AxiosAuthenticatedHttpClientAdapter } from './axios'
import { RecoverValueInStorageUseCase } from '../../domain/common'
import { HttpClientProtocol, HttpAuthenticatedClientProtocol } from '../../protocols/http-client'

type AxiosAuthenticatedHttpClientAdapterProps = {
  accessTokenKey: string
  accessTokenName: string
  getAccessTokenUseCase: RecoverValueInStorageUseCase
}

export class HttpClientFactory {
  public static GetHttpClient (): HttpClientProtocol {
    return new AxiosHttpClientAdapter()
  }

  public static GetHttpAuthenticatedClient ({
    accessTokenKey,
    accessTokenName,
    getAccessTokenUseCase
  }: AxiosAuthenticatedHttpClientAdapterProps): HttpAuthenticatedClientProtocol {
    return new AxiosAuthenticatedHttpClientAdapter(
      accessTokenKey,
      accessTokenName,
      getAccessTokenUseCase
    )
  }
}
