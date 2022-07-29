import React, { useCallback } from 'react'
import { AuthenticationAccessRules } from '../../../domain/common'
import { TransactionCategoryModel } from '../../../domain/finance'
import { GridColumn, Grid, Button, useService, useToast, ToastType, useAuthentication, Switch } from '../../../presentation/common'
import { useHistory } from 'react-router-dom'
import { Divider, Flex, IconButton } from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { Form } from '@unform/web'

export const ListTransactionCategoryPage: React.FC = () => {
  const history = useHistory()
  const { hasAccess } = useAuthentication()
  const { deleteById } = useService()
  const toast = useToast()

  const handleGridCustomHeader = useCallback((): JSX.Element =>
    hasAccess(AuthenticationAccessRules.CreateTransactionCategory) &&
    <Button
      label='Cadastrar'
      toolTip='Cadastrar uma nova transação'
      onClick={async () => history.push('/create-transaction-category')}
    />
  , [])

  const handleDeleteTransactionCategory = useCallback(async (transactionCategory: TransactionCategoryModel) => {
    await deleteById({
      endPoint: '/finance/transaction-category',
      entityId: transactionCategory.id,
      entityName: 'TransactionCategory'
    })
    toast.show({
      title: 'Sucesso',
      message: `Categoria de transação '${transactionCategory.name}' excluída com sucesso`,
      type: ToastType.Warning
    })
    history.push('/list-transaction-category')
  }, [])

  const handleEditButton = useCallback((transactionCategory: TransactionCategoryModel) =>
    hasAccess(AuthenticationAccessRules.UpdateTransactionCategory) &&
    <IconButton
      aria-label='edit'
      onClick={() => history.push(`/update-transaction-category/${transactionCategory.id}`)}
    >
      <EditIcon/>
    </IconButton>
  , [])

  const handleDeleteButton = useCallback((transactionCategory: TransactionCategoryModel) =>
    hasAccess(AuthenticationAccessRules.DeleteTransactionCategory) &&
    <IconButton
      aria-label='delete'
      onClick={async () => handleDeleteTransactionCategory(transactionCategory)}
    >
      <DeleteIcon/>
    </IconButton>
  , [])

  const handleActionButtons = useCallback((transactionCategory: TransactionCategoryModel, rowId: number): JSX.Element =>
    <Flex>
      {handleEditButton(transactionCategory)}
      <Divider
        orientation='vertical'
        margin={'0px 4px'}
      />
      {handleDeleteButton(transactionCategory)}
    </Flex>
  , [])

  const handleCreditSwitch = useCallback((transactionCategory: TransactionCategoryModel, rowId: number): JSX.Element =>
    <Form
      onSubmit={undefined}
    >
      <Switch
        name='credit'
        label=''
        isDisabled={true}
        value={transactionCategory?.credit ? '1' : '0'}
      />
    </Form>
  , [])

  const handleDebitSwitch = useCallback((transactionCategory: TransactionCategoryModel, rowId: number): JSX.Element =>
    <Form
      onSubmit={undefined}
    >
      <Switch
        name='debit'
        label=''
        isDisabled={true}
        value={transactionCategory?.debit ? '1' : '0'}
      />
    </Form>
  , [])

  const columns: GridColumn[] = [{
    name: 'name',
    order: 'finance_transaction.name',
    label: 'Título',
    width: 300
  },
  {
    name: 'credit',
    order: 'finance_transaction.credit',
    label: 'Crédito',
    width: 150,
    onHandleColumnContent: handleCreditSwitch
  },
  {
    name: 'debit',
    order: 'finance_transaction.debit',
    label: 'Débito',
    width: 150,
    onHandleColumnContent: handleDebitSwitch
  },
  {
    name: 'actions',
    disableOrder: true,
    label: 'Ações',
    width: 100,
    onHandleColumnContent: handleActionButtons
  }]

  return (
    <Grid
      title='Lista de categorias de transações'
      onHandleCustomHeaders={handleGridCustomHeader}
      listURL='/finance/transaction-category'
      columns={columns}
    />
  )
}
