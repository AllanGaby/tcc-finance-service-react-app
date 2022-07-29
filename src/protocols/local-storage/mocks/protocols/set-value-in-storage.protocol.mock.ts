import { SetValueInStorageProtocol } from '@/protocols/local-storage'

export class SetValueInStorageSpy implements SetValueInStorageProtocol {
  key: string = ''
  value: any

  async setValue <ValueType>(key: string): Promise<ValueType> {
    this.key = key
    return this.value
  }
}
