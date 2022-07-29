import { AuthenticationAccessRules, CreateAccessSessionDTO, mockAccessSessionModel } from '../../../../../../domain/common'
import { AuthenticationContextModel } from '../../../'
import { datatype } from 'faker'

export const mockAuthenticationContextModel = (): AuthenticationContextModel => ({
  loading: datatype.boolean(),
  accessSession: mockAccessSessionModel(),
  login: (data: CreateAccessSessionDTO) => { return undefined },
  logout: () => { return undefined },
  hasAccess: (accessRule: AuthenticationAccessRules) => { return false }
})
