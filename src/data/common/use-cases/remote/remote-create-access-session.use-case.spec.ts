import { EncryptMessageProtocolSpy } from '@/protocols/rsa'
import { HttpClientProtocolSpy, mockHttpResponse, HttpMethod, HttpStatusCode } from '../../../../protocols/http-client'
import { AccessTokenModel, mockAccessTokenModel, mockCreateAccessSessionDTO } from '../../../../domain/common'
import { RemoteCreateAccessSessionUseCase } from './remote-create-access-session.use-case'
import { UnauthorizedError, UnexpectedError, UnprocessableEntityError } from '../../../../data/common/errors'
import { internet, random } from 'faker'

type sutTypes = {
  sut: RemoteCreateAccessSessionUseCase
  encryptMessage: EncryptMessageProtocolSpy
  endPoint: string
  httpClient: HttpClientProtocolSpy
}

const makeSut = (): sutTypes => {
  const encryptMessage = new EncryptMessageProtocolSpy()
  const endPoint = internet.url()
  const httpClient = new HttpClientProtocolSpy()
  const sut = new RemoteCreateAccessSessionUseCase(encryptMessage, endPoint, httpClient)
  return {
    sut,
    encryptMessage,
    endPoint,
    httpClient
  }
}

describe('RemoteCreateAccessSessionUseCase', () => {
  test('Should call EncryptMessage with correct value', async () => {
    const { sut, encryptMessage } = makeSut()
    const param = mockCreateAccessSessionDTO()
    await sut.createAccessSession(param)
    expect(encryptMessage.payload).toBe(JSON.stringify(param))
  })

  test('Should call HttpClient with correct value', async () => {
    const { sut, httpClient, endPoint, encryptMessage } = makeSut()
    await sut.createAccessSession(mockCreateAccessSessionDTO())
    expect(httpClient.httpRequest).toEqual({
      url: endPoint,
      method: HttpMethod.post,
      body: {
        login_token: encryptMessage.result
      }
    })
  })

  test('Should return a session if HttpClient return created status code', async () => {
    const { sut, httpClient } = makeSut()
    const session = mockAccessTokenModel()
    httpClient.httpResponse = mockHttpResponse<AccessTokenModel>(HttpStatusCode.created, session)
    const response = await sut.createAccessSession(mockCreateAccessSessionDTO())
    expect(response).toEqual(session)
  })

  test('Should return a UnprocessableEntityError if HttpClient return unprocessableEntityError status code', async () => {
    const { sut, httpClient } = makeSut()
    const error = random.objectElement<Error>()
    httpClient.httpResponse = mockHttpResponse<AccessTokenModel | Error>(HttpStatusCode.unprocessableEntity, error)
    const promise = sut.createAccessSession(mockCreateAccessSessionDTO())
    await expect(promise).rejects.toThrowError(new UnprocessableEntityError(error))
  })

  test('Should return a UnexpectedError if HttpClient return serverError status code', async () => {
    const { sut, httpClient } = makeSut()
    const error = random.objectElement<Error>()
    httpClient.httpResponse = mockHttpResponse<AccessTokenModel | Error>(HttpStatusCode.serverError, error)
    const promise = sut.createAccessSession(mockCreateAccessSessionDTO())
    await expect(promise).rejects.toThrowError(new UnexpectedError(error))
  })

  test('Should return a UnauthorizedError if HttpClient return unauthorized status code', async () => {
    const { sut, httpClient } = makeSut()
    const error = random.objectElement<Error>()
    httpClient.httpResponse = mockHttpResponse<AccessTokenModel | Error>(HttpStatusCode.unauthorized, error)
    const promise = sut.createAccessSession(mockCreateAccessSessionDTO())
    await expect(promise).rejects.toThrowError(new UnauthorizedError(error))
  })
})
