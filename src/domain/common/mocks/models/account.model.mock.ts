import { AccountModel, mockEntityModel } from '../../../../domain/common'
import { datatype, internet } from 'faker'

export const mockAccountModel = (): AccountModel => ({
  ...mockEntityModel(),
  name: datatype.string(),
  email: internet.email(),
  identification: datatype.uuid(),
  password: internet.password(),
  account_hash: datatype.uuid()
})
