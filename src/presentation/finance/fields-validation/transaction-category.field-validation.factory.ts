import { FieldValidationModel, TypeFieldValidation } from '../../../protocols/request-validator'

export const makeTransactionCategoryFieldsValidations = (): FieldValidationModel[] => ([
  {
    name: 'name',
    label: 'Nome da categoria',
    type: TypeFieldValidation.String,
    min: 3,
    max: 100,
    required: true
  },
  {
    name: 'credit',
    label: 'Crédito',
    type: TypeFieldValidation.Boolean,
    required: true
  },
  {
    name: 'debit',
    label: 'Débito',
    type: TypeFieldValidation.Boolean,
    required: true
  },
  {
    name: 'account_id',
    label: 'Conta do usuário',
    type: TypeFieldValidation.String,
    uuid: true,
    required: true
  }
])
