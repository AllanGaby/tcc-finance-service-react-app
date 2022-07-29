import { HttpRequest, HttpResponse } from '@/protocols/http-client'

export interface HttpClientProtocol {
  request: <ResponseBodyType = any>(data: HttpRequest) => Promise<HttpResponse<ResponseBodyType>>
}
