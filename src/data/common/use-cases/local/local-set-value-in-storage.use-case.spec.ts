import { LocalSetValueInStorageUseCase } from './local-set-value-in-storage.use-case'
import { SetValueInStorageSpy } from '../../../../protocols/local-storage'
import { random, database } from 'faker'

type sutTypes = {
  sut: LocalSetValueInStorageUseCase
  setValueInStorage: SetValueInStorageSpy
  value: object
  key: string
}

const makeSut = (): sutTypes => {
  const value = random.objectElement<object>()
  const setValueInStorage = new SetValueInStorageSpy()
  jest.spyOn(setValueInStorage, 'setValue').mockResolvedValue(value)
  const sut = new LocalSetValueInStorageUseCase(setValueInStorage)
  return {
    sut,
    setValueInStorage,
    value,
    key: database.column()
  }
}

describe('LocalSetValueInStorageUseCase', () => {
  test('Should call SetValueInStorage with correct value', async () => {
    const { sut, setValueInStorage, key, value } = makeSut()
    const setValueSpy = jest.spyOn(setValueInStorage, 'setValue')
    await sut.setValue(key, value)
    expect(setValueSpy).toHaveBeenCalledWith(key, value)
  })

  test('Should return same SetValueInStorage returns', async () => {
    const { sut, key, value } = makeSut()
    const result = await sut.setValue(key, value)
    expect(result).toEqual(value)
  })
})
