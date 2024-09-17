import {
  Box,
  Flex,
  Heading,
  Hide,
  IconButton,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import { Form } from './Form'

export const FormStepPersonalData = () => {
  const marginValue = useBreakpointValue({
    base: '0', // Margen para pantallas pequeñas
    sm: '0',  // Mantén el margen en 0 para pantallas pequeñas
    md: '0',  // Mantén el margen en 0 para pantallas medianas
    lg: '7.875rem', // Margen para pantallas grandes y superiores
  });
  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex
        flex={1}
        justifyContent={'center'}
        alignItems={'center'}
        position="relative"
        backgroundImage={"url('/assets/background.svg')"}
        backgroundSize="cover"
        backgroundPosition="center"
        zIndex={0}
      >
        <Box position="relative" display="inline-block">
          <Image
            alt={'Login Image'}
            src={'/assets/step-1.svg'}
            position="relative"
            // margin={marginValue}
            padding={['1.5rem', '1.5rem', '1.5rem', '1.875rem']}
            display="block"
          />

          <Hide below="2xl">
            <IconButton
              aria-label="thunderbolt"
              borderRadius={'50%'}
              position={'absolute'}
              top={'41%'}
              left={'1%'}
              icon={
                <Image
                  src="/assets/thunderbolt-1.svg"
                  alt="thunderbolt"
                  boxSize="1.5rem"
                />
              }
            />
          </Hide>
        </Box>
      </Flex>

      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'2xl'}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Image alt="Brand" src="/brand.svg" mb="2.78125rem" />
            <Text fontWeight={'bold'} fontSize={'24px'} as={'span'}>
              Registro
            </Text>{' '}
          </Heading>
          <Form />
          
        </Stack>
      </Flex>
    </Stack>
  )
}
