import React, { useMemo, PropsWithChildren, useState, useCallback } from 'react'
import { ButtonProps, ButtonType, ColorScheme } from '../../../../common'
import { Button as ChakraButton, Tooltip } from '@chakra-ui/react'

type ButtonWithChildrenProps = PropsWithChildren<ButtonProps>

export const Button: React.FC<ButtonWithChildrenProps> = ({
  label,
  toolTip = undefined,
  loadingLabel = undefined,
  type = ButtonType.Primary,
  children = undefined,
  onClick = undefined
}: ButtonWithChildrenProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleOnClick = useCallback(async () => {
    if (onClick) {
      setIsLoading(true)
      await onClick()
      setIsLoading(false)
    }
  }, [onClick])

  const handleTitle = useMemo(() => {
    if ((!label) && (!children)) {
      label = 'Button'
    }
    return (
      <Tooltip
        label={toolTip}
      >
        <ChakraButton
          isLoading={isLoading}
          loadingText={loadingLabel}
          colorScheme={ColorScheme[type]}
          onClick={handleOnClick}
        >
          {label}
          {children}
        </ChakraButton>
      </Tooltip>
    )
  }
  , [label, children, type, onClick, isLoading, loadingLabel, toolTip])

  return (
    <>
      { handleTitle }
    </>
  )
}
