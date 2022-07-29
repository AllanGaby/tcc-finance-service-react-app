import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { CompanyModel, CompanyTypeModel } from '../../../domain/finance'
import { Button, ButtonType, Input, InputType, ToastType, useRequestValidator, useService, useToast, ModalSelect } from '../../../presentation/common'
import { makeCompanyFieldsValidations } from '../../../presentation/finance'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import { Flex, IconButton, Tooltip, useDisclosure } from '@chakra-ui/react'
import { useHistory, useParams } from 'react-router-dom'
import { SearchIcon } from '@chakra-ui/icons'

type FormCompanyParams = {
  company_id?: string
}

export const FormCompanyPage: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const formRef = useRef<FormHandles>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [formMessageError, setFormMessageError] = useState<Partial<CompanyModel>>(undefined)
  const [company, setCompany] = useState<CompanyModel>(undefined)
  const [companyType, setCompanyType] = useState<CompanyTypeModel>(undefined)
  const fieldsValidation = makeCompanyFieldsValidations()
  const history = useHistory()
  const { requestValidator } = useRequestValidator()
  const { create, getById, updateById } = useService()
  const toast = useToast()

  const { company_id: companyId } = useParams<FormCompanyParams>()

  useEffect(() => {
    if (companyId) {
      handleGetCompanyByParam()
    } else {
      setIsLoading(false)
    }
  }, [companyId])

  const handleSearchIconButton = useCallback(() =>
    <Tooltip
      label='Pesquisar tipos de empresa'
    >
      <IconButton
        aria-label='search'
        onClick={onOpen}
      >
        <SearchIcon/>
      </IconButton>
    </Tooltip>
  , [])

  const handleGetCompanyByParam = useCallback(async () => {
    if (companyId) {
      const response = await getById<CompanyModel>({
        endPoint: '/finance/company',
        entityId: companyId,
        entityName: 'Company'
      })
      setCompany(response)
      setCompanyType(response.company_type)
    } else {
      setCompany(undefined)
      setCompanyType(undefined)
    }
    setIsLoading(false)
  }, [companyId])

  const handleSubmitCompany = useCallback(async (data: Partial<CompanyModel>) => {
    data.company_type_id = companyType?.id
    const errors = requestValidator.validate(fieldsValidation, data)
    if (errors) {
      const newFormMessageError: Partial<CompanyModel> = {}
      errors.forEach(({ path, message }) => {
        if (!newFormMessageError[path]) {
          newFormMessageError[path] = message
        }
      })
      setFormMessageError(newFormMessageError)
    } else {
      if (companyId) {
        await updateById({
          endPoint: '/finance/company',
          entityName: 'Company',
          entityId: companyId,
          data
        })
        toast.show({
          title: 'Sucesso',
          message: `Empresa '${data.name}' atualizada com sucesso`,
          type: ToastType.Success
        })
      } else {
        await create({
          endPoint: '/finance/company',
          entityName: 'Company',
          data
        })
        toast.show({
          title: 'Sucesso',
          message: `Empresa '${data.name}' criada com sucesso`,
          type: ToastType.Success
        })
      }
      history.push('/list-company')
    }
  }, [requestValidator, companyId, companyType])

  const handleInputs = useMemo(() =>
    <>
      <Input
        name='name'
        label='Nome da Empresa'
        type={InputType.Text}
        placeholder='Informe o nome do empresa para ser cadastrada/atualizada'
        toolTip='Informe o nome do empresa para ser cadastrada/atualizada'
        defaultValue={company?.name}
        fieldValidations={fieldsValidation}
        errorMessage={formMessageError?.name}
      />
      <Flex
        alignItems={'flex-end'}
      >
        <Input
          name='company_type'
          label='Tipo da empresa'
          type={InputType.Text}
          defaultValue={companyType?.name}
          fieldValidations={fieldsValidation}
          placeholder='Informe o tipo da empresa para ser cadastrada/atualizada'
          toolTip='Informe o tipo da empresa para ser cadastrada/atualizada'
          errorMessage={formMessageError?.company_type_id}
          onHandleRightElement={handleSearchIconButton}
          isDisabled={true}
        />
      </Flex>
    </>
  , [formMessageError, fieldsValidation])

  const handleActionButtons = useMemo(() =>
    formRef &&
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
        onClick={async () => history.push('/list-company')}
      />
    </Flex>
  , [formRef])

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
          onSubmit={handleSubmitCompany}
        >
          {handleInputs}
          {handleActionButtons}
        </Form>
      </Flex>
      }
      <ModalSelect
        title='Selecione o tipo de empresa'
        columns={[{
          name: 'name',
          order: 'company_type.name',
          label: 'Nome do tipo de empresa',
          width: 340
        }]}
        onSelect={(entity => setCompanyType(entity as CompanyTypeModel))}
        listURL={'/finance/company-type'}
        onClose={onClose}
        isOpen={isOpen}
      />
    </>
  )
}
