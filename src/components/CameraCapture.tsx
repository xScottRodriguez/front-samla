import React, { useRef, useState, useEffect } from 'react'
import { Button, Box, Image, VStack, Flex, Text } from '@chakra-ui/react'
import FileUpload from './FileUpload'

interface Props {
  handlerPhoto: (photo: File) => void
}

const CameraCapture: React.FC<Props> = ({ handlerPhoto }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [photo, setPhoto] = useState<string | null>(null)
  const [hasCamera, setHasCamera] = useState<boolean>(false)

  useEffect(() => {
    const checkCameraAvailability = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices()
        const hasVideoInput = devices.some(
          (device) => device.kind === 'videoinput',
        )
        setHasCamera(hasVideoInput)

        if (hasVideoInput) {
          const mediaStream = await navigator.mediaDevices.getUserMedia({
            video: true,
          })
          setStream(mediaStream)
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream
          }
        }
      } catch (error) {
        console.error('Error checking camera availability:', error)
      }
    }

    checkCameraAvailability()

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  const takePhoto = () => {
    const canvas = canvasRef.current
    const video = videoRef.current
    if (canvas && video) {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const context = canvas.getContext('2d')
      if (context) {
        context.drawImage(video, 0, 0)
        const dataUrl = canvas.toDataURL('image/png')
        setPhoto(dataUrl)

        const dataUrlParts = dataUrl.split(',')
        const mimeString = dataUrlParts[0].split(':')[1].split(';')[0]
        const byteString = atob(dataUrlParts[1])
        const arrayBuffer = new ArrayBuffer(byteString.length)
        const uint8Array = new Uint8Array(arrayBuffer)

        for (let i = 0; i < byteString.length; i++) {
          uint8Array[i] = byteString.charCodeAt(i)
        }

        const blob = new Blob([arrayBuffer], { type: mimeString })
        const file = new File([blob], 'photo.png', { type: mimeString })

        handlerPhoto(file)
      } else {
        console.error('Failed to get canvas context')
      }
    } else {
      console.error('Canvas or video element not found')
    }
  }

  const handleFileChange = (files: {
    front: File | null
    back: File | null
  }) => {
    if (files) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhoto(reader.result as string)
        handlerPhoto(files.front as File)
      }
      reader.readAsDataURL(files.front as File)
    }
  }

  return (
    <Flex direction="column" align="center" justify="center" p={4}>
      {hasCamera ? (
        <VStack spacing={4} align="center">
          <Box boxSize="sm" borderRadius="md" overflow="hidden" m={2}>
            <video
              ref={videoRef}
              autoPlay
              style={{ width: '25rem', height: '25rem' }}
            ></video>
          </Box>
          <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
          {photo && (
            <Image
              src={photo}
              alt="Captured"
              boxSize="sm"
              borderRadius="md"
              maxH={'13rem'}
              maxW={'15rem'}
            />
          )}
          <Button colorScheme="blue" onClick={takePhoto}>
            Capture Photo
          </Button>
        </VStack>
      ) : (
        <VStack spacing={4} align="center">
          <Text color={'red.500'}>
            No se ha detectado ninguna cámara. Por favor, cargue un archivo en
            su lugar.
          </Text>
          <FileUpload handler={handleFileChange} />
          {photo && (
            <Image
              src={photo}
              alt="Uploaded"
              boxSize="sm"
              borderRadius="md"
              maxH={'13rem'}
              maxW={'15rem'}
            />
          )}
        </VStack>
      )}
    </Flex>
  )
}

export default CameraCapture
