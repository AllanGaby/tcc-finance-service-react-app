import React, { useCallback, useMemo } from 'react'
import { ModalSelectProps, Grid } from '../../../../common'
import { IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

export const ModalSelect: React.FC<ModalSelectProps> = ({
  search,
  title,
  isOpen,
  columns,
  entities,
  listURL,
  onSelect,
  onClose
}: ModalSelectProps) => {
  const handleModalTitle = useMemo(() =>
    title &&
    <ModalHeader>{title}</ModalHeader>
  , [title])

  const handleSelectButton = useCallback((entity: Object, rowId: number): JSX.Element =>
    <IconButton
      aria-label='select'
      onClick={() => {
        onSelect(entity)
        onClose()
      }}
    >
      <ChevronRightIcon/>
    </IconButton>
  , [onClose, onSelect])

  const handleBody = useMemo(() =>
    <ModalBody>
      <Grid
        search={search}
        entities={entities}
        columns={[
          ...columns,
          {
            name: 'actions',
            disableOrder: true,
            label: '',
            width: 25,
            onHandleColumnContent: handleSelectButton
          }]}
        listURL={listURL}
      />
    </ModalBody>
  , [listURL, columns, entities, search])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        {handleModalTitle}
        <ModalCloseButton />
        {handleBody}
      </ModalContent>
    </Modal>
  )
}
