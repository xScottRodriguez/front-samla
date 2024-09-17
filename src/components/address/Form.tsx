import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Textarea,
} from '@chakra-ui/react'
import { Select } from 'chakra-react-select'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import { FC } from 'react'

interface FormData {
  address: string
  region: string
  city: string
  monthlyIncome: number
}
interface Props {
  control: Control<FormData>
  errors: FieldErrors<FormData>
}
export const Form: FC<Props> = ({ errors, control }) => {
  return (
    <Stack>
      <FormControl>
        <FormLabel>Departamento</FormLabel>
        <Controller
          name="region"
          control={control}
          render={({ field }) => (
            <Select
              loadingMessage={() => 'Cargando...'}
              isInvalid={!!errors.region}
              noOptionsMessage={() => 'Sin opciones'}
              options={[
                { label: 'San Miguel', value: 'SM' },
                { label: 'San Salvador', value: 'SS' },
              ]}
              placeholder="Seleccionar"
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
        {errors.region && (
          <FormHelperText color={'red.500'}>
            {errors.region.message}
          </FormHelperText>
        )}
      </FormControl>
      <FormControl>
        <FormLabel>Municipio</FormLabel>
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <Select
              loadingMessage={() => 'Cargando...'}
              isInvalid={!!errors.region}
              noOptionsMessage={() => 'Sin opciones'}
              options={[
                { label: 'San Miguel', value: 'SM' },
                { label: 'San Salvador', value: 'SS' },
              ]}
              placeholder="Seleccionar"
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
        {errors.city && (
          <FormHelperText color={'red.500'}>
            {errors.city.message}
          </FormHelperText>
        )}
      </FormControl>
      <FormControl>
        <FormLabel>Dirección</FormLabel>
        <Controller
          name="address"
          control={control}
          render={({ field }) => <Textarea {...field} />}
        />
        {errors.address && (
          <FormHelperText color={'red.500'}>
            {errors.address.message}
          </FormHelperText>
        )}
      </FormControl>
      <FormControl>
        <FormLabel>Ingresos Mensuales</FormLabel>
        <Controller
          name="monthlyIncome"
          control={control}
          render={({ field }) => <Input {...field} placeholder='0.00' />}
        />
        {errors.monthlyIncome && (
          <FormHelperText color={'red.500'}>
            {errors.monthlyIncome.message}
          </FormHelperText>
        )}
      </FormControl>
    </Stack>
  )
}
