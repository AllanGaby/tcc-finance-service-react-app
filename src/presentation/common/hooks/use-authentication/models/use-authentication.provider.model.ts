import {
  CreateAccessSessionUseCase,
  DeleteAccessSessionUseCase,
  RecoverAccessSessionUseCase
} from '@/domain/common'

export type AuthenticationProviderModel = {
  accessTokenKey: string
  createAccessSessionUseCase: CreateAccessSessionUseCase
  deleteAccessSessionUseCase: DeleteAccessSessionUseCase
  recoverAccessSessionUseCase: RecoverAccessSessionUseCase
}
