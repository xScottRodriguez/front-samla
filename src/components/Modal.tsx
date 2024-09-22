import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Grid,
  GridItem,
  Heading,
  Text,
  Divider,
  Flex,
  Image,
} from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { clearActiveItem, toggleModal } from '../store'

const defaultImage = '/assets/default-image.svg'
export const ModalCustom = () => {
  const { isOpen } = useAppSelector((state) => state.ui)
  const dispatch = useAppDispatch()
  const { activeItem } = useAppSelector((state) => state.ui)

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
          <Grid
            templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
            gap={6}
          >
            <GridItem my="0.1rem" colSpan={{ base: 2, md: 1 }}>
              <Image
                src={activeItem?.selfie ?? defaultImage}
                objectFit="cover"
                width="100%"
                height="100%"
              />
            </GridItem>
            <GridItem colSpan={2}>
              <Heading my="0.7rem" size={'lg'}>
                {activeItem?.firstName} {activeItem?.lastName}
              </Heading>
              <Grid
                templateColumns={{
                  base: 'repeat(1, 1fr)',
                  md: 'repeat(2, 1fr)',
                }}
                gap={6}
              >
                <GridItem my="0.1rem">
                  <Text>Correo electrónico:</Text>
                  <Text color="gray.500">{activeItem?.email}</Text>
                </GridItem>
                <GridItem my="0.1rem">
                  <Text>Departamento:</Text>
                  <Text color="gray.500">{activeItem?.region}</Text>
                </GridItem>
                <GridItem my="0.1rem">
                  <Text>Número de teléfono:</Text>
                  <Text color="gray.500">{activeItem?.phoneNumber}</Text>
                </GridItem>
                <GridItem my="0.1rem">
                  <Text>Municipio:</Text>
                  <Text color="gray.500">{activeItem?.city}</Text>
                </GridItem>
                <GridItem my="0.1rem">
                  <Text>Tipo de documento:</Text>
                  <Text color="gray.500">{activeItem?.identificationType}</Text>
                </GridItem>
                <GridItem my="0.1rem">
                  <Text>Dirección:</Text>
                  <Text color="gray.500">{activeItem?.address}</Text>
                </GridItem>
                <GridItem my="0.1rem">
                  <Text>Número de documento:</Text>
                  <Text color="gray.500">
                    {activeItem?.identificationNumber}
                  </Text>
                </GridItem>
                <GridItem my="0.1rem">
                  <Text>Ingresos mensuales:</Text>
                  <Text color="gray.500">${activeItem?.monthlyIncome}</Text>
                </GridItem>
              </Grid>
            </GridItem>
          </Grid>
          <Divider my="1rem" />
          <Heading size={'md'} color={'gray.500'}>
            Documento de identidad
          </Heading>
          <Flex gap={5} my={'1.5rem'} flexWrap={'wrap'}>
            <Image
              objectFit="cover"
              width={{ base: '100%', md: '30%' }}
              height={{ base: '100%', md: '30%' }}
              src={activeItem?.identificationFront ?? defaultImage}
            />
            <Image
              objectFit="cover"
              width={{ base: '100%', md: '30%' }}
              height={{ base: '30%', md: '30%' }}
              src={activeItem?.identificationBack ?? defaultImage}
            />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
