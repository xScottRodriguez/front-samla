import {
  Input,
  InputGroup,
  InputLeftElement,
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
  return (
    <InputGroup w="100%">
      <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em">
        $
      </InputLeftElement>
      <Input
        onChange={onChange}
        value={value}
        name={name}
        type="number"
        placeholder="Ingresar cantidad"
        min={0}
      />
    </InputGroup>
  )
}
