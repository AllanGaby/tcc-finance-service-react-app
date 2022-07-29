import { EncryptMessageProtocol } from '@/protocols/rsa'
import { datatype } from 'faker'

export class EncryptMessageProtocolSpy implements EncryptMessageProtocol {
  payload: string = ''
  result: string | false = datatype.uuid()

  encrypt (message: string): string | false {
    this.payload = message
    return this.result
  }
}
