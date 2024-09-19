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
  front: File | null,
  back: File | null,
  selfie: File | null
}



export interface ApiError {
  status: number;
  message: string;
  data: null;
  errors: Array<{
    msg: string;
    path: string;
  }>;
}

