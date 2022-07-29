import React, { Fragment, useMemo } from 'react'
import { MenuDrawerProps, MenuItem, MenuDrawerPlacement, useAuthentication } from '../../../../common'
import {
  Show,
  Drawer,
  DrawerOverlay,
  DrawerBody,
  DrawerCloseButton,
  DrawerHeader,
  DrawerContent,
  DrawerFooter,
  Heading
} from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  onClose,
  title,
  onHandleTitle = undefined,
  onHandleFooter = undefined,
  onClick,
  items,
  placement = MenuDrawerPlacement.Left
}: MenuDrawerProps) => {
  const { pathname } = useLocation()
  const { logout, accessSession } = useAuthentication()

  const handleBrandTitle = useMemo(() =>
    title &&
    <Heading
      data-testid='menu-brand-brand-title'
      size='md'
      onClick={onClick}
    >
      {title}
    </Heading>
  , [title, onClick])

  const handleBrandTitleWithMethod = useMemo(() =>
    onHandleTitle &&
    <Fragment
      data-testid='menu-drawer-brand-title-with-method'
    >
      {onHandleTitle()}
    </Fragment>
  , [onHandleTitle])

  const handleDrawerFooter = useMemo(() =>
    onHandleFooter &&
    <>
      {onHandleFooter()}
    </>
  , [onHandleFooter])

  const handleDrawerBody = useMemo(() =>
    <DrawerBody
      display={'flex'}
      flexDirection={'column'}
    >
      {items.map(({ onClick = undefined, ...item }, index) =>
        <MenuItem
          key={`menu-drawer-item-${index}`}
          onClick={async () => {
            if (onClick) {
              await onClick()
            }
            onClose()
          }}
          {...item}
          isActive={pathname === item.path}
        />
      )}
    </DrawerBody>
  , [items, pathname])

  const handleLogoutButton = useMemo(() =>
    accessSession &&
    <MenuItem
      title='Sair'
      onClick={async () => {
        await logout()
        onClose()
      }}
    />
  , [accessSession])

  return (
    <Show
      below='md'
    >
      <Drawer
        isOpen={isOpen}
        placement={placement}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            {handleBrandTitle}
            {handleBrandTitleWithMethod}
          </DrawerHeader>
          {handleDrawerBody}
          <DrawerFooter
            data-testid='menu-drawer-footer'
          >
            {handleDrawerFooter}
            {handleLogoutButton}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Show>
  )
}
