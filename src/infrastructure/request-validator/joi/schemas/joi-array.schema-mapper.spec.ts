import { JoiArraySchemaMapper } from './joi-array.schema-mapper'
import { mockFieldValidationModel } from '../../../../protocols/request-validator'
import Joi from 'joi'

describe('JoiArraySchemaMapper', () => {
  test('Should return correct Joi Schema if required is provided and is true', () => {
    const { name, type, label } = mockFieldValidationModel()
    const joiSchema = Joi.string()
    const schema = JoiArraySchemaMapper.getSchema({
      type,
      label,
      name,
      required: true
    }, joiSchema)
    expect(schema).toEqual(Joi.array().items(joiSchema).required())
  })

  test('Should return correct Joi Schema if required is provided and is false', () => {
    const { name, type, label } = mockFieldValidationModel()
    const joiSchema = Joi.string()
    const schema = JoiArraySchemaMapper.getSchema({
      type,
      label,
      name,
      required: false
    }, joiSchema)
    expect(schema).toEqual(Joi.array().items(joiSchema))
  })

  test('Should return correct Joi Schema if required is not provided', () => {
    const { name, type, label } = mockFieldValidationModel()
    const joiSchema = Joi.string()
    const schema = JoiArraySchemaMapper.getSchema({
      type,
      label,
      name
    }, joiSchema)
    expect(schema).toEqual(Joi.array().items(joiSchema))
  })

  test('Should return correct Joi Schema if min is provided', () => {
    const { name, type, min, label } = mockFieldValidationModel()
    const joiSchema = Joi.string()
    const schema = JoiArraySchemaMapper.getSchema({
      type,
      label,
      name,
      min
    }, joiSchema)
    expect(schema).toEqual(Joi.array().items(joiSchema).min(min))
  })

  test('Should return correct Joi Schema if max is provided', () => {
    const { name, type, max, label } = mockFieldValidationModel()
    const joiSchema = Joi.string()
    const schema = JoiArraySchemaMapper.getSchema({
      type,
      label,
      name,
      max
    }, joiSchema)
    expect(schema).toEqual(Joi.array().items(joiSchema).max(max))
  })
})
