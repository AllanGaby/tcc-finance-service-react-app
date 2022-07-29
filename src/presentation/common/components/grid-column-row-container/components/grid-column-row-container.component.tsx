import React, { useEffect, useMemo, useState } from 'react'
import { OrderDirection } from '../../../../../domain/common'
import { GridColumnRowContainerProps, GridColumnContent } from '../../../../common'
import { Flex, Show } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'
import QueryString from 'query-string'

type OrderParams = {
  order: string
  direction: OrderDirection
}

export const GridColumnRowContainer: React.FC<GridColumnRowContainerProps> = ({
  color,
  columns
}: GridColumnRowContainerProps) => {
  const gridColumnRowContainerWidth = columns.reduce((sum, column, index) => sum + column.width, 30) || 100
  const [columnToOrder, setColumnToOrder] = useState<string>(undefined)
  const [direction, setDirection] = useState<OrderDirection>(undefined)

  const location = useLocation()
  useEffect(() => {
    const queryParams = QueryString.parse(location.search) as OrderParams
    if (queryParams?.order) {
      setColumnToOrder(queryParams.order)
      setDirection(queryParams?.direction || OrderDirection.ASC)
    }
  }, [location])

  const handleColumns = useMemo(() =>
    <>
      {columns.map((item, index) =>
        <GridColumnContent
          key={index}
          {...item}
        />
      )}
    </>
  , [columns, columnToOrder, direction, location])

  const handleShowMd = useMemo(() =>
    <Show
      above='md'
    >
      <Flex
        width={`${gridColumnRowContainerWidth}px`}
        alignItems='stretch'
        backgroundColor={color}
        borderBottom={'1px solid gray'}
      >
        {handleColumns}
      </Flex>
    </Show>
  , [columns, columnToOrder, direction, location])

  const handleShowXd = useMemo(() =>
    <Show
      below='md'
    >
      <Flex
        width={'100%'}
        flexDirection={'column'}
        alignItems='stretch'
        backgroundColor={color}
        borderBottom={'1px solid gray'}
      >
        {handleColumns}
      </Flex>
    </Show>
  , [columns, columnToOrder, direction, location])

  return (
    <>
      {handleShowMd}
      {handleShowXd}
    </>
  )
}
