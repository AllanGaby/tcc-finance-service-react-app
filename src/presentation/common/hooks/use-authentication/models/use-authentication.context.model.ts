import { CreateAccessSessionDTO, AccessSessionModel, AuthenticationAccessRules } from '@/domain/common'

export type AuthenticationContextModel = {
  loading: boolean
  accessSession: AccessSessionModel
  login: (data: CreateAccessSessionDTO) => Promise<void>
  logout: () => Promise<void>
  hasAccess: (accessRule: AuthenticationAccessRules) => boolean
}
