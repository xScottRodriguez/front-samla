import { Box, Button, Flex, Image, Text, useToast } from '@chakra-ui/react'
import * as faceapi from 'face-api.js'
import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../hooks'
import { clearState, setPersonalData } from '../store'
import { useSendRegistrationRequestMutation } from '../services'
import CameraCapture from './CameraCapture'

import { dataUrlToFile, dataUrlToImage, fileToDataUrl } from '../utils'
const MODEL_URL = '/models'
export const SelfieForm = () => {
  const toast = useToast()
  const [saveRegistration] = useSendRegistrationRequestMutation()
  const [isLoading, setIsLoading] = useState(false)
  const { step, isOpen, activeItem, ...rest } = useAppSelector(
    (state) => state.ui,
  )
  const { selfie } = useAppSelector((state) => state.ui)
  const dispatch = useAppDispatch()
  const [facePhoto, setFacePhoto] = useState<File>()

  useEffect(() => {
    loadModels()
  }, [])

  const handleSubmit = async () => {
    if (!selfie) {
      toast({
        title: 'Error',
        description: 'Por favor toma una selfie',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      return
    }
    setIsLoading(true)
    const isSelfieValid = await handleValidation()

    if (isSelfieValid) {
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
    } else {
      setIsLoading(false)
    }
  }

  const handlerPhoto = (photo: File) => {
    setFacePhoto(photo)
    dispatch(setPersonalData({ selfie: photo }))
  }
  const handleValidation = async () => {
    const front: File | null = rest.front
    if (!facePhoto || !front) return

    try {
      // Convertir archivos File a Data URLs
      const faceUrl = await fileToDataUrl(facePhoto)
      const urltoFile = await dataUrlToFile(faceUrl, 'photo.png')
      const selfie = await fileToDataUrl(urltoFile)
      const frontPhoto = await fileToDataUrl(front)

      // Convertir Data URLs a HTMLImageElement
      const selfieImage = await dataUrlToImage(selfie)
      const documentImage = await dataUrlToImage(frontPhoto)

      // Validar las imágenes
      const isValid = await validateFace(selfieImage, documentImage)
      console.log({ isValid })
      if (!isValid) {
        toast({
          title: 'Error',
          description: 'Las caras en las imágenes no coinciden',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }

      return isValid
    } catch (error) {
      console.error('Error validating face:', error)
      toast({
        title: 'Error',
        description: 'Ha ocurrido un error al validar las imágenes',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }
  const validateFace = async (
    inputImage: HTMLImageElement,
    referenceImage: HTMLImageElement,
  ) => {
    const inputDetection = await faceapi
      .detectSingleFace(inputImage)
      .withFaceLandmarks()
      .withFaceDescriptor()

    const referenceDetection = await faceapi
      .detectSingleFace(referenceImage)
      .withFaceLandmarks()
      .withFaceDescriptor()

    if (!inputDetection || !referenceDetection) {
      console.error('No se detectó ninguna cara en una de las imágenes.')
      return false
    }

    const inputDescriptor = inputDetection.descriptor
    const referenceDescriptor = referenceDetection.descriptor

    const distance = faceapi.euclideanDistance(
      inputDescriptor,
      referenceDescriptor,
    )
    const threshold = 0.72

    return distance <= threshold
  }
  const loadModels = () => {
    return Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    ]).then(() => {
      console.log('Models loaded')
    })
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
