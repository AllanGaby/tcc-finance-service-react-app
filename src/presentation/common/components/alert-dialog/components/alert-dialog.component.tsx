import React, { useCallback, useMemo } from 'react'
import { AlertDialogProps, Button } from 'presentation/common'
import { AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from '@chakra-ui/react'

export const AlertDialog: React.FC<AlertDialogProps> = ({
  title = undefined,
  message,
  onClose = undefined,
  confirmButton = undefined,
  cancelButton = undefined
}: AlertDialogProps) => {
  const handleOnClickConfirmButton = useCallback(async () => {
    if ((!confirmButton?.onClick) && (onClose)) {
      return undefined
    }
    await confirmButton.onClick()
    onClose()
  }, [confirmButton, onClose])

  const handleOnClickCancelButton = useCallback(async () => {
    if ((!cancelButton?.onClick) && (onClose)) {
      return undefined
    }
    await cancelButton.onClick()
    onClose()
  }, [cancelButton, onClose])

  const handleAlertTitle = useMemo(() =>
    title &&
    <AlertDialogHeader>
      {title}
    </AlertDialogHeader>
  , [title])

  const handleAlertBody = useMemo(() =>
    message &&
    <AlertDialogBody>
      {message}
    </AlertDialogBody>
  , [message])

  const handleCancelButton = useMemo(() =>
    cancelButton &&
    <Button
      {...cancelButton}
      onClick={handleOnClickCancelButton}
    />
  , [cancelButton])

  const handleConfirmButton = useMemo(() =>
    confirmButton &&
    <Button
      {...confirmButton}
      onClick={handleOnClickConfirmButton}
    />
  , [confirmButton])

  const handleAlertFooter = useMemo(() =>
    <AlertDialogFooter
      justifyContent={'space-between'}
    >
      {handleConfirmButton}
      {handleCancelButton}
    </AlertDialogFooter>
  , [confirmButton, cancelButton])

  return (
    <AlertDialogContent>
      {handleAlertTitle}
      <AlertDialogCloseButton />
      {handleAlertBody}
      {handleAlertFooter}
    </AlertDialogContent>
  )
}
