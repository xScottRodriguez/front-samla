import { Box, Button, Flex, Image, Text, useToast } from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { clearState, IUiState, setPersonalData } from '../store'
import { useSendRegistrationRequestMutation } from '../services'
import CameraCapture from './CameraCapture'
import { useState } from 'react'

export const SelfieForm = () => {
  const toast = useToast()
  const [saveRegistration] = useSendRegistrationRequestMutation()
  const [isLoading, setIsLoading] = useState(false)
  const uiState: IUiState = useAppSelector((state) => state.ui)
  const { selfie } = useAppSelector((state) => state.ui)
  const dispatch = useAppDispatch()
  const handleSubmit = () => {
    const { step, ...rest } = uiState

    if (!selfie) {
      toast({
        title: 'Error',
        description: 'Por favortoma una selfie',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      return
    }
    setIsLoading(true)
    toast.promise(saveRegistration(rest).unwrap(), {
      loading: {
        title: 'Enviando registro',
      },
      error: (error) => {
        setIsLoading(false)
        return {
          title: 'Error',
          description: error?.message ?? error ?? 'Ha ocurrido un error',
          isClosable: true,
        }
      },
      success: () => {
        setIsLoading(false)
        dispatch(clearState())
        return {
          title: 'Registro enviado',
          description: 'Tu registro ha sido enviado con éxito',
          isClosable: true,
        }
      },
    })
  }

  const handlerPhoto = (photo: File) => {
    dispatch(setPersonalData({ selfie: photo }))
  }
  return (
    <Flex minH={'100vh'} justifyContent={'center'} alignItems={'center'}>
      <Box textAlign="center" width="100%" maxW="400px" mx="auto">
        <Image alt="Brand" src="/brand.svg" mx="auto" />

        <Text fontWeight={'bold'} fontSize={'1.5rem'}>
          ¡Es hora de la selfie!
        </Text>
        <Text>Sonríe y asegúrate de tener buena iluminación.</Text>
        <CameraCapture handlerPhoto={handlerPhoto} />
        <Button
          mt={4}
          bg={'brand.500'}
          color={'white'}
          _hover={{
            bg: 'brand.600',
          }}
          _active={{
            bg: 'brand.600',
          }}
          onClick={handleSubmit}
          isLoading={isLoading}
        >
          Continuar
        </Button>
      </Box>
    </Flex>
  )
}
