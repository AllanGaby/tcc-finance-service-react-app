import React, { useMemo, PropsWithChildren, Fragment } from 'react'
import { MenuProps, SideMenu, MenuBrand, ColorMode, MenuDrawer } from '../../../../common'
import {
  Flex,
  Spacer,
  useColorMode,
  Show,
  IconButton,
  useDisclosure,
  Menu as MenuChakra,
  MenuButton,
  MenuList,
  MenuItem,
  Button
} from '@chakra-ui/react'
import { HamburgerIcon, SunIcon, MoonIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { useAuthentication } from '../../../../common/hooks'
import { useLocation } from 'react-router-dom'

type MenuPropsWithChildren = PropsWithChildren<MenuProps>

export const Menu: React.FC<MenuPropsWithChildren> = ({
  items,
  brandTitle,
  children,
  onHandleMenuFooter,
  onHandleBrand = undefined,
  onHandleCustomHeader = undefined
}: MenuPropsWithChildren) => {
  const { toggleColorMode, colorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { logout, accessSession } = useAuthentication()
  const { pathname } = useLocation()

  const handleDarkThemeButton = useMemo(() =>
    colorMode === ColorMode.Light &&
    <IconButton
      aria-label='Change theme to Dark Theme'
      onClick={toggleColorMode}
      icon={<MoonIcon />}
    />
  , [colorMode])

  const handleUserButton = useMemo(() =>
    accessSession &&
    <Show
      above='md'
    >
      <MenuChakra>
        <MenuButton as={Button}>
          {accessSession.account_name}
          <ChevronDownIcon />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={logout}>Sair</MenuItem>
        </MenuList>
      </MenuChakra>
    </Show>
  , [accessSession])

  const handleLightThemeButton = useMemo(() =>
    colorMode === ColorMode.Dark &&
    <IconButton
      aria-label='Change theme to Light Theme'
      onClick={toggleColorMode}
      icon={<SunIcon />}
    />
  , [colorMode])

  const handleCustomHeader = useMemo(() =>
    onHandleCustomHeader &&
    <Fragment
      data-testid='menu-custom-header-container'
    >
      {onHandleCustomHeader()}
    </Fragment>
  , [onHandleCustomHeader])

  const handleHamburgerButton = useMemo(() =>
    items.length > 0 &&
    <Show
      below='md'
    >
      <IconButton
        aria-label='Menu'
        onClick={onOpen}
        icon={<HamburgerIcon/>}
      />
    </Show>
  , [items])

  const handleChildren = useMemo(() =>
    <Flex
      minWidth='max-content'
      height='calc(100vh - 60px)'
    >
      <SideMenu
        items={items}
      />
      <Show
        below='md'
      >
        <Flex
          minWidth='calc(100vw - 240px)'
          grow={2}
          height='calc(100vh - 80px)'
          padding={'20px'}
          border={'1px solid'}
          borderRadius={'8px'}
          margin={'0px 16px 16px 16px '}
          flexDirection={'column'}
          overflow={'auto'}
        >
          {children}
        </Flex>
      </Show>
      <Show
        above='md'
      >
        <Flex
          minWidth='calc(100vw - 240px)'
          maxWidth={items.length > 0 ? 'calc(100vw - 240px)' : '100vw'}
          grow={2}
          height='calc(100vh - 80px)'
          padding={'20px'}
          border={'1px solid'}
          borderRadius={'8px'}
          overflow={'auto'}
          margin={'0px 16px 16px 16px '}
          flexDirection={'column'}
        >
          {children}
        </Flex>
      </Show>
    </Flex>
  , [items, pathname, children])

  return (
    <Flex
      flexDirection={'column'}
      minWidth='max-content'
      minHeight='max-content'
    >
      <Flex
        minWidth='max-content'
        height='60px'
        alignItems='center'
        gap='2'
        padding='8px 36px'
      >
        {handleHamburgerButton}
        <MenuBrand title={brandTitle} onHandleTitle={onHandleBrand}/>
        <Spacer />
        {handleCustomHeader}
        {handleDarkThemeButton}
        {handleUserButton}
        {handleLightThemeButton}
      </Flex>
      {handleChildren}
      <MenuDrawer
        isOpen={isOpen}
        onClose={onClose}
        title='Finance Service'
        items={items}
        onHandleFooter={onHandleMenuFooter}
      />
    </Flex>
  )
}
