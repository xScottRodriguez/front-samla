'use client'

import {
  Box,
  Flex,
  IconButton,
  Stack,
  Image,
  useColorModeValue,
} from '@chakra-ui/react'
import { IoIosLogOut } from 'react-icons/io'
import { clearLocalStorage } from '../utils'
import { useNavigate } from 'react-router-dom'

export const Navbar = () => {
  const navigator = useNavigate()
  const logout = () => {
    clearLocalStorage()
    navigator('/', { replace: true })
  }

  return (
    <Box
      bgImage="url('/assets/background.svg')"
      bgSize="cover"
      bgPosition="center"
    >
      <Flex
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        align={'center'}
        mx="auto"
        maxW={'8xl'}
      >
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Flex display={{ base: 'flex', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
        >
          <IconButton
            aria-label="Logout icon"
            colorScheme="ghost"
            fontSize={'1.5rem'}
            icon={<IoIosLogOut />}
            onClick={logout}
          />
        </Stack>
      </Flex>
    </Box>
  )
}

const DesktopNav = () => {
  return (
    <Stack direction={'row'} spacing={4} maxW={'xl'}>
      <Image src="/assets/samla-header.svg" />
    </Stack>
  )
}
