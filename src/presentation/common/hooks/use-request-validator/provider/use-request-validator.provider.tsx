import React, { createContext, PropsWithChildren, useCallback, useContext } from 'react'
import { RequestValidatorContextType, RequestValidatorProviderProps } from '../../../../common/hooks'
import { FieldValidationModel } from '@/protocols/request-validator'

const RequestValidatorContext = createContext<RequestValidatorContextType>({
  requestValidator: undefined,
  getFieldValidation: undefined,
  getFieldsValidations: undefined
})

export type RequestValidatorProviderPropsWithChildren = PropsWithChildren<RequestValidatorProviderProps>

const RequestValidatorProvider: React.FC<RequestValidatorProviderPropsWithChildren> = ({
  children,
  requestValidator
}: RequestValidatorProviderPropsWithChildren) => {
  const handleGetFieldValidation = useCallback((field: string, entityFieldsValidation: FieldValidationModel[]): FieldValidationModel => {
    return entityFieldsValidation.find(fieldValidation => fieldValidation.name === field)
  }, [])

  const handleGetsFieldsValidation = useCallback((fields: string[], entityFieldsValidation: FieldValidationModel[]): FieldValidationModel[] => {
    return entityFieldsValidation.filter(fieldValidation => fields.includes(fieldValidation.name))
  }, [])

  return (
    <RequestValidatorContext.Provider
      value={{
        requestValidator,
        getFieldValidation: handleGetFieldValidation,
        getFieldsValidations: handleGetsFieldsValidation
      }}>
      {children}
    </RequestValidatorContext.Provider>
  )
}

const useRequestValidator = (): RequestValidatorContextType => {
  const context = useContext(RequestValidatorContext)

  if (!context) {
    throw new Error('useRequestValidator must be used within an RequestValidatorProvider')
  }

  return context
}

export { RequestValidatorProvider, useRequestValidator }
