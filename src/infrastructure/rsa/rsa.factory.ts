import { JSEncryptAdapter } from './jsencrypt'
import { EncryptMessageProtocol } from '../../protocols/rsa'

export type RSAProtocols =
EncryptMessageProtocol

export class RSAFactory {
  public static GetRSAAdaper<AdapterType extends RSAProtocols = EncryptMessageProtocol>(publicKey: string): AdapterType {
    return new JSEncryptAdapter(publicKey) as unknown as AdapterType
  }
}
