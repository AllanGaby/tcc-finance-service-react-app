import React from 'react'
import {
  ToastProvider,
  AlertProvider,
  AuthenticationProvider,
  ServiceProvider,
  RequestValidatorProvider,
  LocalStorageProvider
} from '../../../../presentation/common'
import {
  makeMapFilterToURLParamsUseCase,
  makeRecoverValueInStorageUseCase,
  makeSetValueInStorageUseCase,
  makeCreateAccessSessionUseCase,
  makeDeleteAccessSessionUseCase,
  makeRecoverAccessSessionUseCase
} from '../../../factories/common'
//import { configurationSetup } from '../../../application'
import { HttpClientFactory } from '../../../../infrastructure/http-client'
import { RequestValidatorFactory } from '../../../../infrastructure/request-validator'

type AppProviderModel = {
  children?: JSX.Element
}

export const ProviderSetupFactory: React.FC<AppProviderModel> = ({ children }: AppProviderModel) => {    
  const readFileKey = (): string => {
    const fileContent = `MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAsDfbZtltC7UqZospZRqI QfXFaFGRekuh/OWHYe+Tz7ZYdWi1oahCnD2FKkJNtMVuMFyGLA/MuZB6kNCBYTxN 9XMixsThFberFxTHL7lILSzUrzqrWXqTaafx7tibvARNkLZZoJj2FkfOvaQvE8nk akwiag73l5+TH7u5Ajj5Ap85IV6ET0n8kkL0C3l2fhzTCUdF4x940xr9YwQqYk9K 7kJ8ocjK1NbYPiroWERPWQ3FuQEUDVQGFuQrbPKX5lHXoQC5H190bNI11AWwZmnx PAfVdIsWT1nTI2C+X6SBGStg6fJB6pUV3fFeQyH8iCxBLV8NLVE94XTdhSGoWc0F auU0Xu4SUzA6M8cVDc02QWOoyWOyNI4eS1aZXoZ1ecYs0UbcLOR5q0e2SuwFLoam UKf6u6G9TkX0hZCm9hxtbzrHrtc8wj9pIiI5x2tgxjM0TfTnPklKpkMuA6/hKz8I Qbg0u7qVbkEUo3vw2nah5vRa/PIgxOkR+jRspAqFWHF1xO7u8YXrpExefpJcAhTB T6vm56VWyxsJINTxVFJuSzlb/KF7YRTfRpsSddxR+hgDxTsXOhv+OJkgCBHWUha5 mXb3pXAtyGa4We2GjDu1KTqKBBG3JkCmykz+5YBlbgXsV5H7YkMgyVPNs21Hoful wnznecMpD6BuT5hEz9IgZmECAwEAAQ==` 
    let keyContent: string = ''
    fileContent.split(' ').filter(line => Boolean(line) && line !== '\n').forEach((lineContent, index) => {
      keyContent = `${keyContent}\n${lineContent.replace('\n', ' ')}`
    })
    keyContent = `-----BEGIN PUBLIC KEY-----${keyContent}\n-----END PUBLIC KEY-----\n`
    
    return keyContent
  }

  return (
    <ToastProvider>
      <AlertProvider>
        <LocalStorageProvider
          recoverValueInStorageUseCase={makeRecoverValueInStorageUseCase()}
          setValueInStorageUseCase={makeSetValueInStorageUseCase()}
        >
          <AuthenticationProvider
            accessTokenKey={'Authorization'}
            createAccessSessionUseCase={makeCreateAccessSessionUseCase({
              accessSessionURL: `http://206.189.199.14:3333/authentication/access-session`,
              publicKey: readFileKey()
            })}
            deleteAccessSessionUseCase={makeDeleteAccessSessionUseCase({
              accessSessionURL: `http://206.189.199.14:3333/authentication/access-session`,
              accessTokenKey: 'Authorization',
              accessTokenName: '@finance-service:token'
            })}
            recoverAccessSessionUseCase={makeRecoverAccessSessionUseCase({
              accessSessionURL: `http://206.189.199.14:3333/authentication/access-session`,
              accessTokenKey: 'Authorization',
              accessTokenName: '@finance-service:token'
            })}
          >
            <ServiceProvider
              httpClient={HttpClientFactory.GetHttpAuthenticatedClient({
                accessTokenKey: 'Authorization',
                accessTokenName: '@finance-service:token',
                getAccessTokenUseCase: makeRecoverValueInStorageUseCase()
              })}
              mapFilterToURLParamsUseCase={makeMapFilterToURLParamsUseCase()}
              baseUrl='http://206.189.199.14:3333'
            >
              <RequestValidatorProvider
                requestValidator={RequestValidatorFactory.GetRequestValidatorAdaper()}
              >
                {children}
              </RequestValidatorProvider>
            </ServiceProvider>
          </AuthenticationProvider>
        </LocalStorageProvider>
      </AlertProvider>
    </ToastProvider>
  )
}
