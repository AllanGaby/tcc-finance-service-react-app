import { DecimalMask } from './decimal.mask'
import { datatype, random } from 'faker'

type sutTypes = {
  sut: DecimalMask
}

const makeSut = (digits = undefined, maxLength = undefined, max = undefined): sutTypes => ({
  sut: new DecimalMask({ digits, maxLength, max })
})

describe('DecimalMask', () => {
  test('Should ignore all alpha caracteres', () => {
    const { sut } = makeSut()
    const result = sut.mask(random.alpha())
    expect(result).toBeFalsy()
  })

  test('Should apply max length validation', () => {
    const digits = 2
    const maxLength = 3
    const { sut } = makeSut(digits, maxLength)
    const value = String(datatype.number({ min: 1000 }))
    const result = sut.mask(value)
    expect(result.replace(/,/g, '')).toBe(value.substring(0, value.length - 1))
  })

  test('Should apply max values correct', () => {
    const digits = 2
    const maxLength = 4
    const max = datatype.number({ min: 20, max: 20 })
    const { sut } = makeSut(digits, maxLength, max)
    const result = sut.mask(String(datatype.number({ min: 21, max: 21 })))
    expect(result).toBe(String(max.toFixed(digits).replace('.', ',')))
  })
})
