import { HttpClientProtocol, HttpRequest, HttpResponse, mockHttpResponse } from '../../../../protocols/http-client'

export class HttpClientProtocolSpy implements HttpClientProtocol {
  httpRequest: HttpRequest<any>
  httpResponse: HttpResponse<any> = mockHttpResponse()

  async request (data: HttpRequest<any>): Promise<HttpResponse<any>> {
    this.httpRequest = data
    return this.httpResponse
  }
}
