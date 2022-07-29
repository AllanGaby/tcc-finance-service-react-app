import { EntityModel, AccountModel } from '../../../domain/common'

export type TransactionTagModel = EntityModel & {
  account_id: string
  name: string
  account?: AccountModel
}
