import React, { useCallback } from 'react'
import { AuthenticationAccessRules } from '../../../domain/common'
import { FinanceAccountModel } from '../../../domain/finance'
import { GridColumn, Grid, Button, useService, useToast, ToastType, useAuthentication } from '../../../presentation/common'
import { FinanceAccountDescriptionType } from '../../../presentation/finance'
import { useHistory } from 'react-router-dom'
import { Divider, Flex, IconButton } from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'

export const ListFinanceAccountPage: React.FC = () => {
  const history = useHistory()
  const { hasAccess } = useAuthentication()
  const { deleteById } = useService()
  const toast = useToast()

  const handleGridCustomHeader = useCallback((): JSX.Element =>
    hasAccess(AuthenticationAccessRules.CreateFinanceAccount) &&
    <Button
      label='Cadastrar'
      toolTip='Cadastrar uma nova conta'
      onClick={async () => history.push('/create-finance-account')}
    />
  , [])

  const handleDeleteFinanceAccount = useCallback(async (financeAccount: FinanceAccountModel) => {
    await deleteById({
      endPoint: '/finance/finance-account',
      entityId: financeAccount.id,
      entityName: 'FinanceAccount'
    })
    toast.show({
      title: 'Sucesso',
      message: `Conta '${financeAccount.name}' excluída com sucesso`,
      type: ToastType.Warning
    })
    history.push('/list-finance-account')
  }, [])

  const handleEditButton = useCallback((financeAccount: FinanceAccountModel) =>
    hasAccess(AuthenticationAccessRules.UpdateFinanceAccount) &&
    <IconButton
      aria-label='edit'
      onClick={() => history.push(`/update-finance-account/${financeAccount.id}`)}
    >
      <EditIcon/>
    </IconButton>
  , [])

  const handleDeleteButton = useCallback((financeAccount: FinanceAccountModel) =>
    hasAccess(AuthenticationAccessRules.DeleteFinanceAccount) &&
    <IconButton
      aria-label='delete'
      onClick={async () => handleDeleteFinanceAccount(financeAccount)}
    >
      <DeleteIcon/>
    </IconButton>
  , [])

  const handleFinanceAccountType = useCallback((financeAccount: FinanceAccountModel, rowId: number): JSX.Element =>
    <>
      {FinanceAccountDescriptionType[financeAccount.type]}
    </>
  , [])

  const handleActionButtons = useCallback((financeAccount: FinanceAccountModel, rowId: number): JSX.Element =>
    <Flex>
      {handleEditButton(financeAccount)}
      <Divider
        orientation='vertical'
        margin={'0px 4px'}
      />
      {handleDeleteButton(financeAccount)}
    </Flex>
  , [])

  const columns: GridColumn[] = [{
    name: 'name',
    order: 'finance_account.name',
    label: 'Nome da conta',
    width: 300
  },
  {
    name: 'type',
    order: 'finance_account.type',
    label: 'Tipo da conta',
    width: 180,
    onHandleColumnContent: handleFinanceAccountType
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
      title='Lista de contas'
      onHandleCustomHeaders={handleGridCustomHeader}
      listURL='/finance/finance-account'
      columns={columns}
    />
  )
}
