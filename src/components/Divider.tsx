import { Box, Flex, Divider, Text } from '@chakra-ui/react'

export const DividerWithCircle = () => {
  return (
    <Flex align="center" justify="center" my={6} w="full">
      <Divider borderColor="white" />
      <Box
        mx={4}
        p={1}
      >
        <Text fontSize="sm">O</Text>
      </Box>
      <Divider borderColor="white" />
    </Flex>
  )
}
