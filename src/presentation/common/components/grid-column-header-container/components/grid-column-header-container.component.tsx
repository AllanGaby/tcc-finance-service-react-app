import React, { useEffect, useMemo, useState } from 'react'
import { OrderDirection } from '../../../../../domain/common'
import { GridColumnHeaderContainerProps, GridColumnHeader } from '../../../../common'
import { Flex, Show } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'
import QueryString from 'query-string'

type OrderParams = {
  order: string
  direction: OrderDirection
}

export const GridColumnHeaderContainer: React.FC<GridColumnHeaderContainerProps> = ({
  color,
  columns
}: GridColumnHeaderContainerProps) => {
  const gridColumnHeaderContainerWidth = columns.reduce((sum, column, index) => sum + column.width, 30) || 100
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
      {columns.map(({ direction, ...item }, index) =>
        <GridColumnHeader
          key={index}
          {...item}
          direction={columnToOrder === item.name ? direction : undefined}
        />
      )}
    </>
  , [columns, columnToOrder, direction, location])

  return (
    <Show
      above='md'
    >
      <Flex
        width={`${gridColumnHeaderContainerWidth}px`}
        alignItems='stretch'
        backgroundColor={color}
        borderRadius={'8px'}
        position='sticky'
        top='0'
        zIndex={100}
      >
        {handleColumns}
      </Flex>
    </Show>
  )
}
