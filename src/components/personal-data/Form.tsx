import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Stack,
} from '@chakra-ui/react'
import { PhoneNumberInput } from '../PhoneNumberInput'

export const Form = () => {
  return (
    <Stack>
      <FormControl size={'lg'}>
        <FormLabel>Nombres</FormLabel>
        <Input size="lg" placeholder="Ingresar Nombres" />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Apellidos</FormLabel>
        <Input size="lg" placeholder="Ingresar Apellidos" />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Correo Electronico</FormLabel>
        <Input size="lg" placeholder="ejemplo@gmail.com" />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Número de teléfono</FormLabel>
        <PhoneNumberInput />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Tipo Identificacion</FormLabel>
        <Select placeholder='Seleccionar...' size='lg' />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Número de identificación</FormLabel>
        <Input size="lg" placeholder="000-0" />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>
    </Stack>
  )
}
