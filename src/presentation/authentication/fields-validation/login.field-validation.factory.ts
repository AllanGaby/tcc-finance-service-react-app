import { FieldValidationModel, TypeFieldValidation } from '../../../protocols/request-validator'

export const makeLoginFieldsValidations = (): FieldValidationModel[] => ([
  {
    name: 'login',
    label: 'Endereço de e-mail',
    type: TypeFieldValidation.String,
    email: true,
    required: true
  },
  {
    name: 'password',
    label: 'Senha de acesso',
    type: TypeFieldValidation.String,
    min: 6,
    max: 20,
    required: true
  }
])
