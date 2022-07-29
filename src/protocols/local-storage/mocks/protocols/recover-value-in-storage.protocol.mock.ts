import { RecoverValueInStorageProtocol } from '@/protocols/local-storage'

export class RecoverValueInStorageSpy implements RecoverValueInStorageProtocol {
  key: string
  value: any

  async recoverValue <ValueType>(key: string): Promise<ValueType> {
    this.key = key
    return this.value
  }
}
