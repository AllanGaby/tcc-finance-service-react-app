import { EntityModel, AccountModel } from '../../../domain/common'

export type TransactionCategoryModel = EntityModel & {
  account_id: string
  name: string
  credit: boolean
  debit: boolean
  account?: AccountModel
}
