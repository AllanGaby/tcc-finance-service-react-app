import React, { createContext, PropsWithChildren, useCallback, useContext } from 'react'
import { ToastContextModel, ToastMessage, ToastType, ToastPosition } from '../../../../common'
import { useToast as useToastChakra } from '@chakra-ui/react'

const ToastContext = createContext<ToastContextModel>({
  show: undefined
})

const ToastProvider: React.FC<PropsWithChildren> = ({
  children
}: PropsWithChildren) => {
  const toast = useToastChakra()

  const handleShowToast = useCallback(({
    title,
    message,
    type = ToastType.Information,
    position = ToastPosition.TopRight
  }: ToastMessage): void => {
    toast({
      title,
      position,
      description: message,
      status: type,
      duration: 9000,
      isClosable: true
    })
  }, [])

  return (
    <ToastContext.Provider
      value={{
        show: handleShowToast
      }}>
      {children}
    </ToastContext.Provider>
  )
}

const useToast = (): ToastContextModel => {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used within an ToastProvider')
  }

  return context
}

export { ToastProvider, useToast }
