import { SetValueInStorageUseCase, RecoverValueInStorageUseCase } from '@/domain/common'

export type LocalStorageProviderModel = {
  setValueInStorageUseCase: SetValueInStorageUseCase
  recoverValueInStorageUseCase: RecoverValueInStorageUseCase
}
