import { FinanceAccountType } from '../../../domain/finance'
import { FieldValidationModel, TypeFieldValidation } from '../../../protocols/request-validator'

export const makeFinanceAccountFieldsValidations = (): FieldValidationModel[] => ([
  {
    name: 'name',
    label: 'Nome da conta',
    type: TypeFieldValidation.String,
    min: 3,
    max: 100,
    required: true
  },
  {
    name: 'type',
    label: 'tipo da conta',
    type: TypeFieldValidation.String,
    required: true,
    values: Object.values(FinanceAccountType)
  },
  {
    name: 'company_id',
    label: 'Empresa da conta',
    type: TypeFieldValidation.String,
    uuid: true
  },
  {
    name: 'closing_date',
    label: 'Data de fechamento',
    type: TypeFieldValidation.Date
  },
  {
    name: 'due_date',
    label: 'Data de vencimento',
    type: TypeFieldValidation.Date
  },
  {
    name: 'credit_date',
    label: 'Data do crédito',
    type: TypeFieldValidation.Date
  },
  {
    name: 'default_credit_value',
    label: 'Valor do crédito',
    type: TypeFieldValidation.Number
  },
  {
    name: 'default_credit_released',
    label: 'Planejamento de gastos por fatura da conta',
    type: TypeFieldValidation.Number
  },
  {
    name: 'default_finance_account_for_payment_id',
    label: 'Conta padrão para pagamento das faturas da conta',
    type: TypeFieldValidation.String,
    uuid: true
  }
])
