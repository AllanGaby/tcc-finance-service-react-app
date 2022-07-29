import { DeleteAccessSessionUseCase } from '../../../../../domain/common'
import { RemoteDeleteAccessSessionUseCase } from '../../../../../data/common/use-cases'
import { HttpClientFactory } from '../../../../../infrastructure/http-client'
import { makeRecoverValueInStorageUseCase } from '../../../../../main/factories/common/use-cases'

export type DeleteAccessSessionUseCaseProps = {
  accessTokenKey: string
  accessTokenName: string
  accessSessionURL: string
}

export const makeDeleteAccessSessionUseCase = ({
  accessSessionURL,
  accessTokenKey,
  accessTokenName
}: DeleteAccessSessionUseCaseProps): DeleteAccessSessionUseCase =>
  new RemoteDeleteAccessSessionUseCase(
    accessSessionURL,
    HttpClientFactory.GetHttpAuthenticatedClient({
      accessTokenKey,
      accessTokenName,
      getAccessTokenUseCase: makeRecoverValueInStorageUseCase()
    }),
    'AccessSession'
  )
