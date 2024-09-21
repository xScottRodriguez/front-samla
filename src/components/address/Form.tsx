import {
  FormControl,
  FormHelperText,
  FormLabel,
  Stack,
  Textarea,
} from '@chakra-ui/react'
import { Select } from 'chakra-react-select'
import { Control, Controller, FieldErrors, useWatch } from 'react-hook-form'
import { FC, useState } from 'react'
import { CustomNumberInput } from '../NumberInput'
import {
  useGetDepartmentsQuery,
  useLazyGetMunicipalitiesQuery,
} from '../../services'
import { ICommonData } from '../../services/interfaces'
import { useEffect } from 'react'
interface ICommonObject {
  value: string
  label: string
}
interface FormData {
  address: string
  region: ICommonObject
  city: ICommonObject
  monthlyIncome: string
}
interface Props {
  control: Control<FormData>
  errors: FieldErrors<FormData>
}
export const Form: FC<Props> = ({ errors, control }) => {
  const { region } = useWatch({ control })
  const [departmentSelected, setDepartmentSelected] = useState(false)
  const {
    isFetching,
    isSuccess,
    data: departments,
  } = useGetDepartmentsQuery({})
  const [
    triggerFn,
    {
      data: munipality,
      isFetching: isMunicipalityFetching,
    },
  ] = useLazyGetMunicipalitiesQuery()

  useEffect(() => {
    if (region) {
      triggerFn({
        departmentId: region.value ?? '',
      }).unwrap()
      return setDepartmentSelected(true)
    }
    setDepartmentSelected(false)
  }, [region])

  return (
    <Stack>
      <FormControl>
        <FormLabel>Departamento </FormLabel>
        {isFetching && <Select isLoading />}
        {isSuccess && (
          <Controller
            name="region"
            control={control}
            render={({ field }) => (
              <Select
                loadingMessage={() => 'Cargando...'}
                isInvalid={!!errors.region}
                isClearable
                noOptionsMessage={() => 'Sin opciones'}
                options={departments?.data.map((doc: ICommonData) => ({
                  label: doc.name,
                  value: doc._id,
                }))}
                placeholder="Seleccionar"
                {...field}
              />
            )}
          />
        )}

        {errors.region && (
          <FormHelperText color={'red.500'}>
            {errors.region.message}
          </FormHelperText>
        )}
      </FormControl>
      <FormControl>
        <FormLabel>Municipio</FormLabel>
        {isMunicipalityFetching && <Select isLoading />}
        
          <Controller
            name="city"
            control={control}
            disabled={!departmentSelected}
            render={({ field }) => (
              <Select
                isDisabled={!departmentSelected}
                loadingMessage={() => 'Cargando...'}
                isInvalid={!!errors.region}
                noOptionsMessage={() => 'Sin opciones'}
                options={munipality?.data.map((doc: ICommonData) => ({
                  label: doc.name,
                  value: doc._id,
                }))}
                placeholder="Seleccionar"
                {...field}
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
          render={({ field }) => <CustomNumberInput {...field} />}
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
