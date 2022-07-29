import { RequestValidatorProtocol, FieldValidationModel, RequestValidatorModel } from '../../../../protocols/request-validator'
import { JoiObjectSchemaMapper } from '../../../../infrastructure/request-validator/joi'
import { joiTranslationHelper } from '../../../../infrastructure/request-validator/joi/helper'
import { messages } from 'joi-translation-pt-br'

export class JoiValidationAdapter implements RequestValidatorProtocol {
  validate (fields: FieldValidationModel[], data: any): RequestValidatorModel[] {
    const listErrors = JoiObjectSchemaMapper.getSchema(fields).validate(data, {
      abortEarly: false,
      messages: messages,
      allowUnknown: true
    }).error
    if (listErrors) {
      const requestResult: RequestValidatorModel[] = []
      listErrors.details.forEach(error => {
        const path = error.path.toString()
        requestResult.push({
          path,
          message: joiTranslationHelper(path, fields, error) || error.message
        })
      })
      return requestResult
    }
    return undefined
  }
}
