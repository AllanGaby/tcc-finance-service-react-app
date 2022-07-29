import React, { useCallback, useMemo } from 'react'
import { AuthenticationAccessRules } from '../../../domain/common'
import { FinanceTransactionModel } from '../../../domain/finance'
import { GridColumn, Grid, Button, useService, useToast, ToastType, useAuthentication } from '../../../presentation/common'
import { useHistory } from 'react-router-dom'
import { Divider, Flex, IconButton, Show } from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { HttpContentType } from '../../../protocols/http-client'

export const ListFinanceTransactionPage: React.FC = () => {
  const history = useHistory()
  const { hasAccess } = useAuthentication()
  const { deleteById, download } = useService()
  const toast = useToast()
  const handleDownloadFinanceTransactions = useCallback(async () => {
    await download({
      endPoint: '/finance/finance-transaction/xlsx/id,title,date,value',
      contentType: HttpContentType.xlsx,
      entityName: 'FinanceTransaction'
    })
  }, [])

  const handleGridCustomHeader = useCallback((): JSX.Element =>
    <>
      <Show
        above='md'
      >
        <Flex>
          {handleCustomHeaderActionButtons}
        </Flex>
      </Show>
      <Show
        below='md'
      >
        <Flex
          flexDirection={'column'}
        >
          {handleCustomHeaderActionButtons}
        </Flex>
      </Show>
    </>
  , [])

  const handleDeleteFinanceTransaction = useCallback(async (financeTransaction: FinanceTransactionModel) => {
    await deleteById({
      endPoint: '/finance/finance-transaction',
      entityId: financeTransaction.id,
      entityName: 'FinanceTransaction'
    })
    toast.show({
      title: 'Sucesso',
      message: `Transação '${financeTransaction.title}' excluída com sucesso`,
      type: ToastType.Warning
    })
    history.push('/list-finance-transaction')
  }, [])

  const handleEditButton = useCallback((financeTransaction: FinanceTransactionModel) =>
    hasAccess(AuthenticationAccessRules.UpdateFinanceTransaction) &&
    <IconButton
      aria-label='edit'
      onClick={() => history.push(`/update-finance-transaction/${financeTransaction.id}`)}
    >
      <EditIcon/>
    </IconButton>
  , [])

  const handleDeleteButton = useCallback((financeTransaction: FinanceTransactionModel) =>
    hasAccess(AuthenticationAccessRules.DeleteFinanceTransaction) &&
    <IconButton
      aria-label='delete'
      onClick={async () => handleDeleteFinanceTransaction(financeTransaction)}
    >
      <DeleteIcon/>
    </IconButton>
  , [])

  const handleFinanceAccountName = useCallback((financeTransaction: FinanceTransactionModel, rowId: number): JSX.Element =>
    <>
      {financeTransaction.finance_account.name}
    </>
  , [])

  const handleActionButtons = useCallback((financeTransaction: FinanceTransactionModel, rowId: number): JSX.Element =>
    <Flex>
      {handleEditButton(financeTransaction)}
      <Divider
        orientation='vertical'
        margin={'0px 4px'}
      />
      {handleDeleteButton(financeTransaction)}
    </Flex>
  , [])

  const handleCustomHeaderActionButtons = useMemo(() =>
    <>
      <Button
        label='Exportar'
        toolTip='Exportar as transações'
        onClick={handleDownloadFinanceTransactions}
      />
      {hasAccess(AuthenticationAccessRules.CreateFinanceTransaction) &&
        <Button
          label='Cadastrar'
          toolTip='Cadastrar uma nova transação'
          onClick={async () => history.push('/create-finance-transaction')}
        />}
    </>
  , [])

  const columns: GridColumn[] = [
    {
      name: 'finance_account',
      order: 'finance_account.name',
      label: 'Conta',
      width: 200,
      onHandleColumnContent: handleFinanceAccountName
    },
    {
      name: 'title',
      order: 'finance_transaction.title',
      label: 'Título',
      width: 300
    },
    {
      name: 'value',
      order: 'finance_transaction.value',
      label: 'Valor',
      width: 150,
      currency: true
    },
    {
      name: 'date',
      order: 'finance_transaction.date',
      label: 'Data',
      width: 180,
      date: true
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
      title='Lista de transações'
      onHandleCustomHeaders={handleGridCustomHeader}
      listURL='/finance/finance-transaction'
      columns={columns}
    />
  )
}
