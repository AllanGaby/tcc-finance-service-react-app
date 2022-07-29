import { AppRouteModel } from '../../../../main/application/models'
import { LoginPage } from '../../../../presentation/authentication'

export const OpenningRoutes: AppRouteModel[] = [
  { path: '/login', component: LoginPage, title: 'Login', isActive: true }
]
