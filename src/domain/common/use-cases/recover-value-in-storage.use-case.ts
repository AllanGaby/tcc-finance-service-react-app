export interface RecoverValueInStorageUseCase {
  recoverValue: <ValueType>(key: string) => Promise<ValueType | string>
}
