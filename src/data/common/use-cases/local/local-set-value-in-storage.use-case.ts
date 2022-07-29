import { SetValueInStorageUseCase } from '../../../../domain/common'
import { SetValueInStorageProtocol } from '../../../../protocols/local-storage'

export class LocalSetValueInStorageUseCase implements SetValueInStorageUseCase {
  constructor (
    private readonly setValueInStorageAdapter: SetValueInStorageProtocol
  ) {}

  async setValue <ValueType>(key: string, value: ValueType): Promise<ValueType> {
    return this.setValueInStorageAdapter.setValue<ValueType>(key, value)
  }
}
