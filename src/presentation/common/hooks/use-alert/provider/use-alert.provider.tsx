import React, { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react'
import { AlertContextModel, AlertDialogProps, AlertDialog, AlertMessage } from '../../../../common'
import { AlertDialog as AlertDialogChakra, AlertDialogOverlay, useDisclosure } from '@chakra-ui/react'

const AlertContext = createContext<AlertContextModel>({
  show: undefined
})

const AlertProvider: React.FC<PropsWithChildren> = ({
  children
}: PropsWithChildren) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [alertDialogProps, setAlertDialogProps] = useState<AlertDialogProps>(undefined)

  const handleAlertDialogContent = useMemo(() =>
    alertDialogProps &&
    <AlertDialog {...alertDialogProps}/>
  , [alertDialogProps])

  const handleAlertDialog = useMemo(() =>
    <AlertDialogChakra
      motionPreset='slideInBottom'
      leastDestructiveRef={undefined}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />
      {handleAlertDialogContent}
    </AlertDialogChakra>
  , [isOpen, alertDialogProps])

  const handleShowAlert = useCallback((message: AlertMessage): void => {
    setAlertDialogProps({
      ...message,
      onClose: () => {
        onClose()
        setAlertDialogProps(undefined)
      }
    })
    onOpen()
  }, [])

  return (
    <AlertContext.Provider
      value={{
        show: handleShowAlert
      }}>
      {handleAlertDialog}
      {children}
    </AlertContext.Provider>
  )
}

const useAlert = (): AlertContextModel => {
  const context = useContext(AlertContext)

  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider')
  }

  return context
}

export { AlertProvider, useAlert }
