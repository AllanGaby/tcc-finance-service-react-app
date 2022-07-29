import React from 'react'
import { SideMenuProps, MenuItem } from '../../../../common'
import { Flex, Show } from '@chakra-ui/react'

export const SideMenu: React.FC<SideMenuProps> = ({
  width = '200px',
  items = []
}: SideMenuProps) => {
  return (
    items.length > 0 &&
    <Show
      above='md'
    >
      <Flex
        flexDirection={'column'}
        width={width}
        paddingLeft={'16px'}
      >
        {items.map((item, index) =>
          <MenuItem
            key={`side-menu-item-${index}`}
            {...item}
            isActive={location.pathname === item.path}
          />
        )}
      </Flex>
    </Show>
  )
}
