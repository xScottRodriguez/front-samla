import { Button, Flex, Stack, Text, useToast } from '@chakra-ui/react'
import { StepLayout } from '../../layouts/StepLayout'
import { FormHeading } from '../FormHeading'
import { Form } from './Form'
import FileUpload from '../FileUpload'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { nextStep, setPersonalData } from '../../store'

interface IAddressForm {
  region: string
  city: string
  address: string
  monthlyIncome: string
}
const yupSchema = yup.object().shape({
  region: yup.string().required('Campo requerido'),
  city: yup.string().required('Campo requerido'),
  address: yup
    .string()
    .min(35, 'Direccion muy corta (< 35)')
    .required('Campo requerido'),
  monthlyIncome: yup.string().required('Campo requerido'),
})
export const AddressForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IAddressForm>({
    resolver: yupResolver(yupSchema),
  })
  const { front, back } = useAppSelector((state) => state.ui)
  const dispatch = useAppDispatch()

  const toast = useToast()
  const onSubmit = (data: IAddressForm) => {
    if (front && back) {
      dispatch(nextStep())
      dispatch(setPersonalData(data))
      return
    }

    toast({
      title: 'Warning.',
      description: 'Por favor sube una foto de tu documento de identidad',
      status: 'warning',
      duration: 9000,
      isClosable: true,
    })
  }

  const handleFileUpload = (files: {
    front: File | null
    back: File | null
  }) => {
    dispatch(setPersonalData({ front: files.front, back: files.back }))
  }
  return (
    <StepLayout>
      <Flex p={8} flex={1} justifyContent={'center'} alignItems={'center'}>
        <Stack spacing={6} w={'full'} maxW={'2xl'}>
          <FormHeading text={'Datos de Vivienda'} />
          <Form control={control} errors={errors} />
        </Stack>
      </Flex>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'2xl'}>
          <Text fontWeight={'bold'} fontSize={'24px'} as={'span'}>
            Fotografía de documento de identidad
          </Text>
          <FileUpload handler={handleFileUpload} />
          <Stack flexDir={'row'} justify={'flex-end'}>
            <Button size={'lg'} w="fit-content">
              Cancelar
            </Button>
            <Button
              w="fit-content"
              bg={'brand.500'}
              size={'lg'}
              color={'white'}
              _hover={{
                bg: 'brand.6`00',
              }}
              _active={{
                bg: 'brand.600',
              }}
              onClick={handleSubmit(onSubmit)}
            >
              Continuar
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </StepLayout>
  )
}
