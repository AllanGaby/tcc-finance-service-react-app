import { EncryptMessageProtocol } from '../../../protocols/rsa'
import JSEncrypt from 'jsencrypt'

export class JSEncryptAdapter implements EncryptMessageProtocol {
  constructor (
    private readonly publicKey: string
  ) {}

  encrypt (payload: string): string | false {
    const sign = new JSEncrypt({})
    console.log(this.publicKey)
    sign.setPublicKey(this.publicKey)
    const token = sign.encrypt(payload)
    console.log('Encrypted Token', token)
    return token
  }
}
