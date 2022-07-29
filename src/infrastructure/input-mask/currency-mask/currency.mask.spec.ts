import { CurrencyMask } from './currency.mask'
import { datatype, random } from 'faker'

type sutTypes = {
  sut: CurrencyMask
}

const makeSut = (maxLength = undefined, prefix = undefined): sutTypes => ({
  sut: new CurrencyMask({
    maxLength,
    prefix
  })
})

describe('CurrencyMask', () => {
  test('Should ignore all alpha caracteres', () => {
    const { sut } = makeSut()
    const result = sut.mask(random.alpha())
    expect(result).toBeFalsy()
  })

  test('Should apply max length validation', () => {
    const maxLength = 3
    const { sut } = makeSut(maxLength)
    const value = String(datatype.number({ min: 1000 }))
    const result = sut.mask(value)
    expect(result.slice(2).replace(/\./g, '').replace(/,/g, '')).toBe(value.substring(0, value.length - 1))
  })

  test('Should add prefix, dots and commas', () => {
    const prefix = '$'
    const { sut } = makeSut(datatype.number({ min: 6 }), prefix)
    const value = String(datatype.number({ min: 100000, max: 999999 }))
    const result = sut.mask(value)
    expect(result).toBe(`${prefix}${value.slice(0, 1)}.${value.slice(1, 4)},${value.slice(4, 6)}`)
  })
})
