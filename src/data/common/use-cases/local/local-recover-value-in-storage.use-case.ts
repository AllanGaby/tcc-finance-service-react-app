import { RecoverValueInStorageUseCase } from '../../../../domain/common'
import { RecoverValueInStorageProtocol } from '../../../../protocols/local-storage'

export class LocalRecoverValueInStorageUseCase implements RecoverValueInStorageUseCase {
  constructor (
    private readonly recoverValueInStorageAdapter: RecoverValueInStorageProtocol
  ) {}

  async recoverValue <ValueType>(key: string): Promise<ValueType | string> {
    return this.recoverValueInStorageAdapter.recoverValue(key)
  }
}
