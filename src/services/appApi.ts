import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ApiError, ApiSuccess, IFormValues, IUserResponse } from './interfaces'
const handleFormData = (body: Record<string, any>) => {
  const formData = new FormData()

  Object.entries(body).forEach(([key, value]) => {
    if (key === 'identificationType') {
      formData.append(key, 'Dui')
      return
    }

    if (key === 'front' && value instanceof File) {
      formData.append('identificationFront', value)
    } else if (key === 'back' && value instanceof File) {
      formData.append('identificationBack', value)
    } else if (key === 'selfie' && value instanceof File) {
      formData.append('selfie', value)
    } else {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString())
      }
    }
  })

  return formData
}
export const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL ?? 'http://localhost:5173/api',
  }),
  endpoints: (builder) => ({
    sendRegistrationRequest: builder.mutation<ApiSuccess<unknown>, IFormValues>(
      {
        query: (body) => {
          return {
            url: '/auth/register',
            method: 'POST',
            body: handleFormData(body),
          }
        },
        transformErrorResponse: ({ data }) => {
          const error = data as ApiError
          if (!error?.errors.length) {
            return error.message
          }

          return error.errors.map((error) => error.msg).join(', ')
        },
      },
    ),
    signIn: builder.mutation<
      IUserResponse,
      { email: string; password: string }
    >({
      query: (body) => {
        return {
          url: '/auth/login',
          method: 'POST',
          body,
        }
      },
      transformResponse: (
        response: ApiSuccess<IUserResponse>,
      ): IUserResponse => {
        return response.data as IUserResponse
      },
    }),
  }),
})

export const { useSendRegistrationRequestMutation, useSignInMutation } = appApi
