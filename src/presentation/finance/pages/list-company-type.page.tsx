import React, { useCallback } from 'react'
import { AuthenticationAccessRules } from '../../../domain/common'
import { CompanyTypeModel } from '../../../domain/finance'
import { GridColumn, Grid, Button, useService, useToast, ToastType, useAuthentication } from '../../../presentation/common'
import { useHistory } from 'react-router-dom'
import { Divider, Flex, IconButton } from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'

export const ListCompanyTypePage: React.FC = () => {
  const history = useHistory()
  const { hasAccess } = useAuthentication()
  const { deleteById } = useService()
  const toast = useToast()

  const handleGridCustomHeader = useCallback((): JSX.Element =>
    hasAccess(AuthenticationAccessRules.CreateCompanyType) &&
    <Button
      label='Cadastrar'
      toolTip='Cadastrar um novo tipo de empresa'
      onClick={async () => history.push('/create-company-type')}
    />
  , [])

  const handleDeleteCompanyType = useCallback(async (company: CompanyTypeModel) => {
    await deleteById({
      endPoint: '/finance/company-type',
      entityId: company.id,
      entityName: 'CompanyType'
    })
    toast.show({
      title: 'Sucesso',
      message: `Tipo de empresa '${company.name}' excluído com sucesso`,
      type: ToastType.Warning
    })
    history.push('/list-company-type')
  }, [])

  const handleEditButton = useCallback((company: CompanyTypeModel) =>
    hasAccess(AuthenticationAccessRules.UpdateCompanyType) &&
    <IconButton
      aria-label='edit'
      onClick={() => history.push(`/update-company-type/${company.id}`)}
    >
      <EditIcon/>
    </IconButton>
  , [])

  const handleDeleteButton = useCallback((company: CompanyTypeModel) =>
    hasAccess(AuthenticationAccessRules.DeleteCompanyType) &&
    <IconButton
      aria-label='delete'
      onClick={async () => handleDeleteCompanyType(company)}
    >
      <DeleteIcon/>
    </IconButton>
  , [])

  const handleActionButtons = useCallback((company: CompanyTypeModel, rowId: number): JSX.Element =>
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
    order: 'company_type.name',
    label: 'Nome do tipo de empresa',
    width: 350
  },
  {
    name: 'companies_count',
    label: 'Quantidade de empresas',
    width: 250,
    disableOrder: true
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
      title='Lista de tipos de empresas'
      onHandleCustomHeaders={handleGridCustomHeader}
      listURL='/finance/company-type'
      columns={columns}
    />
  )
}
