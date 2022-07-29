import { MapFilterToURLParamsUseCase } from '@/domain/common'
import { HttpClientProtocol } from '@/protocols/http-client'

export type ServiceProviderModel = {
  httpClient: HttpClientProtocol
  mapFilterToURLParamsUseCase: MapFilterToURLParamsUseCase
  baseUrl: string
}
