import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { TransactionCategoryModel } from '../../../domain/finance'
import { Button, ButtonType, Input, InputType, Switch, ToastType, useAuthentication, useRequestValidator, useService, useToast } from '../../../presentation/common'
import { makeTransactionCategoryFieldsValidations } from '../../../presentation/finance'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import { Flex, Heading } from '@chakra-ui/react'
import { useHistory, useParams } from 'react-router-dom'

type FormTransactionCategoryParams = {
  transaction_category_id?: string
}

export const FormTransactionCategoryPage: React.FC = () => {
  const formRef = useRef<FormHandles>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [formMessageError, setFormMessageError] = useState<Partial<TransactionCategoryModel>>(undefined)
  const [transactionCategory, setTransactionCategory] = useState<TransactionCategoryModel>(undefined)
  const fieldsValidation = makeTransactionCategoryFieldsValidations()
  const history = useHistory()
  const { accessSession } = useAuthentication()
  const { requestValidator } = useRequestValidator()
  const { create, getById, updateById } = useService()
  const toast = useToast()

  const { transaction_category_id: transactionCategoryId } = useParams<FormTransactionCategoryParams>()

  useEffect(() => {
    if (transactionCategoryId) {
      handleGetTransacationCategoryByParam()
    } else {
      setIsLoading(false)
    }
  }, [transactionCategoryId])

  const handleGetTransacationCategoryByParam = useCallback(async () => {
    if (transactionCategoryId) {
      const response = await getById<TransactionCategoryModel>({
        endPoint: '/finance/transaction-category',
        entityId: transactionCategoryId,
        entityName: 'TransactionCategory'
      })
      setTransactionCategory(response)
    } else {
      setTransactionCategory(undefined)
    }
    setIsLoading(false)
  }, [transactionCategoryId])

  const handleSubmitTransactionCategory = useCallback(async (data: Partial<TransactionCategoryModel>) => {
    const { name, credit, debit } = data
    const formatedData: Partial<TransactionCategoryModel> = {
      name,
      credit: credit.toString() === '1',
      debit: debit.toString() === '1',
      account_id: accessSession.account_id
    }
    const errors = requestValidator.validate(fieldsValidation, formatedData)
    if (errors) {
      const newFormMessageError: Partial<TransactionCategoryModel> = {}
      errors.forEach(({ path, message }) => {
        if (!newFormMessageError[path]) {
          newFormMessageError[path] = message
        }
      })
      setFormMessageError(newFormMessageError)
    } else {
      if (transactionCategoryId) {
        await updateById({
          endPoint: '/finance/transaction-category',
          entityName: 'TransactionCategory',
          entityId: transactionCategoryId,
          data: formatedData
        })
        toast.show({
          title: 'Sucesso',
          message: `Categoria de transação '${data.name}' atualizada com sucesso`,
          type: ToastType.Success
        })
      } else {
        await create({
          endPoint: '/finance/transaction-category',
          entityName: 'TransactionCategory',
          data: formatedData
        })
        toast.show({
          title: 'Sucesso',
          message: `Categoria de transação '${data.name}' criada com sucesso`,
          type: ToastType.Success
        })
      }
      history.push('/list-transaction-category')
    }
  }, [requestValidator, transactionCategoryId, accessSession])

  const handleFormTitle = useMemo(() =>
    <>
      <Heading>{transactionCategory ? `Edição da categoria de transação '${transactionCategory.name}'` : 'Cadastro de uma categoria de transação'}</Heading>
    </>
  , [transactionCategory])

  const handleInputs = useMemo(() =>
    <>
      <Input
        name='name'
        label='Nome da categoria'
        type={InputType.Text}
        placeholder='Informe o nome da categoria para ser cadastrada/atualizada'
        toolTip='Informe o nome da categoria para ser cadastrada/atualizada'
        defaultValue={transactionCategory?.name}
        fieldValidations={fieldsValidation}
        errorMessage={formMessageError?.name}
      />
      <Switch
        name='credit'
        label='Crédito'
        checkedValue='1'
        uncheckedValue='0'
        value={transactionCategory?.credit ? '1' : '0'}
      />
      <Switch
        name='debit'
        label='Débito'
        checkedValue='1'
        uncheckedValue='0'
        value={transactionCategory?.debit ? '1' : '0'}
      />
    </>
  , [formMessageError, fieldsValidation, transactionCategory])

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
        onClick={async () => history.push('/list-transaction-category')}
      />
    </Flex>
  , [formRef])

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
          onSubmit={handleSubmitTransactionCategory}
        >
          {handleInputs}
          {handleActionButtons}
        </Form>
      </Flex>
      }
    </>
  )
}
