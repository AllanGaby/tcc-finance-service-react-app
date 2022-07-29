import { HttpRequest, HttpResponse } from '@/protocols/http-client'

export interface HttpAuthenticatedClientProtocol {
  request: <ResponseBodyType = any>(data: HttpRequest) => Promise<HttpResponse<ResponseBodyType>>
}
