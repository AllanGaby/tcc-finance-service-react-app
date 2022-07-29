import { FieldValidationModel, TypeFieldValidation } from '../../../protocols/request-validator'

export const makeTransactionTagFieldsValidations = (): FieldValidationModel[] => ([
  {
    name: 'name',
    label: 'Tag',
    type: TypeFieldValidation.String,
    min: 2,
    max: 100,
    required: true
  }
])
