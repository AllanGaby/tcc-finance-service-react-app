import { RemoteDeleteAccessSessionUseCase } from './remote-delete-access-session.use-case'
import { HttpMethod, HttpStatusCode, HttpClientProtocolSpy, mockErrorStatusCode, mockHttpResponse } from '../../../../protocols/http-client'
import { ConflictError, UnauthorizedError, UnexpectedError, UnprocessableEntityError } from '../../../../data/common/errors'
import { internet, database } from 'faker'

type sutTypes = {
  sut: RemoteDeleteAccessSessionUseCase
  httpAuthenticatedClient: HttpClientProtocolSpy
  endPoint: string
  entityName: string
}

const makeSut = (): sutTypes => {
  const httpAuthenticatedClient = new HttpClientProtocolSpy()
  httpAuthenticatedClient.httpResponse = mockHttpResponse(HttpStatusCode.noContent)
  const endPoint = internet.url()
  const entityName = database.column()
  const sut = new RemoteDeleteAccessSessionUseCase(endPoint, httpAuthenticatedClient, entityName)
  return {
    sut,
    endPoint,
    httpAuthenticatedClient,
    entityName
  }
}

describe('RemoteDeleteAccessSessionUseCase', () => {
  test('Should call HttpAuthenticatedClient with correct protocol', async () => {
    const { sut, httpAuthenticatedClient } = makeSut()
    await sut.deleteAccessSession()
    expect(httpAuthenticatedClient.httpRequest.method).toBe(HttpMethod.delete)
  })

  test('Should call HttpAuthenticatedClient with correct url', async () => {
    const { sut, httpAuthenticatedClient, endPoint } = makeSut()
    await sut.deleteAccessSession()
    expect(httpAuthenticatedClient.httpRequest.url).toBe(endPoint)
  })

  test('Should call HttpAuthenticatedClient with correct body', async () => {
    const { sut, httpAuthenticatedClient } = makeSut()
    await sut.deleteAccessSession()
    expect(httpAuthenticatedClient.httpRequest.body).toEqual(undefined)
  })

  test('Should return undefined if HttpAuthenticatedClient returns noContent status code', async () => {
    const { sut, httpAuthenticatedClient } = makeSut()
    httpAuthenticatedClient.httpResponse = mockHttpResponse(HttpStatusCode.noContent)
    const response = await sut.deleteAccessSession()
    expect(response).toBeFalsy()
  })

  test('Should return ConflictError if HttpAuthenticatedClient returns Conflict status code', async () => {
    const { sut, httpAuthenticatedClient } = makeSut()
    httpAuthenticatedClient.httpResponse = mockHttpResponse(HttpStatusCode.conflict)
    const responsePromise = sut.deleteAccessSession()
    await expect(responsePromise).rejects.toThrowError(ConflictError)
  })

  test('Should return UnprocessableEntityError if HttpAuthenticatedClient returns UnprocessableEntity status code', async () => {
    const { sut, httpAuthenticatedClient } = makeSut()
    httpAuthenticatedClient.httpResponse = mockHttpResponse(HttpStatusCode.unprocessableEntity)
    const responsePromise = sut.deleteAccessSession()
    await expect(responsePromise).rejects.toThrowError(UnprocessableEntityError)
  })

  test('Should return UnauthorizedError if HttpAuthenticatedClient returns Unauthorized status code', async () => {
    const { sut, httpAuthenticatedClient } = makeSut()
    httpAuthenticatedClient.httpResponse = mockHttpResponse(HttpStatusCode.unauthorized)
    const responsePromise = sut.deleteAccessSession()
    await expect(responsePromise).rejects.toThrowError(UnauthorizedError)
  })

  test('Should return UnexpectedError if HttpAuthenticatedClient returns other status code', async () => {
    const { sut, httpAuthenticatedClient } = makeSut()
    httpAuthenticatedClient.httpResponse = mockHttpResponse(mockErrorStatusCode())
    const responsePromise = sut.deleteAccessSession()
    await expect(responsePromise).rejects.toThrowError(UnexpectedError)
  })
})
