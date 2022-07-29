import { JoiStringSchemaMapper } from './joi-string.schema-mapper'
import { mockFieldValidationModel } from '../../../../protocols/request-validator'
import Joi from 'joi'

const emailConfig = {
  multiple: false,
  allowUnicode: false,
  tlds: {
    allow: false
  }
}

describe('JoiStringSchemaMapper', () => {
  test('Should return correct Joi Schema if only name and type is provided', () => {
    const { name, type, label } = mockFieldValidationModel()
    const schema = JoiStringSchemaMapper.getSchema({
      name,
      label,
      type
    })
    expect(schema).toEqual(Joi.string().allow(''))
  })

  describe('Required is true', () => {
    test('Should return correct Joi Schema if only required is provided and is true', () => {
      const { name, type, label } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        label,
        required: true
      })
      expect(schema).toEqual(Joi.string().required())
    })

    test('Should return correct Joi Schema if min is provided', () => {
      const { name, type, label, min } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        label,
        required: true,
        min
      })
      expect(schema).toEqual(Joi.string().min(min).required())
    })

    test('Should return correct Joi Schema if max is provided', () => {
      const { name, type, label, max } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        label,
        required: true,
        max
      })
      expect(schema).toEqual(Joi.string().max(max).required())
    })

    test('Should return correct Joi Schema if min and max are provided', () => {
      const { name, type, label, min, max } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        label,
        required: true,
        min,
        max
      })
      expect(schema).toEqual(Joi.string().min(min).max(max).required())
    })

    test('Should return correct Joi Schema if email is provided and is true', () => {
      const { name, type, label } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        label,
        required: true,
        email: true
      })
      expect(schema).toEqual(Joi.string().email(emailConfig).required())
    })

    test('Should return correct Joi Schema if uuid is provided and is true', () => {
      const { name, type, label } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        label,
        required: true,
        uuid: true
      })
      expect(schema).toEqual(Joi.string().uuid().required())
    })

    test('Should return correct Joi Schema if pattern is provided', () => {
      const { name, type, label, pattern } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        label,
        required: true,
        pattern
      })
      expect(schema).toEqual(Joi.string().pattern(pattern).required())
    })

    test('Should return correct Joi Schema if values is provided', () => {
      const { name, type, label, values } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        label,
        required: true,
        values
      })
      expect(schema).toEqual(Joi.string().valid(...values).required())
    })
  })

  describe('Required is false', () => {
    test('Should return correct Joi Schema if only required is provided and is false', () => {
      const { name, type, label } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        label,
        required: false
      })
      expect(schema).toEqual(Joi.string().allow(''))
    })

    test('Should return correct Joi Schema if min is provided', () => {
      const { name, type, label, min } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        label,
        required: false,
        min
      })
      expect(schema).toEqual(Joi.string().min(min).allow(''))
    })

    test('Should return correct Joi Schema if max is provided', () => {
      const { name, type, label, max } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        label,
        required: false,
        max
      })
      expect(schema).toEqual(Joi.string().max(max).allow(''))
    })

    test('Should return correct Joi Schema if min and max are provided', () => {
      const { name, type, label, min, max } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        label,
        required: false,
        min,
        max
      })
      expect(schema).toEqual(Joi.string().min(min).max(max).allow(''))
    })

    test('Should return correct Joi Schema if email is provided and is true', () => {
      const { name, type, label } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        label,
        required: false,
        email: true
      })
      expect(schema).toEqual(Joi.string().email(emailConfig).allow(''))
    })

    test('Should return correct Joi Schema if uuid is provided and is true', () => {
      const { name, type, label } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        label,
        required: false,
        uuid: true
      })
      expect(schema).toEqual(Joi.string().uuid().allow(''))
    })

    test('Should return correct Joi Schema if pattern is provided', () => {
      const { name, type, label, pattern } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        label,
        required: false,
        pattern
      })
      expect(schema).toEqual(Joi.string().pattern(pattern).allow(''))
    })

    test('Should return correct Joi Schema if values is provided', () => {
      const { name, type, label, values } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        label,
        required: false,
        values
      })
      expect(schema).toEqual(Joi.string().valid(...values).allow(''))
    })
  })

  describe('Email is true', () => {
    test('Should return correct Joi Schema if only email is provided and is true', () => {
      const { name, type, label } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        label,
        email: true
      })
      expect(schema).toEqual(Joi.string().email(emailConfig).allow(''))
    })

    test('Should return correct Joi Schema if min is provided', () => {
      const { name, type, label, min } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        label,
        email: true,
        min
      })
      expect(schema).toEqual(Joi.string().email(emailConfig).allow(''))
    })

    test('Should return correct Joi Schema if max is provided', () => {
      const { name, type, label, max } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        label,
        email: true,
        max
      })
      expect(schema).toEqual(Joi.string().email(emailConfig).allow(''))
    })

    test('Should return correct Joi Schema if min and max are provided', () => {
      const { name, type, label, min, max } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        label,
        email: true,
        min,
        max
      })
      expect(schema).toEqual(Joi.string().email(emailConfig).allow(''))
    })

    test('Should return correct Joi Schema if uuid is provided and is true', () => {
      const { name, type, label } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        label,
        email: true,
        uuid: true
      })
      expect(schema).toEqual(Joi.string().email(emailConfig).allow(''))
    })

    test('Should return correct Joi Schema if pattern is provided', () => {
      const { name, type, label, pattern } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        label,
        email: true,
        pattern
      })
      expect(schema).toEqual(Joi.string().email(emailConfig).pattern(pattern).allow(''))
    })

    test('Should return correct Joi Schema if values is provided', () => {
      const { name, type, label, values } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        label,
        email: true,
        values
      })
      expect(schema).toEqual(Joi.string().email(emailConfig).valid(...values).allow(''))
    })
  })

  describe('Email is false', () => {
    test('Should return correct Joi Schema if only email is provided and is false', () => {
      const { name, type, label } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        label,
        email: false
      })
      expect(schema).toEqual(Joi.string().allow(''))
    })

    test('Should return correct Joi Schema if min is provided', () => {
      const { name, type, label, min } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        label,
        email: false,
        min
      })
      expect(schema).toEqual(Joi.string().min(min).allow(''))
    })

    test('Should return correct Joi Schema if max is provided', () => {
      const { name, type, label, max } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        label,
        email: false,
        max
      })
      expect(schema).toEqual(Joi.string().max(max).allow(''))
    })

    test('Should return correct Joi Schema if min and max are provided', () => {
      const { name, type, label, min, max } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        label,
        email: false,
        min,
        max
      })
      expect(schema).toEqual(Joi.string().min(min).max(max).allow(''))
    })

    test('Should return correct Joi Schema if required is provided and is true', () => {
      const { name, type, label } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        label,
        email: false,
        required: true
      })
      expect(schema).toEqual(Joi.string().required())
    })

    test('Should return correct Joi Schema if uuid is provided and is true', () => {
      const { name, type, label } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        label,
        email: false,
        uuid: true
      })
      expect(schema).toEqual(Joi.string().uuid().allow(''))
    })

    test('Should return correct Joi Schema if pattern is provided', () => {
      const { name, type, label, pattern } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        label,
        email: false,
        pattern
      })
      expect(schema).toEqual(Joi.string().pattern(pattern).allow(''))
    })

    test('Should return correct Joi Schema if values is provided', () => {
      const { name, type, label, values } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        label,
        email: false,
        values
      })
      expect(schema).toEqual(Joi.string().valid(...values).allow(''))
    })
  })

  describe('Uuid is true', () => {
    test('Should return correct Joi Schema if only uuid is provided and is true', () => {
      const { name, type, label } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        label,
        uuid: true
      })
      expect(schema).toEqual(Joi.string().uuid().allow(''))
    })

    test('Should return correct Joi Schema if min is provided', () => {
      const { name, type, label, min } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        label,
        uuid: true,
        min
      })
      expect(schema).toEqual(Joi.string().uuid().allow(''))
    })

    test('Should return correct Joi Schema if max is provided', () => {
      const { name, type, label, max } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        label,
        uuid: true,
        max
      })
      expect(schema).toEqual(Joi.string().uuid().allow(''))
    })

    test('Should return correct Joi Schema if min and max are provided', () => {
      const { name, type, label, min, max } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        label,
        uuid: true,
        min,
        max
      })
      expect(schema).toEqual(Joi.string().uuid().allow(''))
    })

    test('Should return correct Joi Schema if pattern is provided', () => {
      const { name, type, label, pattern } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        label,
        uuid: true,
        pattern
      })
      expect(schema).toEqual(Joi.string().uuid().pattern(pattern).allow(''))
    })

    test('Should return correct Joi Schema if values is provided', () => {
      const { name, type, label, values } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        label,
        uuid: true,
        values
      })
      expect(schema).toEqual(Joi.string().uuid().valid(...values).allow(''))
    })
  })

  describe('Uuid is false', () => {
    test('Should return correct Joi Schema if only uuid is provided and is false', () => {
      const { name, type, label } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        label,
        uuid: false
      })
      expect(schema).toEqual(Joi.string().allow(''))
    })

    test('Should return correct Joi Schema if min is provided', () => {
      const { name, type, label, min } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        label,
        uuid: false,
        min
      })
      expect(schema).toEqual(Joi.string().min(min).allow(''))
    })

    test('Should return correct Joi Schema if max is provided', () => {
      const { name, type, label, max } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        label,
        uuid: false,
        max
      })
      expect(schema).toEqual(Joi.string().max(max).allow(''))
    })

    test('Should return correct Joi Schema if min and max are provided', () => {
      const { name, type, label, min, max } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        label,
        uuid: false,
        min,
        max
      })
      expect(schema).toEqual(Joi.string().min(min).max(max).allow(''))
    })

    test('Should return correct Joi Schema if required is provided and is true', () => {
      const { name, type, label } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        label,
        uuid: false,
        required: true
      })
      expect(schema).toEqual(Joi.string().required())
    })

    test('Should return correct Joi Schema if pattern is provided', () => {
      const { name, type, label, pattern } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        label,
        uuid: false,
        pattern
      })
      expect(schema).toEqual(Joi.string().pattern(pattern).allow(''))
    })

    test('Should return correct Joi Schema if values is provided', () => {
      const { name, type, label, values } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        label,
        uuid: false,
        values
      })
      expect(schema).toEqual(Joi.string().valid(...values).allow(''))
    })
  })

  describe('Min is provided', () => {
    test('Should return correct Joi Schema if only min is provided', () => {
      const { name, type, label, min } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        min,
        label
      })
      expect(schema).toEqual(Joi.string().min(min).allow(''))
    })

    test('Should return correct Joi Schema if max is provided', () => {
      const { name, type, label, min, max } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        min,
        max,
        label
      })
      expect(schema).toEqual(Joi.string().min(min).max(max).allow(''))
    })

    test('Should return correct Joi Schema if pattern is provided', () => {
      const { name, type, label, min, pattern } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        min,
        pattern,
        label
      })
      expect(schema).toEqual(Joi.string().min(min).pattern(pattern).allow(''))
    })

    test('Should return correct Joi Schema if values is provided', () => {
      const { name, type, label, min, values } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        min,
        values,
        label
      })
      expect(schema).toEqual(Joi.string().min(min).valid(...values).allow(''))
    })
  })

  describe('Max is provided', () => {
    test('Should return correct Joi Schema if only max is provided', () => {
      const { name, type, label, max } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        max,
        label
      })
      expect(schema).toEqual(Joi.string().max(max).allow(''))
    })

    test('Should return correct Joi Schema if pattern is provided', () => {
      const { name, type, label, max, pattern } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        max,
        pattern,
        label
      })
      expect(schema).toEqual(Joi.string().max(max).pattern(pattern).allow(''))
    })

    test('Should return correct Joi Schema if values is provided', () => {
      const { name, type, label, max, values } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        max,
        values,
        label
      })
      expect(schema).toEqual(Joi.string().max(max).valid(...values).allow(''))
    })
  })
})
