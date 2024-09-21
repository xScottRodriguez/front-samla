'use client'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  FormHelperText,
} from '@chakra-ui/react'
import { BrandImage } from '../components/BrandImage'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSignInMutation } from '../services'
import { setLocalStorage } from '../utils'
import { IUserResponse } from '../services/interfaces'
import { useNavigate } from 'react-router-dom'

const loginSChema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

interface ILogin {
  email: string
  password: string
}

export const Login = () => {
  const [triggerSignIn] = useSignInMutation()
  const navigate = useNavigate()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: yupResolver(loginSChema),
  })
  const toast = useToast()
  const onSubmit = (data: ILogin) => {
    toast.promise(triggerSignIn(data).unwrap(), {
      loading: {
        title: 'Iniciando sesión',
      },
      success: (response: IUserResponse) => {
        setLocalStorage('token', response.token)
        setLocalStorage('user', response.user)
        navigate('/dashboard', { replace: true })
        return {
          title: 'Inicio de sesión exitoso',
          description: 'Bienvenido',
          isClosable: true,
        }
      },
      error: (error) => {
        return {
          title: 'Error',
          description: error?.message ?? 'Ha ocurrido un error',
          isClosable: true,
        }
      },
    })
  }
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>
            <BrandImage />
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Sign in to your account
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Controller
                control={control}
                name="email"
                render={({ field }) => <Input type="email" {...field} />}
              />
              {errors.email && (
                <FormHelperText color={'red.500'}>
                  {errors.email.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Controller
                control={control}
                name="password"
                render={({ field }) => <Input type="password" {...field} />}
              />
              {errors.password && (
                <FormHelperText color={'red.500'}>
                  {errors.password.message}
                </FormHelperText>
              )}
            </FormControl>
            <Stack spacing={10}>
              <Button
                bg={'brand.400'}
                color={'white'}
                _hover={{
                  bg: 'brand.500',
                }}
                onClick={handleSubmit(onSubmit)}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
