import React, { useRef, useState, useEffect } from 'react'
import { Button, Box, Image, VStack, Flex, Text } from '@chakra-ui/react'
import FileUpload from './FileUpload'
import * as faceapi from 'face-api.js'

import { dataUrlToFile } from '../utils'

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
    checkCameraAvailability()

    videoRef &&
      loadModels().then(() => {
        console.log('Models loaded')
        faceMyDetect()
      })

    return () => {
      stream?.getTracks().forEach((track) => track.stop())
    }
  }, [])

  const checkCameraAvailability = async () => {
    try {
      if (!navigator.mediaDevices) {
        console.log('No media devices')
        return
      }
      const devices = await navigator.mediaDevices?.enumerateDevices()
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

  const loadModels = () => {
    return Promise.all([
      // THIS FOR FACE DETECT AND LOAD FROM YOU PUBLIC/MODELS DIRECTORY
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('/models'),
    ]).then(() => {
      faceMyDetect()
    })
  }

  const takePhoto = () => {
    const canvas = canvasRef.current
    if (canvas && videoRef.current) {
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight

      const dataUrl = getDataUrlFromCanvas(canvas)
      if (dataUrl) {
        setPhoto(dataUrl)
        const file = dataUrlToFile(dataUrl, 'photo.png')
        handlerPhoto(file)
      } else {
        console.error('Failed to get data URL from canvas')
      }
    } else {
      console.error('Canvas or video element not found')
    }
  }

  const getDataUrlFromCanvas = (canvas: HTMLCanvasElement): string | null => {
    const context = canvas.getContext('2d')
    if (context) {
      context.drawImage(videoRef.current!, 0, 0)
      return canvas.toDataURL('image/png')
    }
    console.error('Failed to get canvas context')
    return null
  }
  const faceMyDetect = () => {
    setInterval(async () => {
      if (!videoRef.current || !canvasRef.current) return

      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions()

      canvasRef.current.innerHTML += faceapi.createCanvasFromMedia(
        videoRef.current,
      )
      faceapi.matchDimensions(canvasRef.current, {
        width: 940,
        height: 650,
      })

      const resized = faceapi.resizeResults(detections, {
        width: 940,
        height: 650,
      })

      faceapi.draw.drawDetections(canvasRef.current, resized)
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resized)
      faceapi.draw.drawFaceExpressions(canvasRef.current, resized)
    }, 1000)
  }

  return (
    <Flex direction="column" align="center" justify="center" p={4}>
      {hasCamera ? (
        <VStack spacing={4} align="center">
          <Box
            boxSize="sm"
            borderRadius="md"
            overflow="hidden"
            m={2}
            position="relative"
          >
            <video
              ref={videoRef}
              autoPlay
              style={{ width: '100%', height: '100%' }}
            ></video>
            <canvas
              ref={canvasRef}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '25rem',
                height: '25rem',
                zIndex: 1,
              }}
            />
          </Box>
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
