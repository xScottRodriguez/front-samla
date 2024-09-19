import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { toggleModal } from '../store'

export const ModalCustom = () => {
  const { isOpen } = useAppSelector((state) => state.ui)
  const dispatch = useAppDispatch()
  const onClose = () => {
    dispatch(toggleModal())
  }
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <h1>GOLA</h1>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
