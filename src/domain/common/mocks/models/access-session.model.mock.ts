import { AccessSessionModel, mockAccessProdileModel } from '../../../../domain/common'
import { datatype } from 'faker'

export const mockAccessSessionModel = (): AccessSessionModel => ({
  account_id: datatype.uuid(),
  account_name: datatype.uuid(),
  access_profile: datatype.uuid(),
  access_token: datatype.uuid(),
  refresh_token: datatype.uuid(),
  access_profile_rules: [
    datatype.uuid(),
    datatype.uuid(),
    datatype.uuid()
  ],
  modules: [
    mockAccessProdileModel(),
    mockAccessProdileModel(),
    mockAccessProdileModel()
  ]
})
