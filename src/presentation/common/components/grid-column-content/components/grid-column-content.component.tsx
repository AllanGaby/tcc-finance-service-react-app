import React, { useMemo } from 'react'
import { GridColumnContentProps } from '../../../../common'
import { Flex, Show, Text } from '@chakra-ui/react'
import { InputMaskFactory, InputMaskType } from '../../../../../infrastructure/input-mask'

export const GridColumnContent: React.FC<GridColumnContentProps> = ({
  name,
  label,
  entity,
  rowId = 0,
  width = 100,
  backgroundColor = undefined,
  date = false,
  currency = false,
  onHandleColumnContent = undefined
}: GridColumnContentProps) => {
  const currencyMask = InputMaskFactory.GetInputMaskAdaper(InputMaskType.Currency)

  const handleColumnDateContent = useMemo(() =>
    !onHandleColumnContent &&
    date &&
    entity[name] &&
    <>
      {new Date(entity[name].toString()).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' })}
    </>
  , [name, entity, date])

  const handleColumnCurrencyContent = useMemo(() =>
    !onHandleColumnContent &&
    currency &&
    entity[name] &&
    <>
      {currencyMask.mask(entity[name].toString()
        .replace(/\D/g, '')
        .replace(/(\d)(\d{2})$/, '$1.$2'))}
    </>
  , [name, entity, currency])

  const handleColumnContent = useMemo(() =>
    !onHandleColumnContent &&
    !date &&
    !currency &&
    <>
      {entity[name]?.toString()}
    </>
  , [name, entity, date, currency])

  const handleColumnContentWithMethod = useMemo(() =>
    onHandleColumnContent &&
    <>
      {onHandleColumnContent(entity, rowId)}
    </>
  , [onHandleColumnContent, entity, rowId])

  const handleContentMd = useMemo(() =>
    <Show
      above='md'
    >
      <Flex
        width={`${width}px`}
        padding={'8px'}
        cursor={'pointer'}
        alignItems={'center'}
        backgroundColor={backgroundColor}
      >
        {handleColumnContentWithMethod}
        {handleColumnContent}
        {handleColumnDateContent}
        {handleColumnCurrencyContent}
      </Flex>
    </Show>
  , [name, entity, date, currency])

  const handleContentXd = useMemo(() =>
    <Show
      below='md'
    >
      <Flex
        width={'100%'}
        alignContent={'center'}
        justifyContent={'space-between'}
        padding={'8px'}
        cursor={'pointer'}
        backgroundColor={backgroundColor}
      >
        <Text
          fontWeight={'bold'}
          marginRight={'8px'}
          alignSelf={'center'}
        >
          {label}
        </Text>
        {handleColumnContentWithMethod}
        {handleColumnContent}
        {handleColumnDateContent}
        {handleColumnCurrencyContent}
      </Flex>
    </Show>
  , [name, entity, date, currency])

  return (
    <>
      {handleContentMd}
      {handleContentXd}
    </>
  )
}
