import { datatype } from 'faker'
import { ValidationErrorItem } from 'joi'

export const mockValidationErrorItem = (
  path: string,
  type: string = datatype.string(),
  message: string = datatype.string(),
  label: string = undefined): ValidationErrorItem => ({
  type,
  message,
  path: [path],
  context: {
    label
  }
})
