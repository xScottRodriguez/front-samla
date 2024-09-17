import { Box } from '@chakra-ui/react'
import { FormStepPersonalData } from './personal-data'
import { AddressForm } from './address/AddressForm'
import { SelfieForm } from './SelfieForm'
import { useAppSelector } from '../hooks'

export default function Multistep() {
  const { step } = useAppSelector((state) => state.ui)

  return (
    <>
      <Box as="form">
        {step   === 1 ? (
          <FormStepPersonalData />
        ) : step === 2 ? (
          <AddressForm />
        ) : (
          <SelfieForm />
        )}
       
      </Box>
    </>
  )
}
