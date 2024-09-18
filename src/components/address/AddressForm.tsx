import { Button, Flex, Stack, Text } from '@chakra-ui/react'
import { StepLayout } from '../../layouts/StepLayout'
import { FormHeading } from '../FormHeading'
import { Form } from './Form'
import FileUpload from '../FileUpload'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { nextStep } from '../../store'

interface IAddressForm {
  region: string
  city: string
  address: string
  monthlyIncome: number
}
const yupSchema = yup.object().shape({
  region: yup.string().required('Campo requerido'),
  city: yup.string().required('Campo requerido'),
  address: yup
    .string()
    .min(50, 'Direccion muy corta (< 50)')
    .required('Campo requerido'),
  monthlyIncome: yup.number().required('Campo requerido'),
})
export const AddressForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IAddressForm>({
    resolver: yupResolver(yupSchema),
  })
  const dispatch = useAppDispatch()

  const onSubmit = (data: IAddressForm) => {
    dispatch(nextStep())
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
          <FileUpload handler={() => {}} />
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
