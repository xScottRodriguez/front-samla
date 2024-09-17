import { Box, useColorModeValue } from '@chakra-ui/react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export const PhoneNumberInput = () => {
  const inputBg = useColorModeValue('white', 'gray.700');
  const inputBorder = useColorModeValue('gray.300', 'gray.600');
  const focusBorder = useColorModeValue('#3182ce', '#90cdf4'); // Chakra's default blue

  return (
    <Box
      sx={{
        '.react-tel-input': {
          width: '100%',
        },
        '.react-tel-input .flag-dropdown': {
          background: inputBg,
          borderColor: inputBorder,
          borderRight: 'none',
        },
        '.react-tel-input input': {
          width: '100%',
          paddingLeft: '58px', // Espacio para el código de país
          background: inputBg,
          borderRadius: 'var(--chakra-radii-md)',
          borderColor: inputBorder,
          height: 'var(--chakra-sizes-10)', // Asegura altura uniforme
          fontSize: 'var(--chakra-fontSizes-md)',
          transition: 'var(--chakra-transition-duration-normal)',
          _hover: {
            borderColor: 'blue.500', // Borde al hacer hover
          },
          _focusVisible: {
            zIndex: 1,
            borderColor: focusBorder, // Borde de enfoque de Chakra
            boxShadow: `0 0 0 1px ${focusBorder}`, // Sombra cuando se enfoca
          },
        },
      }}
    >
      <PhoneInput
        country={'sv'} // El Salvador (+503) por defecto
        inputStyle={{
          // Si deseas manejar los estilos solo desde Chakra, puedes eliminar esto
          width: '100%',
        }}
        enableSearch
      />
    </Box>
  );
};
