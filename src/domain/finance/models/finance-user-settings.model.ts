import { EntityModel, AccountModel } from '../../../domain/common'

export type FinanceUserSettingsModel = EntityModel & {
  account_id: string
  months_to_predict: number
  account?: AccountModel
}
