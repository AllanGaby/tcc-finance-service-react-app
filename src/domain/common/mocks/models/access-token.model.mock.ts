import { AccessTokenModel } from '../../../../domain/common'
import { datatype } from 'faker'

export const mockAccessTokenModel = (): AccessTokenModel => ({
  access_token: datatype.uuid(),
  access_profile: datatype.uuid(),
  services: [
    datatype.uuid(),
    datatype.uuid(),
    datatype.uuid()
  ],
  access_profile_rules: [
    datatype.uuid(),
    datatype.uuid(),
    datatype.uuid()
  ]
})
