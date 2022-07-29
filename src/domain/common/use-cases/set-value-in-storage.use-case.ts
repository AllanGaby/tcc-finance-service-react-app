export interface SetValueInStorageUseCase {
  setValue: <ValueType = any>(key: string, value: ValueType) => Promise<ValueType>
}
