import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FinanceAccountModel, CompanyTypeModel, CompanyModel, FinanceAccountType } from '../../../domain/finance'
import { Button, ButtonType, Input, InputType, ToastType, useRequestValidator, useService, useToast, ModalSelect, Select, SelectValue, useAuthentication } from '../../../presentation/common'
import { makeFinanceAccountFieldsValidations, FinanceAccountDescriptionType } from '../../../presentation/finance'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import { Flex, Heading, IconButton, Tooltip, useDisclosure } from '@chakra-ui/react'
import { useHistory, useParams } from 'react-router-dom'
import { SearchIcon } from '@chakra-ui/icons'
import { InputMaskFactory, InputMaskType } from '../../../infrastructure/input-mask'

type FormFinanceAccountParams = {
  finance_account_id?: string
}

type FinanceAccountTypeModel = {
  value: string
  label: string
}

export const FormFinanceAccountPage: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const formRef = useRef<FormHandles>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [formMessageError, setFormMessageError] = useState<Partial<FinanceAccountModel>>(undefined)
  const [financeAccount, setFinanceAccount] = useState<FinanceAccountModel>(undefined)
  const [companyType, setCompanyType] = useState<CompanyTypeModel>(undefined)
  const [company, setCompany] = useState<CompanyModel>(undefined)
  const [financeAccountType, setFinanceAccountType] = useState<FinanceAccountType>(FinanceAccountType.Banking)
  const [openCompanyTypeSelect, setOpenCompanyTypeSelect] = useState<boolean>(false)
  const [openCompanySelect, setOpenCompanySelect] = useState<boolean>(false)
  const fieldsValidation = makeFinanceAccountFieldsValidations()
  const history = useHistory()
  const { requestValidator } = useRequestValidator()
  const { create, getById, updateById } = useService()
  const toast = useToast()
  const { accessSession } = useAuthentication()

  const financeAccountTypeList: SelectValue[] = Object.keys(FinanceAccountDescriptionType).map<FinanceAccountTypeModel>(key => ({
    value: key,
    label: FinanceAccountDescriptionType[key]
  }))

  const { finance_account_id: financeAccountId } = useParams<FormFinanceAccountParams>()

  useEffect(() => {
    if (financeAccountId) {
      handleGetFinanceAccountByParam()
    } else {
      setIsLoading(false)
    }
  }, [financeAccountId])

  const handleSearchIconButton = useCallback(() =>
    <Tooltip
      label='Pesquisar empresas'
    >
      <IconButton
        aria-label='search'
        onClick={() => {
          setOpenCompanyTypeSelect(true)
          onOpen()
        }}
      >
        <SearchIcon/>
      </IconButton>
    </Tooltip>
  , [])

  const handleGetFinanceAccountByParam = useCallback(async () => {
    if (financeAccountId) {
      const response = await getById<FinanceAccountModel>({
        endPoint: '/finance/finance-account',
        entityId: financeAccountId,
        entityName: 'FinanceAccount'
      })
      setFinanceAccount(response)
      setFinanceAccountType(response.type)
      setCompany(response.company)
      setCompanyType(response.company?.company_type)
    } else {
      setFinanceAccount(undefined)
      setCompany(undefined)
      setFinanceAccountType(FinanceAccountType.Banking)
      setCompanyType(undefined)
    }
    setIsLoading(false)
  }, [financeAccountId])

  const handleSetCompanyType = useCallback((newCompanyType: CompanyModel) => {
    setCompanyType(newCompanyType)
    onClose()
    setOpenCompanyTypeSelect(false)
    setOpenCompanySelect(true)
    onOpen()
  }, [onClose])

  const handleSetCompany = useCallback((newCompany: CompanyModel) => {
    setCompany(newCompany)
    onClose()
    setOpenCompanySelect(false)
  }, [onClose])

  const handleSubmitFinanceAccount = useCallback(async (data: Partial<FinanceAccountModel>) => {
    data.type = financeAccountType
    data.account_id = accessSession.account_id
    data.company_id = company?.id
    data.default_credit_value = Number(
      (data.default_credit_value || '0')?.toString()
        .replace(/\D/g, '')
        .replace(/(\d)(\d{2})$/, '$1.$2')
    )
    const errors = requestValidator.validate(fieldsValidation, data)
    if (errors) {
      const newFormMessageError: Partial<FinanceAccountModel> = {}
      errors.forEach(({ path, message }) => {
        if (!newFormMessageError[path]) {
          newFormMessageError[path] = message
        }
      })
      setFormMessageError(newFormMessageError)
    } else {
      if (financeAccountId) {
        await updateById({
          endPoint: '/finance/finance-account',
          entityName: 'FinanceAccount',
          entityId: financeAccountId,
          data
        })
        toast.show({
          title: 'Sucesso',
          message: `Empresa '${data.name}' atualizada com sucesso`,
          type: ToastType.Success
        })
      } else {
        await create({
          endPoint: '/finance/finance-account',
          entityName: 'FinanceAccount',
          data
        })
        toast.show({
          title: 'Sucesso',
          message: `Conta '${data.name}' criada com sucesso`,
          type: ToastType.Success
        })
      }
      history.push('/list-finance-account')
    }
  }, [requestValidator, financeAccountId, financeAccountType, accessSession, company])

  const handleFormTitle = useMemo(() =>
    <>
      <Heading>{financeAccount ? `Edição da conta '${financeAccount.name}'` : 'Cadastro de uma nova conta'}</Heading>
    </>
  , [financeAccount])

  const handleInputs = useMemo(() =>
    <>
      <Input
        name='name'
        label='Nome da conta'
        type={InputType.Text}
        placeholder='Informe o nome da conta para ser cadastrada/atualizada'
        toolTip='Informe o nome da conta para ser cadastrada/atualizada'
        defaultValue={financeAccount?.name}
        fieldValidations={fieldsValidation}
        errorMessage={formMessageError?.name}
      />
      <Select
        label='Tipo da conta'
        toolTip='Informe o tipo da conta para ser cadastrada/atualizada'
        name='type'
        options={financeAccountTypeList}
        defaultValue={financeAccountType}
        fieldValidations={fieldsValidation}
        onChangeValue={newFinanceType => setFinanceAccountType(newFinanceType.value as FinanceAccountType)}
      />
    </>
  , [formMessageError, fieldsValidation, financeAccountType])

  const handleCompanyInput = useMemo(() =>
    financeAccountType !== FinanceAccountType.Bill &&
    <Input
      name='company'
      label='Nome da empresa'
      type={InputType.Text}
      defaultValue={company?.name}
      fieldValidations={fieldsValidation}
      placeholder='Informe o nome da empresa'
      toolTip='Informe o nome da empresa'
      errorMessage={formMessageError?.company_id}
      onHandleRightElement={handleSearchIconButton}
      isDisabled={true}
    />
  , [financeAccountType, company])

  const handleCreditCardInputs = useMemo(() => {
    if (financeAccountType !== FinanceAccountType.CreditCard) {
      return undefined
    }
    let closingDate: string
    if (financeAccount?.closing_date) {
      closingDate = new Date(financeAccount?.closing_date).toISOString().substring(0, 10)
    }
    let dueDate: string
    if (financeAccount?.due_date) {
      dueDate = new Date(financeAccount?.due_date).toISOString().substring(0, 10)
    }
    return (
      <>
        <Input
          name='closing_date'
          label='Data de fechamento'
          type={InputType.Date}
          defaultValue={closingDate}
          fieldValidations={fieldsValidation}
          placeholder='Informe a data de fechamento da fatura'
          toolTip='Informe a data de fechamento da fatura'
        />
        <Input
          name='due_date'
          label='Data de fechamento'
          type={InputType.Date}
          defaultValue={dueDate}
          fieldValidations={fieldsValidation}
          placeholder='Informe a data de fechamento da fatura'
          toolTip='Informe a data de fechamento da fatura'
        />
      </>

    )
  }
  , [financeAccountType, financeAccount])

  const handleBenefitInputs = useMemo(() => {
    if (financeAccountType !== FinanceAccountType.Benefit) {
      return undefined
    }
    let creditDate: string
    if (financeAccount?.credit_date) {
      creditDate = new Date(financeAccount?.credit_date).toISOString().substring(0, 10)
    }
    let defaultCreditValue: string = ''
    const inputMask = InputMaskFactory.GetInputMaskAdaper(InputMaskType.Currency)
    if (financeAccount?.default_credit_value) {
      defaultCreditValue = inputMask.mask(financeAccount.default_credit_value.toString())
    }
    return (
      <>
        <Input
          name='credit_date'
          label='Data do crédito'
          type={InputType.Date}
          defaultValue={creditDate}
          fieldValidations={fieldsValidation}
          placeholder='Informe a data de recarga do crédito'
          toolTip='Informe a data de recarga do crédito'
        />
        <Input
          name='default_credit_value'
          label='Valor do crédito'
          type={InputType.Text}
          inputMask={inputMask}
          defaultValue={defaultCreditValue}
          fieldValidations={fieldsValidation}
          placeholder='Informe o valor do crédito'
          toolTip='Informe o valor do crédito'
        />
      </>

    )
  }
  , [financeAccountType, financeAccount])

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
        onClick={async () => history.push('/list-finance-account')}
      />
    </Flex>
  , [formRef])

  const handleCompanyTypeSelect = useMemo(() =>
    openCompanyTypeSelect &&
    <ModalSelect
      title='Selecione o tipo de empresa'
      columns={[{
        name: 'name',
        order: 'company_type.name',
        label: 'Tipo da empresa',
        width: 340
      }]}
      onSelect={handleSetCompanyType}
      listURL={'/finance/company-type'}
      onClose={onClose}
      isOpen={isOpen}
    />
  , [openCompanyTypeSelect, onClose, isOpen])

  const handleCompanySelect = useMemo(() =>
    openCompanySelect &&
      companyType &&
      <ModalSelect
        title='Selecione a empresa'
        columns={[{
          name: 'name',
          label: 'Nome da empresa',
          width: 340,
          disableOrder: false
        }]}
        onSelect={handleSetCompany}
        entities={companyType.companies}
        onClose={onClose}
        isOpen={true}
        search={false}
      />
  , [openCompanySelect, onClose, companyType])

  return (
    <>
      {!isLoading &&
      <Flex
        alignItems={'center'}
        flexDirection={'column'}
        height={'100%'}
      >
        {handleFormTitle}
        <Form
          style={{
            width: '100%',
            maxWidth: '500px'
          }}
          ref={formRef}
          onSubmit={handleSubmitFinanceAccount}
        >
          {handleInputs}
          {handleCompanyInput}
          {handleCreditCardInputs}
          {handleBenefitInputs}
          {handleActionButtons}
        </Form>
      </Flex>
      }
      {handleCompanyTypeSelect}
      {handleCompanySelect}
    </>
  )
}
