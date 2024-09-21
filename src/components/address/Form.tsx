import {
  FormControl,
  FormHelperText,
  FormLabel,
  Stack,
  Textarea,
} from '@chakra-ui/react'
import { Select, SingleValue } from 'chakra-react-select'
import {
  Control,
  Controller,
  FieldErrors,
  UseFormSetValue,
  useWatch,
} from 'react-hook-form'
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
interface IAddressForm {
  region: ICommonObject
  city: ICommonObject
  address: string
  monthlyIncome: string
}
interface Props {
  control: Control<FormData>
  errors: FieldErrors<FormData>
  setValue: UseFormSetValue<IAddressForm>
}
export const Form: FC<Props> = ({ errors, control, setValue }) => {
  const [departmentSelected, setDepartmentSelected] = useState(false)
  const {
    isFetching,
    isSuccess,
    data: departments,
  } = useGetDepartmentsQuery({})
  const [triggerFn, { data: munipality }] = useLazyGetMunicipalitiesQuery()

 
  const handleRegionChange = (selectedRegion: SingleValue<ICommonObject>) => {
    setValue('region', selectedRegion as ICommonObject)
    if (selectedRegion) {
      triggerFn({ departmentId: selectedRegion.value }).unwrap()
      setDepartmentSelected(true)
    } else {
      setValue('city', { value: '', label: '' })
      setDepartmentSelected(false)
    }
  }
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
                onChange={handleRegionChange}
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
