import { RouteProps } from 'react-router-dom'
import { AuthenticationAccessRules } from '../../../domain/common'
import { MenuItemProps } from '../../../presentation/common'

export type AppRouteModel = RouteProps & MenuItemProps & {
  access_rule?: AuthenticationAccessRules
  viewInMenu?: boolean
}
