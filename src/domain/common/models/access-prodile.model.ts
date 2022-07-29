import { AuthenticationAccessRules } from '../../../domain/common'

export type AccessProdileModel = {
  access_profile_key: string
  access_profile_rules: AuthenticationAccessRules[]
}
