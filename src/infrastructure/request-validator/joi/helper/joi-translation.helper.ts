import { FieldValidationModel } from '../../../../protocols/request-validator'
import { ValidationErrorItem } from 'joi'

export const joiTranslationHelper = (path: string, fields: FieldValidationModel[], error: ValidationErrorItem): string => {
  let message: string
  const field = fields.find(fieldItem => path.includes(fieldItem.name))
  if (field) {
    if (error.type.includes('pattern')) {
      const patternText = field.patternDescription ? `: ${field.patternDescription}` : ''
      message = `${field.label} não confere com o padrão requerido${patternText}`
    } else if (error.type.includes('any.only')) {
      message = `${field.label} deve ser igual a ${field.sameToLabel}`
    } else if (error.type.includes('number.base')) {
      message = `Insira o número de ${field.label}`
    } else {
      message = error.message.replace(/["']/g, '').replace(error.context.label || field.name, field.label)
    }
  }
  return message
}
