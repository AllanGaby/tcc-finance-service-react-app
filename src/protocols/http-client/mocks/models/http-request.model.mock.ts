import { HttpRequest, mockHttpMethod } from '../../../../protocols/http-client'
import { internet, random } from 'faker'

export const mockHttpRequest = (): HttpRequest => ({
  url: internet.url(),
  method: mockHttpMethod(),
  body: random.objectElement(),
  headers: random.objectElement()
})
