import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  breakpoints: {
    sm: '30em', // 480px
    md: '48em', // 768px
    lg: '62em', // 992px
    xl: '80em', // 1280px
    '2xl': '90em', // 1440px
  },
  colors: {
    brand: {
      50: '#fff5eb', // Muy claro (casi blanco)
      100: '#ffe5d1', // Tonos más claros de naranja
      200: '#ffcca3',
      300: '#ffb374',
      400: '#ff8a3f',
      500: '#FF5C00', // Color base
      600: '#e65300', // Tonos oscuros de naranja
      700: '#b64000',
      800: '#863000',
      900: '#562000', // Muy oscuro
    },
  },
  initialColorMode: 'dark',
})

export default theme
