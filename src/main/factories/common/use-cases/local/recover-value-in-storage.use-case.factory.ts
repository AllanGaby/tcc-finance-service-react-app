import { RecoverValueInStorageUseCase } from '../../../../../domain/common'
import { LocalRecoverValueInStorageUseCase } from '../../../../../data/common/use-cases'
import { LocalStorageFactory } from '../../../../../infrastructure/local-storage'
import { RecoverValueInStorageProtocol } from '../../../../../protocols/local-storage'

export const makeRecoverValueInStorageUseCase = (): RecoverValueInStorageUseCase =>
  new LocalRecoverValueInStorageUseCase(
    LocalStorageFactory.GetLocalStorageAdaper<RecoverValueInStorageProtocol>()
  )
