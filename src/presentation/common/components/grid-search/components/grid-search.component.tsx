import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { GridSearchProps, Input, SearchParamsModel } from '../../../../common'
import { Flex, IconButton, Show, Tooltip } from '@chakra-ui/react'
import { Form } from '@unform/web'
import { SearchIcon } from '@chakra-ui/icons'
import { FormHandles } from '@unform/core'
import { useHistory, useLocation } from 'react-router-dom'
import QueryString from 'query-string'

export const GridSearch: React.FC<GridSearchProps> = ({
  search = true,
  onHandleCustomHeaders = undefined
}: GridSearchProps) => {
  const [defaultValueToSearch, setDefaultValueToSearch] = useState<string>()
  const formRef = useRef<FormHandles>(undefined)
  const history = useHistory()
  const location = useLocation()
  useEffect(() => {
    const queryParams = QueryString.parse(location.search) as SearchParamsModel
    setDefaultValueToSearch(queryParams.search)
  }, [location])

  const handleFastSearch = useCallback((data: SearchParamsModel) => {
    const newParams = new URLSearchParams()
    if (data.search) {
      newParams.append('search', data.search)
    }
    history.push({
      search: newParams.toString()
    })
  }, [])

  const handleSearchIconButton = useCallback(() =>
    <Tooltip
      label='Pesquisa rápida'
    >
      <IconButton
        aria-label='search'
        onClick={() => formRef.current.submitForm()}
      >
        <SearchIcon/>
      </IconButton>
    </Tooltip>
  , [])

  const handleSearchForm = useMemo(() =>
    search &&
    <Form
      ref={formRef}
      onSubmit={handleFastSearch}
    >
      <Input
        name='search'
        placeholder='Pesquisar...'
        defaultValue={defaultValueToSearch}
        onHandleRightElement={handleSearchIconButton}
      />
    </Form>
  , [search, defaultValueToSearch])

  const handleCustomHeaders = useMemo(() =>
    onHandleCustomHeaders &&
  <>
    {onHandleCustomHeaders()}
  </>
  , [onHandleCustomHeaders])

  const handleShowMd = useMemo(() =>
    <Show
      above='md'
    >
      <Flex
        width={'100%'}
        justifyContent='space-between'
      >
        {handleSearchForm}
        {handleCustomHeaders}
      </Flex>
    </Show>
  , [])

  const handleShowXd = useMemo(() =>
    <Show
      below='md'
    >
      <Flex
        width={'100%'}
        flexDirection={'column'}
      >
        {handleSearchForm}
        {handleCustomHeaders}
      </Flex>
    </Show>
  , [onHandleCustomHeaders])

  return (
    <>
      {handleShowMd}
      {handleShowXd}
    </>
  )
}
