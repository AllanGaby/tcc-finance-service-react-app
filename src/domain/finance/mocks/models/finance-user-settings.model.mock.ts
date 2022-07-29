import { mockEntityModel, mockAccountModel } from '../../../../domain/common'
import { FinanceUserSettingsModel } from '../../../../domain/finance'
import { datatype } from 'faker'

export const mockFinanceUserSettingsModel = (): FinanceUserSettingsModel => ({
  ...mockEntityModel(),
  account_id: datatype.uuid(),
  months_to_predict: datatype.number(60),
  account: mockAccountModel()
})
