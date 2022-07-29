import { AxiosHttpClientAdapter } from './axios-http-client.protocol'
import { mockAxios } from '../../../../infrastructure/http-client/axios/mocks'
import { mockHttpRequest, mockHttpResponse } from '../../../../protocols/http-client'

import axios from 'axios'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClientAdapter
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClientAdapter()
  const mockedAxios = mockAxios()
  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpClientAdapter', () => {
  test('Should call axios with correct values', async () => {
    const request = mockHttpRequest()
    const { sut, mockedAxios } = makeSut()

    await sut.request(request)

    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: request.url,
      data: request.body,
      headers: request.headers,
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

  test('Should return correct error', () => {
    const { sut, mockedAxios } = makeSut()
    const rejectedResponse = mockHttpResponse()
    mockedAxios.request.mockRejectedValueOnce({
      response: {
        status: rejectedResponse.statusCode,
        data: rejectedResponse.body
      }
    })

    const promise = sut.request(mockHttpRequest())

    expect(promise).toEqual(mockedAxios.request.mock.results[0].value)
  })
})
