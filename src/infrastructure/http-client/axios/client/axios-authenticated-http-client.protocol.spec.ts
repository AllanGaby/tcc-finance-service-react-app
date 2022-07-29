import { AxiosAuthenticatedHttpClientAdapter } from './axios-authenticated-http-client.protocol'
import { RecoverValueInStorageUseCaseSpy } from '../../../../domain/common'
import { mockErrorStatusCode, mockHttpRequest, mockHttpResponse } from '../../../../protocols/http-client'
import { mockAxios } from '../../../../infrastructure/http-client/axios/mocks'

import axios from 'axios'
import { datatype } from 'faker'

jest.mock('axios')

type SutTypes = {
  sut: AxiosAuthenticatedHttpClientAdapter
  accessTokenKey: string
  accessTokenName: string
  getAccessTokenUseCase: RecoverValueInStorageUseCaseSpy
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const accessTokenKey = datatype.uuid()
  const accessTokenName = datatype.uuid()
  const getAccessTokenUseCase = new RecoverValueInStorageUseCaseSpy()
  getAccessTokenUseCase.value = datatype.uuid()
  const sut = new AxiosAuthenticatedHttpClientAdapter(accessTokenKey, accessTokenName, getAccessTokenUseCase)
  const mockedAxios = mockAxios()
  return {
    sut,
    accessTokenKey,
    accessTokenName,
    getAccessTokenUseCase,
    mockedAxios
  }
}

describe('AxiosAuthenticatedHttpClientAdapter', () => {
  describe('Recover Access Token', () => {
    test('Should call GetAccessTokenUseCase with corret value', async () => {
      const { sut, getAccessTokenUseCase, accessTokenKey } = makeSut()
      const recoverValueSpy = jest.spyOn(getAccessTokenUseCase, 'recoverValue')
      await sut.request(mockHttpRequest())
      expect(recoverValueSpy).toHaveBeenCalledWith(accessTokenKey)
    })

    test('Should fails if GetAccessTokenUseCase fails', async () => {
      const { sut, getAccessTokenUseCase } = makeSut()
      jest.spyOn(getAccessTokenUseCase, 'recoverValue').mockRejectedValue(new Error())
      const promise = sut.request(mockHttpRequest())
      await expect(promise).rejects.toThrow()
    })
  })

  test('Should call axios with correct values', async () => {
    const request = mockHttpRequest()
    const { sut, mockedAxios, getAccessTokenUseCase, accessTokenName } = makeSut()

    await sut.request(request)

    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: request.url,
      data: request.body,
      headers: {
        [accessTokenName]: getAccessTokenUseCase.value,
        ...request.headers
      },
      method: request.method
    })
  })

  test('Should return correct response', async () => {
    const { sut, mockedAxios } = makeSut()

    const httpResponse = await sut.request(mockHttpRequest())
    const axiosResponse = await mockedAxios.request.mock.results[0].value

    expect(httpResponse).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    })
  })

  test('Should return correct error', async () => {
    const { sut, mockedAxios } = makeSut()
    const rejectedResponse = mockHttpResponse(mockErrorStatusCode())
    mockedAxios.request.mockRejectedValueOnce({
      response: {
        status: rejectedResponse.statusCode,
        data: rejectedResponse.body
      }
    })

    const httpResponse = await sut.request(mockHttpRequest())
    expect(httpResponse).toEqual({
      statusCode: rejectedResponse.statusCode,
      body: rejectedResponse.body
    })
  })
})
