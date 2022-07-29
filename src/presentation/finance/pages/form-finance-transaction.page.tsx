import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FinanceTransactionModel, CompanyTypeModel, CompanyModel, FinanceTransactionType, FinanceAccountModel, TransactionCategoryModel, TransactionTagModel, RequestTransactionTagFilter } from '../../../domain/finance'
import { Button, ButtonType, Input, InputType, ToastType, useRequestValidator, useService, useToast, ModalSelect, Select, SelectValue, useAuthentication, GridColumn, Grid } from '../../../presentation/common'
import { makeFinanceTransactionFieldsValidations, FinanceTransactionDescriptionType, makeTransactionTagFieldsValidations } from '../../../presentation/finance'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import { Flex, Heading, IconButton, Tooltip, useDisclosure } from '@chakra-ui/react'
import { useHistory, useParams } from 'react-router-dom'
import { AddIcon, DeleteIcon, SearchIcon } from '@chakra-ui/icons'
import { InputMaskFactory, InputMaskType } from '../../../infrastructure/input-mask'
import { CustomFilterConditional, CustomFilterOperator } from '../../../domain/common'

type FormFinanceTransactionParams = {
  finance_transaction_id?: string
}

type FinanceTransactionFormMessageError = {
  title?: string
  type?: string
  date?: string
  value?: string
  finance_account_id?: string
  company_id?: string
  transaction_category_id?: string
}

type TransactionTagFormMessageError = {
  tag?: string
}

export const FormFinanceTransactionPage: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const formRef = useRef<FormHandles>(undefined)
  const formTagRef = useRef<FormHandles>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [formMessageError, setFormMessageError] = useState<FinanceTransactionFormMessageError>(undefined)
  const [formTagMessageError, setFormTagMessageError] = useState<TransactionTagFormMessageError>(undefined)
  const [financeTransaction, setFinanceTransaction] = useState<FinanceTransactionModel>(undefined)
  const [companyType, setCompanyType] = useState<CompanyTypeModel>(undefined)
  const [company, setCompany] = useState<CompanyModel>(undefined)
  const [financeAccount, setFinanceAccount] = useState<FinanceAccountModel>(undefined)
  const [transactionCategory, setTransactionCategory] = useState<TransactionCategoryModel>(undefined)
  const [financeTransactionType, setFinanceTransactionType] = useState<FinanceTransactionType>(FinanceTransactionType.Debit)
  const [openCompanyTypeSelect, setOpenCompanyTypeSelect] = useState<boolean>(false)
  const [openCompanySelect, setOpenCompanySelect] = useState<boolean>(false)
  const [openFinanceAccountSelect, setOpenFinanceAccountSelect] = useState<boolean>(false)
  const [openTransactionCategorySelect, setOpenTransactionCategorySelect] = useState<boolean>(false)
  const [listTransactionTag, setListTransactionTag] = useState<Array<Partial<TransactionTagModel>>>(undefined)
  const fieldsValidation = makeFinanceTransactionFieldsValidations()
  const tagFieldsValidation = makeTransactionTagFieldsValidations()
  const history = useHistory()
  const { requestValidator } = useRequestValidator()
  const { create, getById, updateById, list } = useService()
  const toast = useToast()
  const { accessSession } = useAuthentication()

  const financeTransactionTypeList: SelectValue[] = Object.keys(FinanceTransactionDescriptionType).map<SelectValue>(key => ({
    value: key,
    label: FinanceTransactionDescriptionType[key]
  }))

  const handleDeleteButton = useCallback((transactionTag: TransactionTagModel) =>
    <IconButton
      aria-label='delete'
      onClick={() => {
        setListTransactionTag(oldList => oldList.filter(item => item.name.toLocaleLowerCase() !== transactionTag.name.toLocaleLowerCase()))
      }}
    >
      <DeleteIcon/>
    </IconButton>
  , [])

  const handleTagActionButtons = useCallback((transactionTag: TransactionTagModel, rowId: number): JSX.Element =>
    <Flex>
      {handleDeleteButton(transactionTag)}
    </Flex>
  , [])

  const tagColumns: GridColumn[] = [
    {
      name: 'name',
      label: 'Descrição',
      width: 300
    }, {
      name: 'actions',
      disableOrder: true,
      label: 'Ações',
      width: 50,
      onHandleColumnContent: handleTagActionButtons
    }]

  const { finance_transaction_id: financeTransactionId } = useParams<FormFinanceTransactionParams>()

  const handleAddNewTag = useCallback(async (data: Partial<TransactionTagModel>) => {
    const errors = requestValidator.validate(tagFieldsValidation, data)
    if (errors) {
      const newFormMessageError: TransactionTagFormMessageError = {}
      errors.forEach(({ path, message }) => {
        if (!newFormMessageError[path]) {
          newFormMessageError[path] = message
        }
      })
      setFormTagMessageError(newFormMessageError)
    } else {
      const tagExists = listTransactionTag?.find(tag => tag.name.toLocaleLowerCase() === data.name.toLocaleLowerCase())
      if (tagExists) {
        toast.show({
          type: ToastType.Warning,
          message: `Tag ${data.name} já adicionada`,
          title: 'Atenção'
        })
      } else {
        const tagByName = await list<TransactionTagModel>({
          endPoint: '/finance/transaction-tag',
          entityName: 'TransactionTag',
          filter: {
            filters: [{
              field: RequestTransactionTagFilter.Name,
              conditional: CustomFilterConditional.equal,
              operator: CustomFilterOperator.and,
              value: data.name
            }]
          }
        })
        if (tagByName.record_count > 0) {
          setListTransactionTag((oldList = []) => [
            ...oldList,
            tagByName.data[0]
          ])
        } else {
          setListTransactionTag((oldList = []) => [
            ...oldList,
            data
          ])
        }
      }
      formTagRef.current.clearField('name')
    }
  }, [listTransactionTag, tagFieldsValidation])

  const handleAddIconButtonToTagInput = useCallback(() =>
    <Tooltip
      label='Adicionar uma nova tag'
    >
      <IconButton
        aria-label='add'
        onClick={async () => formTagRef.current.submitForm()}
      >
        <AddIcon/>
      </IconButton>
    </Tooltip>
  , [])

  useEffect(() => {
    if (financeTransactionId) {
      handleGetFinanceTransactionByParam()
    } else {
      setIsLoading(false)
    }
  }, [financeTransactionId])

  const handleSearchIconButtonToCompanyInput = useCallback(() =>
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

  const handleSearchIconButtonToFinanceAccountInput = useCallback(() =>
    <Tooltip
      label='Pesquisar contas'
    >
      <IconButton
        aria-label='search'
        onClick={() => {
          setOpenFinanceAccountSelect(true)
          onOpen()
        }}
      >
        <SearchIcon/>
      </IconButton>
    </Tooltip>
  , [])

  const handleSearchIconButtonToTransactionCategoryInput = useCallback(() =>
    <Tooltip
      label='Pesquisar categorias'
    >
      <IconButton
        aria-label='search'
        onClick={() => {
          setOpenTransactionCategorySelect(true)
          onOpen()
        }}
      >
        <SearchIcon/>
      </IconButton>
    </Tooltip>
  , [])

  const handleGetFinanceTransactionByParam = useCallback(async () => {
    if (financeTransactionId) {
      const response = await getById<FinanceTransactionModel>({
        endPoint: '/finance/finance-transaction',
        entityId: financeTransactionId,
        entityName: 'FinanceTransaction'
      })
      setFinanceTransaction(response)
      setFinanceTransactionType(response.type)
      setCompany(response.company)
      setCompanyType(response.company?.company_type)
      setTransactionCategory(response.transaction_category)
      setFinanceAccount(response.finance_account)
      setListTransactionTag(response.transaction_tags)
    } else {
      setFinanceTransaction(undefined)
      setCompany(undefined)
      setFinanceTransactionType(FinanceTransactionType.Debit)
      setCompanyType(undefined)
      setTransactionCategory(undefined)
      setFinanceAccount(undefined)
      setListTransactionTag(undefined)
    }
    setIsLoading(false)
  }, [financeTransactionId])

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

  const handleSetFinanceAccount = useCallback((newFinanceAccount: FinanceAccountModel) => {
    setFinanceAccount(newFinanceAccount)
    onClose()
    setOpenFinanceAccountSelect(false)
  }, [onClose])

  const handleSetTransactionCategory = useCallback((newTransactionCategory: TransactionCategoryModel) => {
    setTransactionCategory(newTransactionCategory)
    onClose()
    setOpenTransactionCategorySelect(false)
  }, [onClose])

  const handleSubmitFinanceTransaction = useCallback(async (data: Partial<FinanceTransactionModel>) => {
    data.company_id = company?.id
    data.transaction_category_id = transactionCategory?.id
    data.finance_account_id = financeAccount?.id
    data.value = Number(
      data.value?.toString()
        .replace(/\D/g, '')
        .replace(/(\d)(\d{2})$/, '$1.$2')
    )
    const errors = requestValidator.validate(fieldsValidation, data)
    if (errors) {
      const newFormMessageError: FinanceTransactionFormMessageError = {}
      errors.forEach(({ path, message }) => {
        if (!newFormMessageError[path]) {
          newFormMessageError[path] = message
        }
      })
      setFormMessageError(newFormMessageError)
    } else {
      let financeTransactionIdToTags = financeTransactionId
      if (financeTransactionIdToTags) {
        await updateById({
          endPoint: '/finance/finance-transaction',
          entityName: 'FinanceTransaction',
          entityId: financeTransactionIdToTags,
          data
        })
        toast.show({
          title: 'Sucesso',
          message: `Transação '${data.title}' atualizada com sucesso`,
          type: ToastType.Success
        })
      } else {
        const createdFinanceTransaction = await create<FinanceTransactionModel, Partial<FinanceTransactionModel>>({
          endPoint: '/finance/finance-transaction',
          entityName: 'FinanceTransaction',
          data
        })
        financeTransactionIdToTags = createdFinanceTransaction.id
        toast.show({
          title: 'Sucesso',
          message: `Transação '${data.title}' criada com sucesso`,
          type: ToastType.Success
        })
      }
      if (listTransactionTag) {
        for (const transactionTag of listTransactionTag) {
          let transactionTagId = transactionTag.id
          if (!transactionTagId) {
            const newTransactionTag = await create<TransactionTagModel, Partial<TransactionTagModel>>({
              endPoint: '/finance/transaction-tag',
              entityName: 'TransactionTag',
              data: {
                name: transactionTag.name,
                account_id: accessSession.account_id
              }
            })
            transactionTagId = newTransactionTag.id
          }
          await create({
            endPoint: '/finance/finance-transaction-tag',
            entityName: 'FinanceTransactionTag',
            data: {
              finance_transaction_id: financeTransactionIdToTags,
              transaction_tag_id: transactionTagId
            }
          })
        }
      }
      history.push('/list-finance-transaction')
    }
  }, [requestValidator, financeTransactionId, financeTransactionType, accessSession, company, transactionCategory, financeAccount, listTransactionTag])

  const handleFormTitle = useMemo(() =>
    <>
      <Heading>{financeTransaction ? `Edição da transação '${financeTransaction.title}'` : 'Cadastro de uma transação'}</Heading>
    </>
  , [financeTransaction])

  const handleInputDate = useMemo(() => {
    let date: string
    if (financeTransaction?.date) {
      date = new Date(financeTransaction?.date).toISOString().substring(0, 10)
    }
    return (
      <Input
        name='date'
        label='Data'
        type={InputType.Date}
        placeholder='Informe a data da transação para ser cadastrada/atualizada'
        toolTip='Informe a data da transação para ser cadastrada/atualizada'
        defaultValue={date}
        fieldValidations={fieldsValidation}
        errorMessage={formMessageError?.date}
      />
    )
  }, [financeTransaction, formMessageError])

  const handleInputCurrency = useMemo(() => {
    const inputMask = InputMaskFactory.GetInputMaskAdaper(InputMaskType.Currency)
    let value: string
    if (financeTransaction?.value) {
      value = inputMask.mask((financeTransaction?.value || '0')?.toString()
        .replace(/\D/g, '')
        .replace(/(\d)(\d{2})$/, '$1.$2'))
    }
    return (
      <Input
        name='value'
        label='Valor'
        type={InputType.Text}
        inputMask={inputMask}
        placeholder='Informe o valor da transação para ser cadastrada/atualizada'
        toolTip='Informe o valor da transação para ser cadastrada/atualizada'
        defaultValue={value}
        fieldValidations={fieldsValidation}
        errorMessage={formMessageError?.value} />

    )
  }, [financeTransaction, formMessageError])

  const handleCompanyInput = useMemo(() =>
    <Input
      name='company'
      label='Nome da empresa'
      type={InputType.Text}
      defaultValue={company?.name}
      fieldValidations={fieldsValidation}
      placeholder='Informe o nome da empresa'
      toolTip='Informe o nome da empresa'
      errorMessage={formMessageError?.company_id}
      onHandleRightElement={handleSearchIconButtonToCompanyInput}
      isDisabled={true}
    />
  , [company])

  const handleFinanceAccountInput = useMemo(() =>
    <Input
      name='finance_account'
      label='Conta'
      type={InputType.Text}
      defaultValue={financeAccount?.name}
      fieldValidations={fieldsValidation}
      placeholder='Informe o nome da empresa'
      toolTip='Informe o nome da empresa'
      errorMessage={formMessageError?.finance_account_id}
      onHandleRightElement={handleSearchIconButtonToFinanceAccountInput}
      isDisabled={true}
    />
  , [financeAccount])

  const handleTransactionCategoryInput = useMemo(() =>
    <Input
      name='finance_account'
      label='Categoria'
      type={InputType.Text}
      defaultValue={transactionCategory?.name}
      fieldValidations={fieldsValidation}
      placeholder='Informe o nome da categoria'
      toolTip='Informe o nome da categoria'
      errorMessage={formMessageError?.transaction_category_id}
      onHandleRightElement={handleSearchIconButtonToTransactionCategoryInput}
      isDisabled={true}
    />
  , [transactionCategory])

  const handleInputs = useMemo(() =>
    <>
      {handleFinanceAccountInput}
      {handleTransactionCategoryInput}
      {financeTransactionType}
      <Input
        name='title'
        label='Descrição'
        type={InputType.Text}
        placeholder='Informe a descrição da transação para ser cadastrada/atualizada'
        toolTip='Informe a descrição da transação para ser cadastrada/atualizada'
        defaultValue={financeTransaction?.title}
        fieldValidations={fieldsValidation}
        errorMessage={formMessageError?.title}
      />
      <Select
        label='Tipo da transação'
        toolTip='Informe o tipo da transação para ser cadastrada/atualizada'
        name='type'
        options={financeTransactionTypeList}
        defaultValue={financeTransactionType}
        fieldValidations={fieldsValidation}
        onChangeValue={newFinanceType => {
          setFinanceTransactionType(newFinanceType.value as FinanceTransactionType)
        }}
      />
      {handleInputDate}
      {handleInputCurrency}
      {handleCompanyInput}
    </>
  , [formMessageError, fieldsValidation, financeTransactionType, company, financeAccount, transactionCategory])

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
        onClick={async () => history.push('/list-finance-transaction')}
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

  const handleFinanceAccountSelect = useMemo(() =>
    openFinanceAccountSelect &&
      <ModalSelect
        title='Selecione a conta'
        columns={[{
          name: 'name',
          label: 'Nome da conta',
          width: 340,
          disableOrder: false
        }]}
        onSelect={handleSetFinanceAccount}
        listURL='/finance/finance-account'
        onClose={onClose}
        isOpen={true}
      />
  , [openFinanceAccountSelect, onClose, financeAccount])

  const handleTransactionCategorySelect = useMemo(() =>
    openTransactionCategorySelect &&
      <ModalSelect
        title='Selecione a categoria'
        columns={[{
          name: 'name',
          label: 'Nome da categoria',
          width: 340,
          disableOrder: false
        }]}
        onSelect={handleSetTransactionCategory}
        listURL='/finance/transaction-category'
        onClose={onClose}
        isOpen={true}
      />
  , [openTransactionCategorySelect, onClose, transactionCategory])

  const handleTagGrid = useMemo(() =>
    listTransactionTag?.length > 0 &&
    <Grid
      search={false}
      entities={listTransactionTag}
      columns={tagColumns}
    />
  , [tagColumns, listTransactionTag])

  const handleFormTag = useMemo(() =>
    <Flex
      height={'500px'}
      alignItems={'center'}
      flexDirection={'column'}
      margin={'16px 0px'}
    >
      <Form
        style={{
          width: '100%',
          maxWidth: '500px'
        }}
        ref={formTagRef}
        onSubmit={handleAddNewTag}
      >
        <Input
          name='name'
          label='Tag'
          type={InputType.Text}
          placeholder='Informe a descrição da tag para ser cadastrada/atualizada'
          toolTip='Informe a descrição da tag para ser cadastrada/atualizada'
          fieldValidations={tagFieldsValidation}
          onHandleRightElement={handleAddIconButtonToTagInput}
          errorMessage={formTagMessageError?.tag}
        />
      </Form>
      {handleTagGrid}
    </Flex>
  , [tagFieldsValidation, formTagMessageError])

  const handleFormFinanceTransaction = useMemo(() =>
    <Form
      style={{
        width: '100%',
        maxWidth: '500px'
      }}
      ref={formRef}
      onSubmit={handleSubmitFinanceTransaction}
    >
      {handleInputs}
    </Form>
  , [financeAccount, companyType, transactionCategory, financeTransaction, formMessageError, listTransactionTag])

  const handleFormContainer = useMemo(() =>
    !isLoading &&
    <Flex
      alignItems={'center'}
      flexDirection={'column'}
      height={'100%'}
    >
      {handleFormTitle}
      {handleFormFinanceTransaction}
      {handleFormTag}
      {handleActionButtons}
    </Flex>
  , [isLoading, tagColumns, listTransactionTag, financeAccount, companyType, transactionCategory, financeTransaction])

  return (
    <>
      {handleFormContainer}
      {handleCompanyTypeSelect}
      {handleCompanySelect}
      {handleFinanceAccountSelect}
      {handleTransactionCategorySelect}
    </>
  )
}
