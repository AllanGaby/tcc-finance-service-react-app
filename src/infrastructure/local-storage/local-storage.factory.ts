import { LocalStorageAdapter } from './local-storage'
import { RecoverValueInStorageProtocol, SetValueInStorageProtocol } from '../../protocols/local-storage'

export type LocalStorageProtocols =
RecoverValueInStorageProtocol
| SetValueInStorageProtocol

export class LocalStorageFactory {
  public static GetLocalStorageAdaper<AdapterType extends LocalStorageProtocols>(): AdapterType {
    return new LocalStorageAdapter() as unknown as AdapterType
  }
}
