import { Box, Button, Flex, Image, Text, useToast } from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { IUiState, setPersonalData } from '../store'
import { useSendRegistrationRequestMutation } from '../services'
import CameraCapture from './CameraCapture'

export const SelfieForm = () => {
  const toast = useToast()
  const [saveRegistration] = useSendRegistrationRequestMutation()
  const uiState: IUiState = useAppSelector((state) => state.ui)
  const dispatch=useAppDispatch()
  const handleSubmit = () => {
    const { step, ...rest } = uiState

    toast.promise(saveRegistration(rest).unwrap(), {
      loading: {
        title: 'Enviando registro',
      },
      error: (error) => {
        return {
          title: 'Error',
          description: error?.message ?? error ?? 'Ha ocurrido un error',
        }
      },
      success: {
        title: 'Registro enviado',
        description: 'Tu registro ha sido enviado con éxito',
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
        >
          Continuar
        </Button>
      </Box>
    </Flex>
  )
}
