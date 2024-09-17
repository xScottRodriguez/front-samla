import {
  Box,
  Flex,
  Hide,
  IconButton,
  Image,
  Stack,
} from '@chakra-ui/react'
import { Form } from './Form'
import { StepLayout } from '../../layouts/StepLayout'
import { FormHeading } from '../FormHeading'

export const FormStepPersonalData = () => {
  return (
    <StepLayout>
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
          <FormHeading text="Registro" />
          <Form />
        </Stack>
      </Flex>
    </StepLayout>
  )
}
