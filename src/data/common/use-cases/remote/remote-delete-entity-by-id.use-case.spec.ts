import { RemoteDeleteEntityByIdUseCase } from './remote-delete-entity-by-id.use-case'
import { EntityModel, mockEntityModel } from '../../../../domain/common'
import { HttpMethod, HttpStatusCode, HttpClientProtocolSpy, mockErrorStatusCode, mockHttpResponse } from '../../../../protocols/http-client'
import { ConflictError, UnauthorizedError, UnexpectedError, UnprocessableEntityError } from '../../../../data/common/errors'
import { datatype, internet, database } from 'faker'

type sutTypes = {
  sut: RemoteDeleteEntityByIdUseCase<EntityModel, EntityModel>
  httpClient: HttpClientProtocolSpy
  endPoint: string
  entityName: string
}

const makeSut = (): sutTypes => {
  const httpClient = new HttpClientProtocolSpy()
  httpClient.httpResponse = mockHttpResponse(HttpStatusCode.noContent)
  const endPoint = internet.url()
  const entityName = database.column()
  const sut = new RemoteDeleteEntityByIdUseCase<EntityModel, EntityModel>(endPoint, httpClient, entityName)
  return {
    sut,
    endPoint,
    httpClient,
    entityName
  }
}

describe('RemoteDeleteEntityByIdUseCase', () => {
  test('Should call HttpClient with correct protocol', async () => {
    const { sut, httpClient } = makeSut()
    await sut.deleteById(datatype.uuid())
    expect(httpClient.httpRequest.method).toBe(HttpMethod.delete)
  })

  test('Should call HttpClient with correct url', async () => {
    const { sut, httpClient, endPoint } = makeSut()
    const entityId = datatype.uuid()
    await sut.deleteById(entityId)
    expect(httpClient.httpRequest.url).toBe(`${endPoint}/${entityId}`)
  })

  test('Should call HttpClient with correct body if params is not provided', async () => {
    const { sut, httpClient } = makeSut()
    await sut.deleteById(datatype.uuid())
    expect(httpClient.httpRequest.body).toEqual(undefined)
  })

  test('Should call HttpClient with correct body if params is provided', async () => {
    const { sut, httpClient } = makeSut()
    const body = mockEntityModel()
    await sut.deleteById(datatype.uuid(), body)
    expect(httpClient.httpRequest.body).toEqual(body)
  })

  test('Should return undefined if HttpClient returns noContent status code', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.httpResponse = mockHttpResponse(HttpStatusCode.noContent)
    const response = await sut.deleteById(datatype.uuid())
    expect(response).toBeFalsy()
  })

  test('Should return ConflictError if HttpClient returns Conflict status code', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.httpResponse = mockHttpResponse(HttpStatusCode.conflict)
    const responsePromise = sut.deleteById(datatype.uuid())
    await expect(responsePromise).rejects.toThrowError(ConflictError)
  })

  test('Should return UnprocessableEntityError if HttpClient returns UnprocessableEntity status code', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.httpResponse = mockHttpResponse(HttpStatusCode.unprocessableEntity)
    const responsePromise = sut.deleteById(datatype.uuid())
    await expect(responsePromise).rejects.toThrowError(UnprocessableEntityError)
  })

  test('Should return UnauthorizedError if HttpClient returns Unauthorized status code', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.httpResponse = mockHttpResponse(HttpStatusCode.unauthorized)
    const responsePromise = sut.deleteById(datatype.uuid())
    await expect(responsePromise).rejects.toThrowError(UnauthorizedError)
  })

  test('Should return UnexpectedError if HttpClient returns other status code', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.httpResponse = mockHttpResponse(mockErrorStatusCode())
    const responsePromise = sut.deleteById(datatype.uuid())
    await expect(responsePromise).rejects.toThrowError(UnexpectedError)
  })
})
