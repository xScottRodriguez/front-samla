import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react'
import { FC } from 'react'
import { ControllerRenderProps } from 'react-hook-form'

interface FormData {
  monthlyIncome: string
}

export const CustomNumberInput: FC<ControllerRenderProps<FormData>> = ({
  onChange,
  value,
  name,
}) => {
  const format = (val: string) => `$` + val
  const parse = (val: string) => val.replace(/^\$/, '')

  return (
    <NumberInput
      value={format(value as string)}
      onChange={(valString) => onChange(parse(valString))}
      name={name}
      aria-placeholder={'Ingresar cantidad'}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  )
}
