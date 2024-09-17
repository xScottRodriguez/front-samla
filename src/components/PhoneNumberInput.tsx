import { Box, useColorModeValue } from '@chakra-ui/react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

interface PhoneNumberInputProps {
  value?: string
  onChange?: (value: string) => void
  inputStyle?: React.CSSProperties
  country?: string
  enableSearch?: boolean
  isInvalid?: boolean
}

export const PhoneNumberInput = ({
  value,
  onChange,
  inputStyle,
  country = 'sv',
  enableSearch = true,
  isInvalid = false, // Valor por defecto
}: PhoneNumberInputProps) => {
  const inputBg = useColorModeValue('white', 'gray.700')
  const inputBorder = useColorModeValue('gray.300', 'gray.600')
  const focusBorder = useColorModeValue('#3182ce', '#90cdf4')
  const invalidBorder = useColorModeValue('red.500', 'red.300') // Borde para error, usando colores de Chakra

  return (
    <Box
      sx={{
        '.react-tel-input': {
          width: '100%',
        },
        '.react-tel-input .flag-dropdown': {
          background: inputBg,
          borderColor: isInvalid ? invalidBorder : inputBorder,
          borderRight: 'none',
        },
        '.react-tel-input input': {
          width: '100%',
          paddingLeft: '58px',
          background: inputBg,
          borderRadius: 'var(--chakra-radii-md)',
          borderColor: isInvalid ? invalidBorder : inputBorder,
          height: 'var(--chakra-sizes-10)',
          fontSize: 'var(--chakra-fontSizes-md)',
          transition: 'var(--chakra-transition-duration-normal)',
          _hover: {
            borderColor: 'blue.500',
          },
          _focusVisible: {
            zIndex: 1,
            borderColor: isInvalid ? invalidBorder : focusBorder,
            boxShadow: `0 0 0 1px ${isInvalid ? invalidBorder : focusBorder}`,
          },
        },
      }}
    >
      <PhoneInput
        country={country}
        value={value}
        onChange={onChange}
        inputStyle={inputStyle}
        enableSearch={enableSearch}
      />
    </Box>
  )
}
