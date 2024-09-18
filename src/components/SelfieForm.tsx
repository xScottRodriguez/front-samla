import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'

export const SelfieForm = () => {
  return (
    <Flex minH={'100vh'} justifyContent={'center'} alignItems={'center'}>
      <Box textAlign="center" width="100%" maxW="400px" mx="auto">
        <Image alt="Brand" src="/brand.svg" mx="auto" />
        <Image
          alt="photo camera"
          src="/assets/photo-camera.svg"
          mx="auto"
          my="2.721875rem"
        />
        <Text fontWeight={'bold'} fontSize={'1.5rem'}>
          ¡Es hora de la selfie!
        </Text>
        <Text>Sonríe y asegúrate de tener buena iluminación.</Text>

        <Button
          mt={4}
          bg={'brand.500'}
          color={'white'}
          _hover={{
            bg: 'brand.600',
          }}
          _active={{
            bg: 'brand.600',
          }}
        >
          Continuar
        </Button>
      </Box>
    </Flex>
  )
}
