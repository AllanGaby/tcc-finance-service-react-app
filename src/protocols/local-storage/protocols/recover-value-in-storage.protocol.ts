export interface RecoverValueInStorageProtocol {
  recoverValue: <ValueType>(key: string) => Promise<ValueType | string>
}
