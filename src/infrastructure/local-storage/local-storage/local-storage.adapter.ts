import { SetValueInStorageProtocol, RecoverValueInStorageProtocol } from '../../../protocols/local-storage'

export class LocalStorageAdapter implements SetValueInStorageProtocol, RecoverValueInStorageProtocol {
  async setValue <ValueType>(key: string, value: ValueType): Promise<ValueType> {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value))
      return value
    }
    localStorage.removeItem(key)
    return undefined
  }

  async recoverValue <ValueType>(key: string): Promise<ValueType | string> {
    const result = localStorage.getItem(key)
    if (result) {
      try {
        return JSON.parse(result)
      } catch {
        return result
      }
    }
    return undefined
  }
}
