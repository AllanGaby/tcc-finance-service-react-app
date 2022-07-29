import { AccessProdileModel } from '../../../domain/common'

export type AccessSessionModel = {
  account_id: string
  account_name: string
  access_profile: string
  access_profile_rules: string[]
  modules?: AccessProdileModel[]
  access_token: string
  refresh_token: string
}
