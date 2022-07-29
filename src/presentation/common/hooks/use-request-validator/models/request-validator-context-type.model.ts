import { FieldValidationModel, RequestValidatorProtocol } from '@/protocols/request-validator'

export type RequestValidatorContextType = {
  requestValidator: RequestValidatorProtocol
  getFieldValidation: (field: string, entityFieldsValidation: FieldValidationModel[]) => FieldValidationModel
  getFieldsValidations: (fields: string[], entityFieldsValidation: FieldValidationModel[]) => FieldValidationModel[]
}
