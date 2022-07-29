import { joiTranslationHelper } from '../../../../infrastructure/request-validator/joi/helper'
import { mockValidationErrorItem } from '../../../../infrastructure/request-validator/joi/mocks'
import { mockFieldValidationModel } from '../../../../protocols/request-validator'
import { database, datatype } from 'faker'

describe('joiTranslationHelper', () => {
  describe('Field is not invalidate', () => {
    test('Should return undefined', () => {
      const field = mockFieldValidationModel()
      const path = database.column()
      const error = mockValidationErrorItem(datatype.uuid())
      const message = joiTranslationHelper(path, [field], error)
      expect(message).toBeFalsy()
    })
  })

  describe('Type includes "Pattern"', () => {
    test('Should return correct message if PatternDescription is provided', () => {
      const field = mockFieldValidationModel()
      field.patternDescription = datatype.uuid()
      const error = mockValidationErrorItem(field.name, 'pattern')
      const message = joiTranslationHelper(field.name, [field], error)
      expect(message).toBe(`${field.label} não confere com o padrão requerido: ${field.patternDescription}`)
    })

    test('Should return correct message if PatternDescription is not provided', () => {
      const field = mockFieldValidationModel()
      delete field.patternDescription
      const error = mockValidationErrorItem(field.name, 'pattern')
      const message = joiTranslationHelper(field.name, [field], error)
      expect(message).toBe(`${field.label} não confere com o padrão requerido`)
    })
  })

  describe('Type includes "Any.Only"', () => {
    test('Should return correct message', () => {
      const field = mockFieldValidationModel()
      const error = mockValidationErrorItem(field.name, 'any.only')
      const message = joiTranslationHelper(field.name, [field], error)
      expect(message).toBe(`${field.label} deve ser igual a ${field.sameToLabel}`)
    })
  })

  describe('Type includes "Number.Base"', () => {
    test('Should return correct message', () => {
      const field = mockFieldValidationModel()
      const error = mockValidationErrorItem(field.name, 'number.base')
      const message = joiTranslationHelper(field.name, [field], error)
      expect(message).toBe(`Insira o número de ${field.label}`)
    })
  })

  describe('Other errors', () => {
    test('Should return message if label is provided', () => {
      const field = mockFieldValidationModel()
      const label = datatype.uuid()
      const message = `${datatype.string()} "${label}" ${datatype.string()}`
      const error = mockValidationErrorItem(field.name, datatype.uuid(), message, label)
      const response = joiTranslationHelper(field.name, [field], error)
      expect(response).toBe(message.replace(/["']/g, '').replace(label, field.label))
    })

    test('Should return message if label is not provided', () => {
      const field = mockFieldValidationModel()
      const message = `${datatype.string()} "${field.name}" ${datatype.string()}`
      const error = mockValidationErrorItem(field.name, datatype.uuid(), message)
      const response = joiTranslationHelper(field.name, [field], error)
      expect(response).toBe(message.replace(/["']/g, '').replace(field.name, field.label))
    })
  })
})
