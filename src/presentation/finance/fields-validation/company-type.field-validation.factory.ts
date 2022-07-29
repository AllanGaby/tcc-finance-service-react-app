import { FieldValidationModel, TypeFieldValidation } from '../../../protocols/request-validator'

export const makeCompanyTypeFieldsValidations = (): FieldValidationModel[] => ([
  {
    name: 'name',
    label: 'Nome do tipo de empresa',
    type: TypeFieldValidation.String,
    min: 3,
    max: 100,
    required: true
  }
])
