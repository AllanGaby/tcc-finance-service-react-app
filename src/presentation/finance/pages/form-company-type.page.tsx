import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { CompanyTypeModel } from '../../../domain/finance'
import { Button, ButtonType, Input, InputType, ToastType, useRequestValidator, useService, useToast } from '../../../presentation/common'
import { makeCompanyTypeFieldsValidations } from '../../../presentation/finance'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import { Flex } from '@chakra-ui/react'
import { useHistory, useParams } from 'react-router-dom'

type FormCompanyTypeParams = {
  company_type_id?: string
}

export const FormCompanyTypePage: React.FC = () => {
  const formRef = useRef<FormHandles>(undefined)
  const fieldsValidation = makeCompanyTypeFieldsValidations()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [formMessageError, setFormMessageError] = useState<Partial<CompanyTypeModel>>(undefined)
  const [companyType, setCompanyType] = useState<CompanyTypeModel>(undefined)
  const history = useHistory()
  const { requestValidator } = useRequestValidator()
  const { create, getById, updateById } = useService()
  const toast = useToast()

  const { company_type_id: companyTypeId } = useParams<FormCompanyTypeParams>()

  useEffect(() => {
    if (companyTypeId) {
      handleGetCompanyTypeByParam()
    } else {
      setIsLoading(false)
    }
  }, [companyTypeId])

  const handleGetCompanyTypeByParam = useCallback(async () => {
    const response = await getById<CompanyTypeModel>({
      endPoint: '/finance/company-type',
      entityId: companyTypeId,
      entityName: 'CompanyType'
    })
    setCompanyType(response)
    setIsLoading(false)
  }, [companyTypeId])

  const handleCreateCompanyType = useCallback(async (data: Partial<CompanyTypeModel>) => {
    const errors = requestValidator.validate(fieldsValidation, data)
    if (errors) {
      const newFormMessageError: Partial<CompanyTypeModel> = {}
      errors.forEach(({ path, message }) => {
        if (!newFormMessageError[path]) {
          newFormMessageError[path] = message
        }
      })
      setFormMessageError(newFormMessageError)
    } else {
      if (companyTypeId) {
        await updateById({
          endPoint: '/finance/company-type',
          entityName: 'CompanyType',
          entityId: companyTypeId,
          data
        })
        toast.show({
          title: 'Sucesso',
          message: `Tipo de empresa '${data.name}' atualizado com sucesso`,
          type: ToastType.Success
        })
      } else {
        await create({
          endPoint: '/finance/company-type',
          entityName: 'CompanyType',
          data
        })
        toast.show({
          title: 'Sucesso',
          message: `Tipo de empresa '${data.name}' criado com sucesso`,
          type: ToastType.Success
        })
      }
      history.push('/list-company-type')
    }
  }, [requestValidator, companyTypeId])

  const handleInputs = useMemo(() =>
    <Input
      name='name'
      label='Nome do tipo de empresa'
      type={InputType.Text}
      placeholder='Informe o nome do tipo de empresa para ser cadastrado'
      toolTip='Informe o nome do tipo de empresa para ser cadastrado'
      defaultValue={companyType?.name}
      fieldValidations={fieldsValidation}
      errorMessage={formMessageError?.name}
    />
  , [formMessageError, fieldsValidation])

  return (
    <>
      {!isLoading &&
      <Flex
        justifyContent={'center'}
        height={'100%'}
      >
        <Form
          style={{
            width: '100%',
            maxWidth: '500px'
          }}
          ref={formRef}
          onSubmit={handleCreateCompanyType}
        >
          {handleInputs}
          <Flex
            justifyContent={'flex-end'}
          >
            <Button
              label='Salvar'
              loadingLabel='Salvando'
              onClick={async () => formRef.current.submitForm()}
            />
            <Button
              label='Cancelar'
              type={ButtonType.Error}
              onClick={async () => history.push('/list-company-type')}
            />
          </Flex>
        </Form>
      </Flex>
      }
    </>
  )
}
