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
  handler: (files: { front: File | null, back: File | null }) => void
  accept?: string // Aceptar el tipo MIME permitido como una cadena
  allowedMimeTypes?: string[] // Lista de tipos MIME permitidos
}

const FileUpload: React.FC<FileUploadProps> = ({
  handler,
  accept = '.png, .jpg, .jpeg',
  allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'],
}) => {
  const [dragging, setDragging] = useState(false)
  const [fileNames, setFileNames] = useState<{ front: string | null, back: string | null }>({ front: null, back: null })
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

    if (files.length > 2) {
      return toast({
        title: 'Error',
        description: 'Por favor, arrastre un máximo de 2 archivos.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }

    const validFiles: { front: File | null, back: File | null } = { front: null, back: null }
    const validFileNames: { front: string | null, back: string | null } = { front: null, back: null }

    for (const file of files) {
      if (isValidFile(file)) {
        if (!validFiles.front) {
          validFiles.front = file
          validFileNames.front = file.name
        } else {
          validFiles.back = file
          validFileNames.back = file.name
        }
      }
    }

    if (validFiles.front || validFiles.back) {
      setFileNames(validFileNames)
      handler(validFiles)
    } else {
      toast({
        title: 'Error',
        description: 'Todos los archivos deben ser válidos.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

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
    if (files && files.length > 2) {
      return toast({
        title: 'Error',
        description: 'Por favor seleccione un máximo de 2 archivos.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }

    const validFiles: { front: File | null, back: File | null } = { front: null, back: null }
    const validFileNames: { front: string | null, back: string | null } = { front: null, back: null }

    for (const file of files!) {
      if (isValidFile(file)) {
        if (!validFiles.front) {
          validFiles.front = file
          validFileNames.front = file.name
        } else {
          validFiles.back = file
          validFileNames.back = file.name
        }
      }
    }

    if (validFiles.front || validFiles.back) {
      setFileNames(validFileNames)
      handler(validFiles)
    }
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
        multiple
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
        <Button onClick={handleClick} flexWrap={'wrap'}>Seleccionar Archivos</Button>
        {(fileNames.front || fileNames.back) && (
          <Text mt={4}>
            Archivos seleccionados: 
            {fileNames.front && `${fileNames.front} (frontal)`} 
            {fileNames.front && fileNames.back && ', '}
            {fileNames.back && `${fileNames.back} (trasera)`}
          </Text>
        )}
      </Box>
    </Box>
  )
}

export default FileUpload
