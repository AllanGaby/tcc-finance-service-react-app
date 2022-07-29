import { HttpStatusCode } from '@/protocols/http-client'

export type HttpResponse<BodyType = any> = {
  body: BodyType
  statusCode: HttpStatusCode
}
