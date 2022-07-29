import { EntityModel, AccessProdileModel } from '../../../domain/common'

export type AccountModel = EntityModel & {
  name: string
  email: string
  identification?: string
  password?: string
  account_hash: string
  modules?: AccessProdileModel[]
}
