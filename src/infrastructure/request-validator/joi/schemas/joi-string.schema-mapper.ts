import Joi from 'joi'
import { FieldValidationModel } from '../../../../protocols/request-validator'

export class JoiStringSchemaMapper {
  static getSchema (field: FieldValidationModel): Joi.StringSchema {
    let schema: Joi.StringSchema = Joi.string()
    if (field.email) {
      schema = schema.email({
        multiple: false,
        allowUnicode: false,
        tlds: {
          allow: false
        }
      })
    } else if (field.uuid) {
      schema = schema.uuid()
    } else {
      if (field.min) {
        schema = schema.min(field.min)
      }
      if (field.max) {
        schema = schema.max(field.max)
      }
    }
    if (field.pattern) {
      schema = schema.pattern(new RegExp(field.pattern))
    }
    if (field.required) {
      schema = schema.required()
    } else {
      schema = schema.allow('')
    }
    if (field.values) {
      schema = schema.valid(...field.values)
    }
    return schema
  }
}
