import { FieldValidationModel, RequestValidatorSpy } from '../../../../../../protocols/request-validator'
import { RequestValidatorContextType } from '../../../'

export const mockRequestValidatorContextType = (): RequestValidatorContextType => ({
  requestValidator: new RequestValidatorSpy(),
  getFieldValidation: (field: string, entityFieldsValidation: FieldValidationModel[]) => { return undefined },
  getFieldsValidations: (fields: string[], entityFieldsValidation: FieldValidationModel[]) => { return undefined }
})
