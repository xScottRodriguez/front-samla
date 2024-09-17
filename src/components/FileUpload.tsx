import React, { useState, ChangeEvent, DragEvent } from 'react'
import {
  Box,
  Text,
  Icon,
  Input,
  useToast,
  Image,
  Stack,
  Button,
} from '@chakra-ui/react'
import { DividerWithCircle } from './Divider'

interface FileUploadProps {
  handler: (files: File[]) => void
  accept?: string // Aceptar el tipo MIME permitido como una cadena
  allowedMimeTypes?: string[] // Lista de tipos MIME permitidos
}

const FileUpload: React.FC<FileUploadProps> = ({
  handler,
  accept = '.pgn, .jpg, .jpeg',
  allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'],
}) => {
  const [dragging, setDragging] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const toast = useToast()

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragging(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragging(false)
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragging(true)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragging(false)

    const files = e.dataTransfer.files

    if (files.length !== 1) {
      return toast({
        title: 'Error',
        description: 'Por favor solo arrastre un archivo',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }

    const file = files[0]

    if (!isValidFile(file)) {
      return
    }

    setFileName(file.name)
    handler([file])
  }

  // Nueva validación basada en mimeType
  const isValidFile = (file: File) => {
    if (!allowedMimeTypes.includes(file.type)) {
      toast({
        title: 'Error',
        description: `Archivo no válido. Tipos permitidos: ${allowedMimeTypes.join(', ')}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      return false
    }
    return true
  }

  const handleClick = () => {
    document.getElementById('file-upload')?.click()
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (files?.length !== 1) {
      toast({
        title: 'Error',
        description: 'Por favor seleccione solo un archivo',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      return
    }

    const file = files[0]

    if (!isValidFile(file)) {
      return
    }

    setFileName(file.name)
    handler([file])
  }

  return (
    <Box
      textAlign="center"
      m={3}
      p={3}
      borderWidth={2}
      borderStyle="dashed"
      borderColor={dragging ? 'blue.500' : 'gray.300'}
      borderRadius="md"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      h={'20rem'}
      w="full"
      role="button"
      cursor="pointer"
      alignContent={'center'}
    >
      <Input
        type="file"
        id="file-upload"
        display="none"
        accept={accept}
        onChange={handleChange}
      />
      <Box>
        <Stack alignItems={'center'}>
          <Icon
            as={() => {
              return <Image src="/assets/upload-folder.svg" w="10" />
            }}
            boxSize={10}
          />
          <Text mt={2}>Arrastrar aquí</Text>
        </Stack>
        <DividerWithCircle />
        <Button onClick={handleClick} flexWrap={'wrap'}>Seleccionar Archivo</Button>
        {fileName && <Text mt={4}>Archivo seleccionado: {fileName}</Text>}
      </Box>
    </Box>
  )
}

export default FileUpload
