import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { OrderDirection } from '../../../../../domain/common'
import { GridColumnHeaderProps, SearchParamsModel } from '../../../../common'
import { Flex } from '@chakra-ui/react'
import { ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons'
import { useHistory, useLocation } from 'react-router-dom'
import QueryString from 'query-string'

export const GridColumnHeader: React.FC<GridColumnHeaderProps> = ({
  name,
  label = name,
  order = name,
  width = 100,
  backgroundColor = undefined,
  disableOrder = false,
  onHandleColumnHeader = undefined,
  direction = undefined
}: GridColumnHeaderProps) => {
  const history = useHistory()
  const location = useLocation()

  const [currentDirection, setCurrentDirection] = useState<OrderDirection>(direction)

  useEffect(() => {
    if (currentDirection) {
      const queryParams = QueryString.parse(location.search) as SearchParamsModel
      const newParams = new URLSearchParams()
      if (queryParams.search) {
        newParams.append('search', queryParams.search)
      }
      newParams.append('order', order)
      newParams.append('direction', currentDirection)
      history.push({
        search: newParams.toString()
      })
    }
  }, [currentDirection, order, direction])

  const handleChangeColumnDirection = useCallback(() => {
    if (disableOrder) {
      return undefined
    }
    const newDirection: OrderDirection =
      currentDirection === OrderDirection.ASC
        ? OrderDirection.DESC
        : OrderDirection.ASC
    setCurrentDirection(newDirection)
  }, [currentDirection, disableOrder])

  const handleColumnLabel = useMemo(() =>
    !onHandleColumnHeader &&
    <>
      {label}
    </>
  , [label])

  const handleColumnHeaderWithMethod = useMemo(() =>
    onHandleColumnHeader &&
    <>
      {onHandleColumnHeader}
    </>
  , [onHandleColumnHeader])

  const handleAscDirectionIcon = useMemo(() =>
    !disableOrder &&
    currentDirection === OrderDirection.ASC &&
    <ArrowDownIcon/>
  , [disableOrder, currentDirection])

  const handleDescDirectionIcon = useMemo(() =>
    !disableOrder &&
    currentDirection === OrderDirection.DESC &&
    <ArrowUpIcon/>
  , [disableOrder, currentDirection])

  return (
    <Flex
      width={`${width}px`}
      padding={'8px'}
      cursor={'pointer'}
      justifyContent={'space-between'}
      alignItems={'center'}
      backgroundColor={backgroundColor}
      onClick={handleChangeColumnDirection}
    >
      {handleColumnHeaderWithMethod}
      {handleColumnLabel}
      {handleAscDirectionIcon}
      {handleDescDirectionIcon}
    </Flex>
  )
}
