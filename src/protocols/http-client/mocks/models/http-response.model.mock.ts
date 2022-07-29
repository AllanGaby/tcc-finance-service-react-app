import { HttpResponse, HttpStatusCode } from '../../../../protocols/http-client'
import { random } from 'faker'

export const mockHttpResponse = <BodyType = any>(
  statusCode: HttpStatusCode = HttpStatusCode.ok,
  body: BodyType = random.objectElement<BodyType>()): HttpResponse => ({
  body,
  statusCode
})
