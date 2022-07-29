import { RemoteUpdateEntityByIdUseCase } from './remote-update-entity-by-id.use-case'
import { EntityModel, mockEntityModel } from '../../../../domain/common'
import { HttpMethod, HttpStatusCode, HttpClientProtocolSpy, mockHttpResponse, mockHttpMethod, mockErrorStatusCode } from '../../../../protocols/http-client'
import { UnauthorizedError, UnexpectedError, UnprocessableEntityError, EntityNotFoundError, ConflictError } from '../../../../data/common/errors'
import { internet, database, datatype } from 'faker'

type sutTypes = {
  sut: RemoteUpdateEntityByIdUseCase<EntityModel, EntityModel>
  httpClient: HttpClientProtocolSpy
  endPoint: string
  entityName: string
  entityId: string
}

const makeSut = (method: HttpMethod): sutTypes => {
  const httpClient = new HttpClientProtocolSpy()
  httpClient.httpResponse = mockHttpResponse(HttpStatusCode.ok)
  const endPoint = internet.url()
  const entityName = database.column()
  const sut = new RemoteUpdateEntityByIdUseCase<EntityModel, EntityModel>(endPoint, httpClient, entityName, method)
  return {
    sut,
    endPoint,
    httpClient,
    entityName,
    entityId: datatype.uuid()
  }
}

describe('RemoteDeleteEntityUseCase', () => {
  describe('Http Method', () => {
    test('Should call HttpClient with correct protocol if method is undefined', async () => {
      const { sut, httpClient, entityId } = makeSut(undefined)
      await sut.updateById(entityId, mockEntityModel())
      expect(httpClient.httpRequest.method).toBe(HttpMethod.put)
    })

    test('Should call HttpClient with correct protocol if method is provided', async () => {
      const method = mockHttpMethod()
      const { sut, httpClient, entityId } = makeSut(method)
      await sut.updateById(entityId, mockEntityModel())
      expect(httpClient.httpRequest.method).toBe(method)
    })
  })

  test('Should call HttpClient with correct url', async () => {
    const { sut, httpClient, endPoint, entityId } = makeSut(mockHttpMethod())
    await sut.updateById(entityId, mockEntityModel())
    expect(httpClient.httpRequest.url).toBe(`${endPoint}/${entityId}`)
  })

  test('Should call HttpClient with correct body', async () => {
    const { sut, httpClient, entityId } = makeSut(mockHttpMethod())
    const request = mockEntityModel()
    await sut.updateById(entityId, request)
    expect(httpClient.httpRequest.body).toEqual(request)
  })

  test('Should return a entity if HttpClient returns ok status code', async () => {
    const { sut, httpClient, entityId } = makeSut(mockHttpMethod())
    const value = mockEntityModel()
    httpClient.httpResponse = mockHttpResponse(HttpStatusCode.ok, value)
    const result = await sut.updateById(entityId, mockEntityModel())
    expect(result).toEqual(value)
  })

  test('Should return UnauthorizedError if HttpClient returns Unauthorized status code', async () => {
    const { sut, httpClient, entityId } = makeSut(mockHttpMethod())
    httpClient.httpResponse = mockHttpResponse(HttpStatusCode.unauthorized)
    const responsePromise = sut.updateById(entityId, mockEntityModel())
    await expect(responsePromise).rejects.toThrowError(UnauthorizedError)
  })

  test('Should return EntityNotFoundError if HttpClient returns notFound status code', async () => {
    const { sut, httpClient, entityId } = makeSut(mockHttpMethod())
    httpClient.httpResponse = mockHttpResponse(HttpStatusCode.notFound)
    const responsePromise = sut.updateById(entityId, mockEntityModel())
    await expect(responsePromise).rejects.toThrowError(EntityNotFoundError)
  })

  test('Should return ConflictError if HttpClient returns Conflict status code', async () => {
    const { sut, httpClient, entityId } = makeSut(mockHttpMethod())
    httpClient.httpResponse = mockHttpResponse(HttpStatusCode.conflict)
    const responsePromise = sut.updateById(entityId, mockEntityModel())
    await expect(responsePromise).rejects.toThrowError(ConflictError)
  })

  test('Should return UnprocessableEntityError if HttpClient returns UnprocessableEntity status code', async () => {
    const { sut, httpClient, entityId } = makeSut(mockHttpMethod())
    httpClient.httpResponse = mockHttpResponse(HttpStatusCode.unprocessableEntity)
    const responsePromise = sut.updateById(entityId, mockEntityModel())
    await expect(responsePromise).rejects.toThrowError(UnprocessableEntityError)
  })

  test('Should return UnexpectedError if HttpClient returns other status code', async () => {
    const { sut, httpClient, entityId } = makeSut(mockHttpMethod())
    httpClient.httpResponse = mockHttpResponse(mockErrorStatusCode())
    const responsePromise = sut.updateById(entityId, mockEntityModel())
    await expect(responsePromise).rejects.toThrowError(UnexpectedError)
  })
})
