import { SetValueInStorageUseCase } from '../../../../../domain/common'
import { LocalSetValueInStorageUseCase } from '../../../../../data/common/use-cases'
import { LocalStorageFactory } from '../../../../../infrastructure/local-storage'
import { SetValueInStorageProtocol } from '../../../../../protocols/local-storage'

export const makeSetValueInStorageUseCase = (): SetValueInStorageUseCase =>
  new LocalSetValueInStorageUseCase(
    LocalStorageFactory.GetLocalStorageAdaper<SetValueInStorageProtocol>()
  )
