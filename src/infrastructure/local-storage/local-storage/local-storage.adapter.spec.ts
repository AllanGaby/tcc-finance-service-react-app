import { LocalStorageAdapter } from './local-storage.adapter'
import 'jest-localstorage-mock'
import { datatype, random } from 'faker'

type sutTypes = {
  sut: LocalStorageAdapter
  key: string
}

const makeSut = (): sutTypes => ({
  sut: new LocalStorageAdapter(),
  key: datatype.uuid()
})

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('SetValue Method', () => {
    test('Should call setItem with correct value if value is provided', async () => {
      const { sut, key } = makeSut()
      const setItemSpy = jest.spyOn(localStorage, 'setItem')
      const value = random.objectElement<object>()
      await sut.setValue(key, value)
      expect(setItemSpy).toHaveBeenCalledWith(key, JSON.stringify(value))
    })

    test('Should return same value provided if setItem is succeeds', async () => {
      const { sut, key } = makeSut()
      const value = random.objectElement<object>()
      const result = await sut.setValue(key, value)
      expect(result).toEqual(value)
    })

    test('Should call removeItem if value is undefined', async () => {
      const { sut, key } = makeSut()
      const removeItemSpy = jest.spyOn(localStorage, 'removeItem')
      await sut.setValue(key, undefined)
      expect(removeItemSpy).toHaveBeenCalledWith(key)
    })
  })

  describe('Recover Value', () => {
    test('Should call getItem with correct key', async () => {
      const { sut, key } = makeSut()
      const getItemSpy = jest.spyOn(localStorage, 'getItem')
      await sut.recoverValue(key)
      expect(getItemSpy).toHaveBeenCalledWith(key)
    })

    test('Should return same value of LocalStorage return', async () => {
      const { sut, key } = makeSut()
      const value = random.objectElement<object>()
      jest.spyOn(localStorage, 'getItem').mockReturnValue(JSON.stringify(value))
      const result = await sut.recoverValue(key)
      expect(result).toEqual(value)
    })

    test('Should return string if of LocalStorage dont can cast the value', async () => {
      const { sut, key } = makeSut()
      const value = datatype.string()
      jest.spyOn(localStorage, 'getItem').mockReturnValue(value)
      const result = await sut.recoverValue(key)
      expect(result).toEqual(value)
    })
  })
})
