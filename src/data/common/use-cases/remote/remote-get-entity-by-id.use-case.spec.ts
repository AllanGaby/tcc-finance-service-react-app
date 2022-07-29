import { RemoteGetEntityByIdUseCase } from './remote-get-entity-by-id.use-case'
import { EntityModel, mockEntityModel } from '../../../../domain/common'
import { HttpClientProtocolSpy, mockErrorStatusCode, mockHttpResponse, HttpMethod, HttpStatusCode } from '../../../../protocols/http-client'
import { EntityNotFoundError, UnauthorizedError, UnexpectedError, UnprocessableEntityError } from '../../../../data/common/errors'
import { datatype, internet, database } from 'faker'

type sutTypes = {
  sut: RemoteGetEntityByIdUseCase<EntityModel>
  httpClient: HttpClientProtocolSpy
  endPoint: string
  entityName: string
}

const makeSut = (): sutTypes => {
  const httpClient = new HttpClientProtocolSpy()
  httpClient.httpResponse = mockHttpResponse(HttpStatusCode.ok, mockEntityModel())
  const endPoint = internet.url()
  const entityName = database.column()
  const sut = new RemoteGetEntityByIdUseCase<EntityModel>(endPoint, httpClient, entityName)
  return {
    sut,
    endPoint,
    httpClient,
    entityName
  }
}

describe('RemoteGetEntityByIdUseCase', () => {
  test('Should call HttpClient with correct protocol', async () => {
    const { sut, httpClient } = makeSut()
    await sut.getById(datatype.uuid())
    expect(httpClient.httpRequest.method).toBe(HttpMethod.get)
  })

  test('Should call HttpClient with correct url', async () => {
    const { sut, httpClient, endPoint } = makeSut()
    const entityId = datatype.uuid()
    await sut.getById(entityId)
    expect(httpClient.httpRequest.url).toBe(`${endPoint}/${entityId}`)
  })

  test('Should call HttpClient with correct body', async () => {
    const { sut, httpClient } = makeSut()
    await sut.getById(datatype.uuid())
    expect(httpClient.httpRequest.body).toEqual(undefined)
  })

  test('Should return entity if HttpClient returns ok status code', async () => {
    const { sut, httpClient } = makeSut()
    const entity = mockEntityModel()
    httpClient.httpResponse = mockHttpResponse(HttpStatusCode.ok, entity)
    const response = await sut.getById(datatype.uuid())
    expect(response).toEqual(entity)
  })

  test('Should return EntityNotFoundError if HttpClient returns notFound status code', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.httpResponse = mockHttpResponse(HttpStatusCode.notFound)
    const responsePromise = sut.getById(datatype.uuid())
    await expect(responsePromise).rejects.toThrowError(EntityNotFoundError)
  })

  test('Should return UnprocessableEntityError if HttpClient returns UnprocessableEntity status code', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.httpResponse = mockHttpResponse(HttpStatusCode.unprocessableEntity)
    const responsePromise = sut.getById(datatype.uuid())
    await expect(responsePromise).rejects.toThrowError(UnprocessableEntityError)
  })

  test('Should return UnauthorizedError if HttpClient returns Unauthorized status code', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.httpResponse = mockHttpResponse(HttpStatusCode.unauthorized)
    const responsePromise = sut.getById(datatype.uuid())
    await expect(responsePromise).rejects.toThrowError(UnauthorizedError)
  })

  test('Should return UnexpectedError if HttpClient returns other status code', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.httpResponse = mockHttpResponse(mockErrorStatusCode())
    const responsePromise = sut.getById(datatype.uuid())
    await expect(responsePromise).rejects.toThrowError(UnexpectedError)
  })
})
