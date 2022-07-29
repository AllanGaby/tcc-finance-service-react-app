import { RecoverAccessSessionUseCase } from '../../../../../domain/common'
import { RemoteRecoverAccessSessionUseCase } from '../../../../../data/common/use-cases'
import { HttpClientFactory } from '../../../../../infrastructure/http-client'
import { makeRecoverValueInStorageUseCase } from '../../../../../main/factories/common/use-cases'

export type RecoverAccessSessionUseCaseProps = {
  accessTokenKey: string
  accessTokenName: string
  accessSessionURL: string
}

export const makeRecoverAccessSessionUseCase = ({
  accessTokenKey,
  accessTokenName,
  accessSessionURL
}: RecoverAccessSessionUseCaseProps): RecoverAccessSessionUseCase =>
  new RemoteRecoverAccessSessionUseCase(
    accessSessionURL,
    HttpClientFactory.GetHttpAuthenticatedClient({
      accessTokenKey,
      accessTokenName,
      getAccessTokenUseCase: makeRecoverValueInStorageUseCase()
    }),
    'AccessSession'
  )
