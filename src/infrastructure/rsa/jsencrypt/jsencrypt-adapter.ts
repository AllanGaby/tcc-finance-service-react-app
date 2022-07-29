import { EncryptMessageProtocol } from '../../../protocols/rsa'
import JSEncrypt from 'jsencrypt'

export class JSEncryptAdapter implements EncryptMessageProtocol {
  constructor (
    private readonly publicKey: string
  ) {}

  encrypt (payload: string): string | false {
    const sign = new JSEncrypt({})
    sign.setPublicKey(this.publicKey)
    const token = sign.encrypt(payload)
    return token
  }
}
