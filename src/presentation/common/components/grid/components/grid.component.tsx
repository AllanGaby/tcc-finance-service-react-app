import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { OrderDirection } from '../../../../../domain/common'
import { GridProps, GridSearch, GridColumnHeaderContainer, GridColumnRowContainer, SearchParamsModel } from '../../../../common'
import { Flex, Heading } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'
import QueryString from 'query-string'
import { useService } from '../../../../common/hooks'

export const Grid: React.FC<GridProps> = ({
  search,
  listURL,
  entities = [],
  columns,
  title = undefined,
  onHandleCustomHeaders = undefined
}: GridProps) => {
  const [currentEntities, setCurrentEntities] = useState<Object[]>([])
  const [filter, setFilter] = useState<SearchParamsModel>(undefined)
  const location = useLocation()
  const { list } = useService()

  useEffect(() => {
    const queryParams = QueryString.parse(location.search) as SearchParamsModel
    setFilter({
      search: queryParams?.search || '',
      order: queryParams?.order || '',
      direction: queryParams?.direction || OrderDirection.ASC
    })
  }, [location])

  useEffect(() => {
    if ((!listURL) && (entities !== currentEntities)) {
      setCurrentEntities(entities)
    }
  }, [listURL, entities])

  useEffect(() => {
    handleGetEntitiesByListURL()
  }, [filter])

  const handleGetEntitiesByListURL = useCallback(async () => {
    if (listURL) {
      const listEntitiesData = await list({
        endPoint: listURL,
        entityName: 'Entity',
        filter: {
          orderColumn: filter?.order || undefined,
          orderDirection: filter?.direction as OrderDirection || OrderDirection.ASC,
          textToSearch: filter?.search || undefined,
          recordsPerPage: 9999
        }
      })
      setCurrentEntities(listEntitiesData.data)
    }
  }, [listURL, filter])

  const handleGridDataRows = useMemo(() =>
    currentEntities?.length > 0 &&
    <>
      {currentEntities.map((entity, index) => {
        return (
          <GridColumnRowContainer
            key={index}
            columns={columns.map(column => ({
              ...column,
              entity
            }))}
          />
        )
      })}
    </>
  , [currentEntities, columns])

  const handleEmptyMessage = useMemo(() =>
    (!currentEntities || currentEntities.length === 0) &&
    <Flex
      justifyContent={'center'}
      marginTop={'32px'}
    >
      <Heading as='h3' size='lg'>
        Nenhum dado encontrado na busca
      </Heading>
    </Flex>
  , [currentEntities])

  const handleGridContainer = useMemo(() =>
    <Flex
      alignItems='stretch'
      overflow='auto'
      width='100%'
      maxWidth={'calc(100vw-300px)'}
      flexGrow={1}
      flexDirection='column'
    >
      <GridColumnHeaderContainer
        color='gray'
        columns={columns}
      />
      {handleGridDataRows}
      {handleEmptyMessage}
    </Flex>
  , [filter, currentEntities, columns, listURL])

  const handleGridTitle = useMemo(() =>
    title &&
    <Heading as='h3' size='lg'>{title}</Heading>
  , [title])

  return (
    <>
      {handleGridTitle}
      <GridSearch search={search} onHandleCustomHeaders={onHandleCustomHeaders}/>
      {handleGridContainer}
    </>
  )
}
