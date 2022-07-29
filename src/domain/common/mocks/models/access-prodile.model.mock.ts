import { AccessProdileModel, AuthenticationAccessRules } from '../../../../domain/common'
import { datatype } from 'faker'

export const mockAccessProdileModel = (): AccessProdileModel => ({
  access_profile_key: datatype.uuid(),
  access_profile_rules: Object.values(AuthenticationAccessRules)
})
