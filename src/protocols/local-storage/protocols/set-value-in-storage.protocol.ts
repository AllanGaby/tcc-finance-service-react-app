export interface SetValueInStorageProtocol {
  setValue: <ValueType>(key: string, value: ValueType) => Promise<ValueType>
}
