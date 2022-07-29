import React, { useCallback } from 'react'
import { AuthenticationAccessRules } from '../../../domain/common'
import { CompanyModel } from '../../../domain/finance'
import { GridColumn, Grid, Button, useService, useToast, ToastType, useAuthentication } from '../../../presentation/common'
import { useHistory } from 'react-router-dom'
import { Divider, Flex, IconButton } from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'

export const ListCompanyPage: React.FC = () => {
  const history = useHistory()
  const { hasAccess } = useAuthentication()
  const { deleteById } = useService()
  const toast = useToast()

  const handleGridCustomHeader = useCallback((): JSX.Element =>
    hasAccess(AuthenticationAccessRules.CreateCompany) &&
    <Button
      label='Cadastrar'
      toolTip='Cadastrar uma nova empresa'
      onClick={async () => history.push('/create-company')}
    />
  , [])

  const handleCompanyTypeData = useCallback((company: CompanyModel, rowId: number): JSX.Element =>
    <>
      {company.company_type?.name}
    </>
  , [])

  const handleDeleteCompany = useCallback(async (company: CompanyModel) => {
    await deleteById({
      endPoint: '/finance/company',
      entityId: company.id,
      entityName: 'Company'
    })
    toast.show({
      title: 'Sucesso',
      message: `Empresa '${company.name}' excluída com sucesso`,
      type: ToastType.Warning
    })
    history.push('/list-company')
  }, [])

  const handleEditButton = useCallback((company: CompanyModel) =>
    hasAccess(AuthenticationAccessRules.UpdateCompany) &&
    <IconButton
      aria-label='edit'
      onClick={() => history.push(`/update-company/${company.id}`)}
    >
      <EditIcon/>
    </IconButton>
  , [])

  const handleDeleteButton = useCallback((company: CompanyModel) =>
    hasAccess(AuthenticationAccessRules.DeleteCompany) &&
    <IconButton
      aria-label='delete'
      onClick={async () => handleDeleteCompany(company)}
    >
      <DeleteIcon/>
    </IconButton>
  , [])

  const handleActionButtons = useCallback((company: CompanyModel, rowId: number): JSX.Element =>
    <Flex>
      {handleEditButton(company)}
      <Divider
        orientation='vertical'
        margin={'0px 4px'}
      />
      {handleDeleteButton(company)}
    </Flex>
  , [])

  const columns: GridColumn[] = [{
    name: 'name',
    order: 'company.name',
    label: 'Nome da empresa',
    width: 350
  },
  {
    name: 'company_type',
    order: 'company_type.name',
    label: 'Tipo de empresa',
    width: 250,
    onHandleColumnContent: handleCompanyTypeData
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
      title='Lista de empresas'
      onHandleCustomHeaders={handleGridCustomHeader}
      listURL='/finance/company'
      columns={columns}
    />
  )
}
