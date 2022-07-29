import { LocalRecoverValueInStorageUseCase } from './local-recover-value-in-storage.use-case'
import { RecoverValueInStorageSpy } from '../../../../protocols/local-storage'
import { random, database } from 'faker'

type sutTypes = {
  sut: LocalRecoverValueInStorageUseCase
  recoverValueInStorageAdapter: RecoverValueInStorageSpy
  key: string
  value: Object
}

const makeSut = (): sutTypes => {
  const recoverValueInStorageAdapter = new RecoverValueInStorageSpy()
  const value = random.objectElement<object>()
  jest.spyOn(recoverValueInStorageAdapter, 'recoverValue').mockResolvedValue(value)
  const sut = new LocalRecoverValueInStorageUseCase(recoverValueInStorageAdapter)
  return {
    sut,
    recoverValueInStorageAdapter,
    value,
    key: database.column()
  }
}

describe('LocalRecoverValueInStorageUseCase', () => {
  test('Should call recoverValueInStorageAdapter with correct value', async () => {
    const { sut, recoverValueInStorageAdapter, key } = makeSut()
    const recoverValueSpy = jest.spyOn(recoverValueInStorageAdapter, 'recoverValue')
    await sut.recoverValue(key)
    expect(recoverValueSpy).toHaveBeenCalledWith(key)
  })

  test('Should return same recoverValueInStorageAdapter returns', async () => {
    const { sut, key, value } = makeSut()
    const result = await sut.recoverValue(key)
    expect(result).toEqual(value)
  })
})
