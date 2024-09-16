import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { FormStepPersonalData } from './FormStepPersonalData'
import { AddressForm } from './AddressForm'
import { SelfieForm } from './SelfieForm'

export default function Multistep() {
  const toast = useToast()
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(33.33)

  return (
    <>
      <Box as="form">
     
        {step === 1 ? (
          <FormStepPersonalData />
        ) : step === 2 ? (
          <AddressForm />
        ) : (
          <SelfieForm />
        )}
        {/* <ButtonGroup  w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1)
                  setProgress(progress - 33.33)
                }}
                isDisabled={step === 1}
                colorScheme="teal"
                variant="solid"
                w="7rem"
                mr="5%"
              >
                Back
              </Button>
              <Button
                w="7rem"
                isDisabled={step === 3}
                onClick={() => {
                  setStep(step + 1)
                  if (step === 3) {
                    setProgress(100)
                  } else {
                    setProgress(progress + 33.33)
                  }
                }}
                colorScheme="teal"
                variant="outline"
              >
                Next
              </Button>
            </Flex>
            {step === 3 ? (
              <Button
                w="7rem"
                colorScheme="red"
                variant="solid"
                onClick={() => {
                  toast({
                    title: 'Account created.',
                    description: "We've created your account for you.",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  })
                }}
              >
                Submit
              </Button>
            ) : null}
          </Flex>
        </ButtonGroup> */}
      </Box>
    </>
  )
}
