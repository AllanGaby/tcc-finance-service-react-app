import { FieldValidationModel, TypeFieldValidation } from '../../../protocols/request-validator'

export const makeCompanyFieldsValidations = (): FieldValidationModel[] => ([
  {
    name: 'name',
    label: 'Nome da empresa',
    type: TypeFieldValidation.String,
    min: 3,
    max: 100,
    required: true
  },
  {
    name: 'company_type_id',
    label: 'Tipo da empresa',
    type: TypeFieldValidation.String,
    uuid: true,
    required: true
  }
])
