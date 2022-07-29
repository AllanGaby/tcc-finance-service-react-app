import { AuthenticationAccessRules } from '../../../../domain/common'
import { random } from 'faker'

export const mockAuthenticationAccessRules = (): AuthenticationAccessRules =>
  random.arrayElement(Object.values(AuthenticationAccessRules))
