import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Grid,
  GridItem,
  Heading,
  Text,
  Divider,
  Flex,
} from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { clearActiveItem, toggleModal } from '../store'

export const ModalCustom = () => {
  const { isOpen } = useAppSelector((state) => state.ui)
  const dispatch = useAppDispatch()
  const onClose = () => {
    dispatch(clearActiveItem())
    dispatch(toggleModal())
  }
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered size={'4xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            <GridItem my="0.2rem">
              <Button colorScheme="green">Button 1</Button>
            </GridItem>
            <GridItem >
              <Heading my="0.7rem" size={'lg'}>Juan Carlos Perez Lopez</Heading>
              <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <GridItem my="0.2rem">
                  <Text>Correo electrónico:</Text>
                  <Text color="gray.500">examel</Text>
                </GridItem>
                <GridItem my="0.2rem">
                  <Text>Departamento:</Text>
                  <Text color="gray.500">San Salvador</Text>
                </GridItem>
                <GridItem my="0.2rem">
                  <Text>Correo electrónico:</Text>
                  <Text color="gray.500">examel</Text>
                </GridItem>
                <GridItem my="0.2rem">
                  <Text>Departamento:</Text>
                  <Text color="gray.500">San Salvador</Text>
                </GridItem>
                <GridItem my="0.2rem">
                  <Text>Correo electrónico:</Text>
                  <Text color="gray.500">examel</Text>
                </GridItem>
                <GridItem my="0.2rem">
                  <Text>Departamento:</Text>
                  <Text color="gray.500">San Salvador</Text>
                </GridItem>
                <GridItem my="0.2rem">
                  <Text>Correo electrónico:</Text>
                  <Text color="gray.500">examel</Text>
                </GridItem>
                <GridItem my="0.2rem">
                  <Text>Departamento:</Text>
                  <Text color="gray.500">San Salvador</Text>
                </GridItem>
              </Grid>
            </GridItem>
          </Grid>
          <Divider my="1rem" />
          <Heading size={'md'} color={'gray.500'}>Documento de identidad</Heading>
          <Flex gap={5}>
            <Text>Documento de identidad:</Text>
            <Text color="gray.500">examel</Text>
          </Flex>

        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
