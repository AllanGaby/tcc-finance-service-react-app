import { CreateAccessSessionUseCase } from '../../../../../domain/common'
import { RemoteCreateAccessSessionUseCase } from '../../../../../data/common/use-cases'
import { EncryptMessageProtocol } from '../../../../../protocols/rsa'
import { RSAFactory } from '../../../../../infrastructure/rsa'
import { HttpClientFactory } from '../../../../../infrastructure/http-client'

export type CreateAccessSessionUseCaseProps = {
  publicKey: string
  accessSessionURL: string
}

export const makeCreateAccessSessionUseCase = ({
  publicKey,
  accessSessionURL
}: CreateAccessSessionUseCaseProps): CreateAccessSessionUseCase =>
  new RemoteCreateAccessSessionUseCase(
    RSAFactory.GetRSAAdaper<EncryptMessageProtocol>(publicKey),
    accessSessionURL,
    HttpClientFactory.GetHttpClient()
  )
