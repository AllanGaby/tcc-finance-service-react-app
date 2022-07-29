import React, { createContext, useContext, PropsWithChildren, useCallback } from 'react'
import { ListEntityModel } from '../../../../../domain/common'
import { HttpMethod, HttpResponse, HttpResponseType, HttpStatusCode } from '../../../../../protocols/http-client'
import { ConflictError, UnauthorizedError, UnexpectedError, UnprocessableEntityError } from '../../../../../data/common/errors'
import {
  ServiceContextModel,
  ServiceProviderModel,
  CreateServiceDTO,
  DeleteByIdServiceDTO,
  GetByIdServiceDTO,
  UpdateByIdServiceDTO,
  ListServiceDTO,
  DownloadServiceDTO,
  useAuthentication,
  useToast
} from '../../../../common'

const ServiceContext = createContext<ServiceContextModel>({
  create: undefined,
  deleteById: undefined,
  getById: undefined,
  list: undefined,
  updateById: undefined,
  download: undefined
})

export type ServiceProviderPropsWithChildren = PropsWithChildren<ServiceProviderModel>

const ServiceProvider: React.FC<ServiceProviderPropsWithChildren> = ({ children, httpClient, mapFilterToURLParamsUseCase, baseUrl }: ServiceProviderPropsWithChildren) => {
  const { logout } = useAuthentication()
  const toast = useToast()

  const handleAccessDenied = useCallback(async () => {
    await logout()
    toast.show({
      title: 'Sessão expirada',
      message: 'Sua sessão expirou, faça login novamente'
    })
  }, [])

  const handleGetResponse = useCallback(async <EntityType extends Object>(response: HttpResponse<EntityType>, entityName: string = 'EntityName'): Promise<EntityType> => {
    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body
      case HttpStatusCode.created:
        return response.body
      case HttpStatusCode.noContent:
        return undefined
      case HttpStatusCode.conflict:
        throw new ConflictError(entityName)
      case HttpStatusCode.unauthorized:
        throw new UnauthorizedError(response.body)
      case HttpStatusCode.forbidden: {
        await handleAccessDenied()
        return undefined
      }
      case HttpStatusCode.unprocessableEntity:
        throw new UnprocessableEntityError(response.body)
      default:
        throw new UnexpectedError(response.body)
    }
  }, [])

  const handleCreate = useCallback(async <EntityType extends Object, DTOType>(params: CreateServiceDTO<DTOType>): Promise<EntityType> => {
    const { endPoint, data, entityName } = params
    const response = await httpClient.request<EntityType>({
      method: HttpMethod.post,
      url: `${baseUrl}${endPoint}`,
      body: data
    })
    return handleGetResponse(response, entityName)
  }, [])

  const handleDeleteById = useCallback(async <DTOType extends Object>(params: DeleteByIdServiceDTO<DTOType>): Promise<void> => {
    const { endPoint, data, entityName, entityId } = params
    const response = await httpClient.request({
      method: HttpMethod.delete,
      url: `${baseUrl}${endPoint}/${entityId}`,
      body: data
    })
    return handleGetResponse(response, entityName)
  }, [])

  const handleUpdateById = useCallback(async <EntityType extends Object, DTOType>(params: UpdateByIdServiceDTO<DTOType>): Promise<EntityType> => {
    const { method = HttpMethod.put, endPoint, data, entityName, entityId } = params
    const response = await httpClient.request<EntityType>({
      method,
      url: `${baseUrl}${endPoint}/${entityId}`,
      body: data
    })
    return handleGetResponse(response, entityName)
  }, [])

  const handleList = useCallback(async <EntityType extends Object>(params: ListServiceDTO): Promise<ListEntityModel<EntityType>> => {
    const { endPoint, filter } = params
    const urlParams = mapFilterToURLParamsUseCase.map(filter)
    const response = await httpClient.request<ListEntityModel<EntityType>>({
      method: HttpMethod.get,
      url: `${baseUrl}${endPoint}${urlParams}`,
      body: undefined
    })
    return handleGetResponse<ListEntityModel<EntityType>>(response)
  }, [])

  const handleGetById = useCallback(async <EntityType extends Object>(params: GetByIdServiceDTO): Promise<EntityType> => {
    const { endPoint, entityName, entityId } = params
    const response = await httpClient.request<EntityType>({
      method: HttpMethod.get,
      url: `${baseUrl}${endPoint}/${entityId}`,
      body: undefined
    })
    return handleGetResponse(response, entityName)
  }, [])

  const handleDownload = useCallback(async ({
    endPoint,
    entityName,
    entityId,
    contentType
  }: DownloadServiceDTO): Promise<void> => {
    const entityParam = entityId ? `/${entityId}` : ''
    const url = `${baseUrl}${endPoint}${entityParam}`
    const response = await httpClient.request({
      method: HttpMethod.get,
      url,
      body: undefined,
      responseType: HttpResponseType.Blob
    })
    if (response.statusCode === HttpStatusCode.ok) {
      const content = new Blob([response.body], {
        type: contentType
      })
      window.location.href = window.URL.createObjectURL(content)
      return
    }
    return handleGetResponse(response, entityName)
  }, [])

  return (
    <ServiceContext.Provider
      value={{
        create: handleCreate,
        updateById: handleUpdateById,
        list: handleList,
        deleteById: handleDeleteById,
        getById: handleGetById,
        download: handleDownload
      }}>
      {children}
    </ServiceContext.Provider>
  )
}

const useService = (): ServiceContextModel => {
  const context = useContext(ServiceContext)

  if (!context) {
    throw new Error('useService must be used within a ServiceProvider')
  }

  return context
}

export { ServiceProvider, useService }
