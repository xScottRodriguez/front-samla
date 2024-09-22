import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery as originalFetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import {
  ApiError,
  ApiSuccess,
  IFormValues,
  IUserResponse,
  TData,
  TPagination,
} from './interfaces'
import { clearLocalStorage, getLocalStorage } from '../utils'
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
const baseQuery = originalFetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers) => {
    const token = getLocalStorage('token')
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs, // Tipo de los argumentos
  unknown, // Tipo del resultado (puede ser unknown si no tienes un tipo definido)
  FetchBaseQueryError // Tipo de los errores
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.data==='Unauthorized') {
    clearLocalStorage()
    window.location.href = '/login'
    return { error: result.error }
  }

  return result
}

export const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: baseQueryWithReauth,
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
    getRegistrationRequests: builder.query<TPagination, void>({
      query: () => ({
        url: '/auth/registration-requests',
        method: 'GET',
      }),
      transformResponse: (
        response: ApiSuccess<TData[]>,
      ): TPagination<TData[]> => {
        return {
          data: response.data,
          meta: response.meta,
        }
      },
    }),

    getDocuments: builder.query({
      query: () => ({ url: '/generals/documents', method: 'GET' }),
    }),
    getDepartments: builder.query({
      query: () => ({
        url: '/generals/departments',
        method: 'GET',
      }),
    }),
    getMunicipalities: builder.query({
      query: ({ departmentId = '' }: { departmentId: string }) => {
        const params = departmentId ? { departmentId } : null
        if (!params) {
          return {
            url: '/generals/municipalities',
            method: 'GET',
          }
        }

        return {
          url: `/generals/municipalities`,
          method: 'GET',
          params,
        }
      },
    }),
  }),
})

export const {
  useSendRegistrationRequestMutation,
  useSignInMutation,
  useGetRegistrationRequestsQuery,
  useGetDocumentsQuery,
  useGetDepartmentsQuery,
  useGetMunicipalitiesQuery,
  useLazyGetMunicipalitiesQuery,
} = appApi
