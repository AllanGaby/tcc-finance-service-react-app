import { RemoteRecoverAccessSessionUseCase } from './remote-recover-access-session.use-case'
import { mockAccessSessionModel } from '../../../../domain/common'
import { HttpClientProtocolSpy, mockErrorStatusCode, mockHttpResponse, HttpMethod, HttpStatusCode } from '../../../../protocols/http-client'
import { EntityNotFoundError, UnauthorizedError, UnexpectedError, UnprocessableEntityError } from '../../../../data/common/errors'
import { internet, database } from 'faker'

type sutTypes = {
  sut: RemoteRecoverAccessSessionUseCase
  httpAuthenticatedClient: HttpClientProtocolSpy
  endPoint: string
  entityName: string
}

const makeSut = (): sutTypes => {
  const httpAuthenticatedClient = new HttpClientProtocolSpy()
  httpAuthenticatedClient.httpResponse = mockHttpResponse(HttpStatusCode.ok, mockAccessSessionModel())
  const endPoint = internet.url()
  const entityName = database.column()
  const sut = new RemoteRecoverAccessSessionUseCase(endPoint, httpAuthenticatedClient, entityName)
  return {
    sut,
    endPoint,
    httpAuthenticatedClient,
    entityName
  }
}

describe('RemoteRecoverAccessSessionUseCase', () => {
  test('Should call HttpAuthenticatedClient with correct protocol', async () => {
    const { sut, httpAuthenticatedClient } = makeSut()
    await sut.recoverAccessSession()
    expect(httpAuthenticatedClient.httpRequest.method).toBe(HttpMethod.get)
  })

  test('Should call HttpAuthenticatedClient with correct url', async () => {
    const { sut, httpAuthenticatedClient, endPoint } = makeSut()
    await sut.recoverAccessSession()
    expect(httpAuthenticatedClient.httpRequest.url).toBe(endPoint)
  })

  test('Should call HttpAuthenticatedClient with correct body', async () => {
    const { sut, httpAuthenticatedClient } = makeSut()
    await sut.recoverAccessSession()
    expect(httpAuthenticatedClient.httpRequest.body).toEqual(undefined)
  })

  test('Should return entity if HttpAuthenticatedClient returns ok status code', async () => {
    const { sut, httpAuthenticatedClient } = makeSut()
    const entity = mockAccessSessionModel()
    httpAuthenticatedClient.httpResponse = mockHttpResponse(HttpStatusCode.ok, entity)
    const response = await sut.recoverAccessSession()
    expect(response).toEqual(entity)
  })

  test('Should return EntityNotFoundError if HttpAuthenticatedClient returns notFound status code', async () => {
    const { sut, httpAuthenticatedClient } = makeSut()
    httpAuthenticatedClient.httpResponse = mockHttpResponse(HttpStatusCode.notFound)
    const responsePromise = sut.recoverAccessSession()
    await expect(responsePromise).rejects.toThrowError(EntityNotFoundError)
  })

  test('Should return UnprocessableEntityError if HttpAuthenticatedClient returns UnprocessableEntity status code', async () => {
    const { sut, httpAuthenticatedClient } = makeSut()
    httpAuthenticatedClient.httpResponse = mockHttpResponse(HttpStatusCode.unprocessableEntity)
    const responsePromise = sut.recoverAccessSession()
    await expect(responsePromise).rejects.toThrowError(UnprocessableEntityError)
  })

  test('Should return UnauthorizedError if HttpAuthenticatedClient returns Unauthorized status code', async () => {
    const { sut, httpAuthenticatedClient } = makeSut()
    httpAuthenticatedClient.httpResponse = mockHttpResponse(HttpStatusCode.unauthorized)
    const responsePromise = sut.recoverAccessSession()
    await expect(responsePromise).rejects.toThrowError(UnauthorizedError)
  })

  test('Should return UnexpectedError if HttpAuthenticatedClient returns other status code', async () => {
    const { sut, httpAuthenticatedClient } = makeSut()
    httpAuthenticatedClient.httpResponse = mockHttpResponse(mockErrorStatusCode())
    const responsePromise = sut.recoverAccessSession()
    await expect(responsePromise).rejects.toThrowError(UnexpectedError)
  })
})
