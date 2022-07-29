import { mockEntityModel, mockAccountModel } from '../../../../domain/common'
import { TransactionCategoryModel } from '../../../../domain/finance'
import { datatype } from 'faker'

export const mockTransactionCategoryModel = (): TransactionCategoryModel => ({
  ...mockEntityModel(),
  account_id: datatype.uuid(),
  name: datatype.string(),
  credit: datatype.boolean(),
  debit: datatype.boolean(),
  account: mockAccountModel()
})
