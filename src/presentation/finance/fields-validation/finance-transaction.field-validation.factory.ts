import { FinanceTransactionType } from '../../../domain/finance'
import { FieldValidationModel, TypeFieldValidation } from '../../../protocols/request-validator'

export const makeFinanceTransactionFieldsValidations = (): FieldValidationModel[] => ([
  {
    name: 'title',
    label: 'Descrição',
    type: TypeFieldValidation.String,
    min: 3,
    max: 100,
    required: true
  },
  {
    name: 'type',
    label: 'Tipo de transação',
    type: TypeFieldValidation.String,
    required: true,
    values: Object.values(FinanceTransactionType)
  },
  {
    name: 'date',
    label: 'Data',
    type: TypeFieldValidation.Date,
    required: true
  },
  {
    name: 'value',
    label: 'Valor',
    type: TypeFieldValidation.Number,
    required: true
  },
  {
    name: 'finance_account_id',
    label: 'Conta',
    type: TypeFieldValidation.String,
    uuid: true,
    required: true
  },
  {
    name: 'company_id',
    label: 'Empresa',
    type: TypeFieldValidation.String,
    uuid: true
  },
  {
    name: 'transaction_category_id',
    label: 'Categoria',
    type: TypeFieldValidation.String,
    uuid: true
  }
])
