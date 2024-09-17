import { Heading, Text } from '@chakra-ui/react'
import { BrandImage } from './BrandImage'
import { FC } from 'react'

interface IProps {
  text: string
}
export const FormHeading: FC<IProps> = ({ text }) => {
  return (
    <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
      <BrandImage />
      <Text fontWeight={'bold'} fontSize={'24px'} as={'span'}>
        {text}
      </Text>
    </Heading>
  )
}
