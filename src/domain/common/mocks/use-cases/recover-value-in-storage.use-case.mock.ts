import { RecoverValueInStorageUseCase } from '../../../../domain/common'

export class RecoverValueInStorageUseCaseSpy implements RecoverValueInStorageUseCase {
  key: string
  value: any

  async recoverValue <ValueType>(key: string): Promise<ValueType> {
    this.key = key
    return this.value
  }
}
