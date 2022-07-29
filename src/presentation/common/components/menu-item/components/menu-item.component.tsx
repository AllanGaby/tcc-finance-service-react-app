import React, { useCallback, useMemo } from 'react'
import { MenuItemProps, ColorScheme } from '../../../../common'
import { Button, Tooltip } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'

export const MenuItem: React.FC<MenuItemProps> = ({
  isActive,
  isDisabled = false,
  title,
  path,
  onHandleMenuItem = undefined,
  onClick = undefined
}: MenuItemProps) => {
  const history = useHistory()

  const handleMenuItemClick = useCallback(async () => {
    if (onClick) {
      await onClick()
    }
    if (path) {
      history.push(path)
    }
  }, [onClick, path])

  const handleButtonMenuItem = useMemo(() => {
    if ((!title) && (!onHandleMenuItem)) {
      title = 'Menu Item'
    }
    return (
      title &&
      <Tooltip
        label={isDisabled ? 'O usuário não tem permissão para essa ação' : undefined}
      >
        <Button
          marginBottom={'8px'}
          key={`menu-item-${title}`}
          colorScheme={isActive ? ColorScheme.Blue : undefined}
          onClick={handleMenuItemClick}
          isDisabled={isDisabled}
        >
          {title}
        </Button>
      </Tooltip>
    )
  }, [title, onHandleMenuItem, onClick, path, isActive, isDisabled])

  return (
    <>
      {handleButtonMenuItem}
    </>
  )
}
