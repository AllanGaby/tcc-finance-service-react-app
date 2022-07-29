export type LocalStorageContextModel = {
  addLocalStorageValue: <ValueType extends Object>(key: string, value: ValueType) => Promise<ValueType>
  recoverLocalStorageValue: <ValueType extends Object>(key: string) => Promise<ValueType>
}
