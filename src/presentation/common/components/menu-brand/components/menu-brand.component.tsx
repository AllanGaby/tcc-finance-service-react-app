import React, { Fragment, useMemo } from 'react'
import { MenuBrandProps } from '../../../../common'
import { Box, Heading } from '@chakra-ui/react'

export const MenuBrand: React.FC<MenuBrandProps> = ({
  title,
  onHandleTitle = undefined,
  onClick
}: MenuBrandProps) => {
  const handleTitle = useMemo(() =>
    title &&
    <Heading
      data-testid='menu-brand-title'
      size='md'
      onClick={onClick}
    >
      {title}
    </Heading>
  , [title, onClick])

  const handleBrandTitleWithMethod = useMemo(() =>
    onHandleTitle &&
    <Fragment
      data-testid='menu-brand-title-with-method'
    >
      {onHandleTitle()}
    </Fragment>
  , [onHandleTitle])

  return (
    <Box p='2'>
      {handleBrandTitleWithMethod}
      {handleTitle}
    </Box>
  )
}
