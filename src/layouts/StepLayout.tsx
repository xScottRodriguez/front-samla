import { Stack } from '@chakra-ui/react'
import  { FC, PropsWithChildren } from 'react'

export const StepLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      {children}
    </Stack>
  )
}
