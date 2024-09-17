import { Button,  } from '@chakra-ui/react'
import { FC } from 'react'

interface StepButtonProps {
  handleSubmit: () => void
}
export const StepButton: FC<StepButtonProps> = ({ handleSubmit }) => {
  return (
    <Button
      w="full"
      bg={'brand.500'}
      color={'white'}
      _hover={{
        bg: 'brand.6`00',
      }}
      _active={{
        bg: 'brand.600',
      }}
      onClick={handleSubmit}
    >
      Continuar
    </Button>
  )
}
