import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react'
import { PhoneNumberInput } from '../PhoneNumberInput'

import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Select } from 'chakra-react-select'
import { StepButton } from '../StepButton'
import { useDispatch } from 'react-redux'
import { nextStep, setPersonalData } from '../../store'
const yupSchema = yup.object().shape({
  firstName: yup.string().required('Campo requerido'),
  lastName: yup.string().required('Campo requerido'),
  email: yup.string().email('Correo inválido').required('Campo requerido'),
  phoneNumber: yup.string().required('Campo requerido'),
  identificationType: yup.string().required('Campo requerido'),
  identificationNumber: yup.string().required('Campo requerido'),
})

interface FormValues {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  identificationType: string
  identificationNumber: string
}
export const Form = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(yupSchema),
  })

  const dispatch = useDispatch()

  const onSubmit = (data: FormValues) => {
    dispatch(nextStep())
    dispatch(setPersonalData(data))
  }
  return (
    <Stack as="form">
      <FormControl my={2}>
        <FormLabel>Nombres</FormLabel>
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <Input
              size="lg"
              isInvalid={!!errors.firstName}
              placeholder="Ingresar Nombres"
              {...field}
            />
          )}
        />
        {errors.firstName && (
          <FormHelperText color="red.500">
            {errors.firstName.message}
          </FormHelperText>
        )}
      </FormControl>
      <FormControl my={2}>
        <FormLabel>Apellidos</FormLabel>
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <Input
              size="lg"
              isInvalid={!!errors.lastName}
              placeholder="Ingresar Apellidos"
              {...field}
            />
          )}
        />
        {errors.lastName && (
          <FormHelperText color="red.500">
            {errors.lastName.message}
          </FormHelperText>
        )}
      </FormControl>
      <FormControl my={2}>
        <FormLabel>Correo Electronico</FormLabel>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              size="lg"
              isInvalid={!!errors.email}
              placeholder="Ingresar Correo"
              {...field}
            />
          )}
        />
        {errors.email && (
          <FormHelperText color="red.500">
            {errors.email.message}
          </FormHelperText>
        )}
      </FormControl>
      <FormControl my={2}>
        <FormLabel>Número de teléfono</FormLabel>
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <PhoneNumberInput {...field} isInvalid={!!errors.phoneNumber} />
          )}
        />
        {errors.phoneNumber && (
          <FormHelperText color="red.500">
            {errors.phoneNumber.message}
          </FormHelperText>
        )}
      </FormControl>
      <FormControl my={2}>
        <FormLabel>Tipo Identificacion</FormLabel>
        <Controller
          name="identificationType"
          control={control}
          render={({ field }) => (
            <Select
              colorScheme="purple"
              loadingMessage={() => 'Cargando...'}
              isInvalid={!!errors.identificationType}
              noOptionsMessage={() => 'Sin opciones'}
              options={[
                { label: 'Cédula de ciudadanía', value: 'CC' },
                { label: 'Pasaporte', value: 'P' },
              ]}
              placeholder="Seleccionar tipo de identificación"
              {...field}
              onChange={(selectedOption) => {
                field.onChange(selectedOption?.value)
              }}
              value={
                field.value ? { label: field.value, value: field.value } : null
              }
            />
          )}
        />
        {errors.identificationType && (
          <FormHelperText color="red.500">
            {errors.identificationType.message}
          </FormHelperText>
        )}
      </FormControl>
      <FormControl my={2}>
        <FormLabel>Número de identificación</FormLabel>
        <Controller
          name="identificationNumber"
          control={control}
          render={({ field }) => (
            <Input
              size="lg"
              isInvalid={!!errors.identificationNumber}
              placeholder="Ingresar número de identificación"
              {...field}
            />
          )}
        />
        {errors.identificationNumber && (
          <FormHelperText color="red.500">
            {errors.identificationNumber.message}
          </FormHelperText>
        )}
      </FormControl>
      <Stack direction={{ base: 'column',md: 'row' }} spacing={4}>
        
      <StepButton handleSubmit={handleSubmit(onSubmit)} />
      </Stack>
    </Stack>
  )
}
