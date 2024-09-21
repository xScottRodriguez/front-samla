export interface IFormValues {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  identificationType: string
  identificationNumber: string
  address: string
  region: string
  city: string
  monthlyIncome: string
  front: File | null
  back: File | null
  selfie: File | null
}

export interface ApiError {
  status: number
  message: string
  data: null
  errors: Array<{
    msg: string
    path: string
  }>
}

export interface Meta {
  page: Page
  total: number
}

export interface Page {
  next: null
  prev: null
  count: null
}

export interface ApiSuccess<T> {
  status: number
  message: string
  data: T
  errors: null
  meta?: Meta
}

export type TPagination<T = any> = Pick<ApiSuccess<T>, 'meta' | 'data'>

export interface IUserResponse {
  user: User
  token: string
}

export interface User {
  id: string
  email: string
}
export interface TData {
  _id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  identificationType: string
  identificationNumber: string
  region: string
  city: string
  address: string
  monthlyIncome: number
  identificationFront: string
  identificationBack: string
  selfie: string
  __v: number
}

export interface ICommonData {
  _id: string
  name: string
  _v: string
}

export interface IcommonAdapter {
  id: string
  name: string
  departmentId?: string
}

export interface IAdapterResponse {
  label: string
  value: string
  departmentId?: string
}
export type IcommonAdapterWithoutDepartment = Omit<
  IAdapterResponse,
  'departmentId'
>
