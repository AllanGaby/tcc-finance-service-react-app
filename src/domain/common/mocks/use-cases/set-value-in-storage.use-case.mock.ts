import { SetValueInStorageUseCase } from '../../../../domain/common'

export class SetValueInStorageUseCaseSpy implements SetValueInStorageUseCase {
  key: string
  value: any
  result: any

  async setValue<ValueType> (key: string, value: ValueType): Promise<ValueType> {
    this.key = key
    this.value = value
    return this.result
  }
}
