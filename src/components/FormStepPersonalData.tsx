import {
  Button,
  Flex,
  Heading,
  Hide,
  IconButton,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';

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
          position="absolute"
          margin="8.875rem"
          display="block"
        />
        <Hide below="2xl"> {/* Usa el breakpoint personalizado */}
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
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: '30%',
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'blue.400',
                zIndex: -1,
              }}
            >
              Freelance
            </Text>
            <br />{' '}
            <Text color={'blue.400'} as={'span'}>
              Design Projects
            </Text>{' '}
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
            The project board is an exclusive resource for contract work.
            It&apos;s perfect for freelancers, agencies, and moonlighters.
          </Text>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <Button
              rounded={'full'}
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
            >
              Create Project
            </Button>
            <Button rounded={'full'}>How It Works</Button>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
};
