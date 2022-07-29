import { AuthenticationAccessRules } from '../../../../domain/common'
import { AppRouteModel } from '../../../../main/application/models'
import {
  DashboardPage,
  ListCompanyTypePage,
  FormCompanyTypePage,
  ListCompanyPage,
  FormCompanyPage,
  ListFinanceAccountPage,
  FormFinanceAccountPage,
  ListFinanceTransactionPage,
  FormFinanceTransactionPage,
  ListTransactionCategoryPage,
  FormTransactionCategoryPage
} from '../../../../presentation/finance'

export const FinanceRoutes: AppRouteModel[] = [
  { path: '/dashboard', component: DashboardPage, viewInMenu: true, title: 'Dashboard', access_rule: AuthenticationAccessRules.ListFinanceAccount },
  { path: '/list-company-type', component: ListCompanyTypePage, title: 'Tipos de empresas', isActive: true, viewInMenu: true, access_rule: AuthenticationAccessRules.ListCompanyType },
  { path: '/create-company-type', component: FormCompanyTypePage, title: 'Cadastro de tipos de empresas', access_rule: AuthenticationAccessRules.CreateCompanyType },
  { path: '/update-company-type/:company_type_id', component: FormCompanyTypePage, title: 'Edição de tipos de empresas', access_rule: AuthenticationAccessRules.UpdateCompanyType },
  { path: '/list-company', component: ListCompanyPage, title: 'Empresas', viewInMenu: true, access_rule: AuthenticationAccessRules.ListCompany },
  { path: '/create-company', component: FormCompanyPage, title: 'Cadastro de empresas', access_rule: AuthenticationAccessRules.CreateCompany },
  { path: '/update-company/:company_id', component: FormCompanyPage, title: 'Edição de empresas', access_rule: AuthenticationAccessRules.UpdateCompany },
  { path: '/list-finance-account', component: ListFinanceAccountPage, title: 'Contas', viewInMenu: true, access_rule: AuthenticationAccessRules.ListFinanceAccount },
  { path: '/create-finance-account', component: FormFinanceAccountPage, title: 'Cadastro de contas', access_rule: AuthenticationAccessRules.CreateFinanceAccount },
  { path: '/update-finance-account/:finance_account_id', component: FormFinanceAccountPage, title: 'Edição de contas', access_rule: AuthenticationAccessRules.UpdateFinanceAccount },
  { path: '/list-finance-transaction', component: ListFinanceTransactionPage, title: 'Transações', viewInMenu: true, access_rule: AuthenticationAccessRules.ListFinanceTransaction },
  { path: '/create-finance-transaction', component: FormFinanceTransactionPage, title: 'Cadastro de transações', access_rule: AuthenticationAccessRules.CreateFinanceTransaction },
  { path: '/update-finance-transaction/:finance_transaction_id', component: FormFinanceTransactionPage, title: 'Edição de transações', access_rule: AuthenticationAccessRules.UpdateFinanceTransaction },
  { path: '/list-transaction-category', component: ListTransactionCategoryPage, title: 'Categorias', viewInMenu: true, access_rule: AuthenticationAccessRules.ListTransactionCategory },
  { path: '/create-transaction-category', component: FormTransactionCategoryPage, title: 'Cadastro de categorias de transações', access_rule: AuthenticationAccessRules.CreateTransactionCategory },
  { path: '/update-transaction-category/:transaction_category_id', component: FormTransactionCategoryPage, title: 'Edição de categorias de transações', access_rule: AuthenticationAccessRules.UpdateTransactionCategory }
]
