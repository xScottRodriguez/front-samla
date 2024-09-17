import {
  Button,
  Flex,
  Heading,
  Hide,
  IconButton,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Form } from './Form'

export const FormStepPersonalData = () => {
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
        <Image
          alt={'Login Image'}
          src={'/assets/step-1.svg'}
          position="relative"
          // Uso de margin en pantallas grandes y padding en pantallas pequeñas
          margin={{ base: 0, md: '8.875rem' }} // Usar padding en lugar de margin en pantallas pequeñas
          padding={{ base: '2rem', md: 0 }}
          display="block"
        />
        <Hide below="2xl">
          <IconButton
            aria-label="thunderbolt"
            borderRadius={'50%'}
            icon={
              <Image
                src="/assets/thunderbolt-1.svg"
                alt="thunderbolt"
                boxSize="1.5rem"
              />
            }
            position="absolute"
            left={{
              base: '10%',
              md: '10%',
              lg: '26%',
            }}
            top="44%"
            transform="translateY(-50%)"
          />
        </Hide>
      </Flex>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'2xl'}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text as={'h1'} position={'relative'}>
              Sam
              <span
                style={{
                  color: '#0D65FD',
                }}
              >
                la
              </span>
            </Text>
            <Text fontWeight={'bold'} fontSize={'24px'} as={'span'}>
              Registro
            </Text>{' '}
          </Heading>
          <Form />
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <Button
              w="full"
              bg={'brand.500'}
              color={'white'}
              _hover={{
                bg: 'brand.6`00',
              }}
            >
             Continuar
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  )
}
