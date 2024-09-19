import React, { useRef, useState, useEffect } from 'react'
import { Button, Box, Image, VStack, Flex } from '@chakra-ui/react'

interface Props {
  handlerPhoto: (photo: File) => void
}
const CameraCapture: React.FC<Props> = ({ handlerPhoto }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [_stream, setStream] = useState<MediaStream | null>(null)
  const [photo, setPhoto] = useState<string | null>(null)

  useEffect(() => {
    const startVideo = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        })
        console.log('Media Stream:', mediaStream)
        setStream(mediaStream)
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream
        }
      } catch (error) {
        console.error('Error accessing webcam:', error)
      }
    }

    startVideo()
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

        const file = new File([blob],'photo.png',{ type: mimeString })
        
        handlerPhoto(file)
      } else {
        console.error('Failed to get canvas context')
      }
    } else {
      console.error('Canvas or video element not found')
    }
  }

  return (
    <Flex>
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
    </Flex>
  )
}

export default CameraCapture
