import { RemoteListEntitiesUseCase } from './remote-list-entities.use-case'
import { EntityModel, mockListEntitiesDTO, MapFilterToURLParamsUseCaseSpy, OrderDirection, mockOrderDirection, ListEntitiesDTO } from '../../../../domain/common'
import { HttpClientProtocolSpy, mockErrorStatusCode, mockHttpResponse, HttpMethod, HttpStatusCode } from '../../../../protocols/http-client'
import { UnauthorizedError, UnexpectedError, UnprocessableEntityError, EntityNotFoundError } from '../../../../data/common/errors'
import { internet, database, datatype } from 'faker'

type sutTypes = {
  sut: RemoteListEntitiesUseCase<EntityModel>
  httpClient: HttpClientProtocolSpy
  endPoint: string
  mapFilterToURLParamsUseCase: MapFilterToURLParamsUseCaseSpy
  entityName: string
  orderDefault: string
  directionDefault: OrderDirection
}

const makeSut = (): sutTypes => {
  const httpClient = new HttpClientProtocolSpy()
  httpClient.httpResponse = mockHttpResponse(HttpStatusCode.ok)
  const endPoint = internet.url()
  const mapFilterToURLParamsUseCase = new MapFilterToURLParamsUseCaseSpy()
  const entityName = database.column()
  const orderDefault = database.column()
  const directionDefault = mockOrderDirection()
  const sut = new RemoteListEntitiesUseCase<EntityModel>(endPoint, httpClient, mapFilterToURLParamsUseCase, entityName, orderDefault, directionDefault)
  return {
    sut,
    endPoint,
    httpClient,
    mapFilterToURLParamsUseCase,
    entityName,
    orderDefault,
    directionDefault
  }
}

describe('RemoteListEntitiesUseCase', () => {
  describe('Map URL Params', () => {
    test('Should call MapFilterToURLParamsUseCase with correct values if order and direction is provided', async () => {
      const { sut, mapFilterToURLParamsUseCase } = makeSut()
      const mapSpy = jest.spyOn(mapFilterToURLParamsUseCase, 'map')
      const filter = mockListEntitiesDTO()
      const expectedFilter: ListEntitiesDTO = {
        ...filter
      }
      await sut.list(filter)
      expect(mapSpy).toHaveBeenCalledWith(expectedFilter)
    })

    test('Should call MapFilterToURLParamsUseCase with correct values if order is not provided', async () => {
      const { sut, mapFilterToURLParamsUseCase, orderDefault } = makeSut()
      const mapSpy = jest.spyOn(mapFilterToURLParamsUseCase, 'map')
      const filter = mockListEntitiesDTO()
      const expectedFilter: ListEntitiesDTO = {
        ...filter,
        orderColumn: orderDefault
      }
      delete filter.orderColumn
      await sut.list(filter)
      expect(mapSpy).toHaveBeenCalledWith(expectedFilter)
    })

    test('Should call MapFilterToURLParamsUseCase with correct values if direction is not provided', async () => {
      const { sut, mapFilterToURLParamsUseCase, directionDefault } = makeSut()
      const mapSpy = jest.spyOn(mapFilterToURLParamsUseCase, 'map')
      const filter = mockListEntitiesDTO()
      const expectedFilter: ListEntitiesDTO = {
        ...filter,
        orderDirection: directionDefault
      }
      delete filter.orderDirection
      await sut.list(filter)
      expect(mapSpy).toHaveBeenCalledWith(expectedFilter)
    })
  })

  test('Should call HttpClient with correct method', async () => {
    const { sut, httpClient } = makeSut()
    await sut.list(mockListEntitiesDTO())
    expect(httpClient.httpRequest.method).toBe(HttpMethod.get)
  })

  test('Should call HttpClient with correct url if map return empty string', async () => {
    const { sut, httpClient, endPoint, mapFilterToURLParamsUseCase } = makeSut()
    jest.spyOn(mapFilterToURLParamsUseCase, 'map').mockReturnValue('')
    await sut.list(mockListEntitiesDTO())
    expect(httpClient.httpRequest.url).toBe(endPoint)
  })

  test('Should call HttpClient with correct url if map return any string', async () => {
    const { sut, httpClient, endPoint, mapFilterToURLParamsUseCase } = makeSut()
    const urlParams = datatype.uuid()
    jest.spyOn(mapFilterToURLParamsUseCase, 'map').mockReturnValue(urlParams)
    await sut.list(mockListEntitiesDTO())
    expect(httpClient.httpRequest.url).toBe(`${endPoint}${urlParams}`)
  })

  test('Should call HttpClient with correct body', async () => {
    const { sut, httpClient } = makeSut()
    await sut.list(mockListEntitiesDTO())
    expect(httpClient.httpRequest.body).toEqual(undefined)
  })

  test('Should return EntityNotFoundError if HttpClient returns notFound status code', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.httpResponse = mockHttpResponse(HttpStatusCode.notFound)
    const responsePromise = sut.list(mockListEntitiesDTO())
    await expect(responsePromise).rejects.toThrowError(EntityNotFoundError)
  })

  test('Should return UnprocessableEntityError if HttpClient returns UnprocessableEntity status code', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.httpResponse = mockHttpResponse(HttpStatusCode.unprocessableEntity)
    const responsePromise = sut.list(mockListEntitiesDTO())
    await expect(responsePromise).rejects.toThrowError(UnprocessableEntityError)
  })

  test('Should return UnauthorizedError if HttpClient returns Unauthorized status code', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.httpResponse = mockHttpResponse(HttpStatusCode.unauthorized)
    const responsePromise = sut.list(mockListEntitiesDTO())
    await expect(responsePromise).rejects.toThrowError(UnauthorizedError)
  })

  test('Should return UnexpectedError if HttpClient returns other status code', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.httpResponse = mockHttpResponse(mockErrorStatusCode())
    const responsePromise = sut.list(mockListEntitiesDTO())
    await expect(responsePromise).rejects.toThrowError(UnexpectedError)
  })
})
