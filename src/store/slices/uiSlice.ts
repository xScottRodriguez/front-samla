import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IFormValues } from '../../services/interfaces'

export interface IUiState extends IFormValues {
  step: number
}

// Define the initial state using that type
const initialState: IUiState = {
  step: 1,
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  identificationType: '',
  identificationNumber: '',
  address: '',
  region: '',
  city: '',
  monthlyIncome: '',
  front: null,
  back: null,
  selfie: null,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    nextStep: (state) => {
      if (state.step < 3) state.step = state.step + 1
    },
    previousStep: (state) => {
      if (state.step > 1) state.step = state.step - 1
    },
    setPersonalData: (state, action: PayloadAction<Partial<IUiState>>) => {
      Object.assign(state, action.payload)
    },
    clearState: (state) => {
      state.step = 1
      state.firstName = ''
      state.lastName = ''
      state.email = ''
      state.phoneNumber = ''
      state.identificationType = ''
      state.identificationNumber = ''
      state.address = ''
      state.region = ''
      state.city = ''
      state.monthlyIncome = ''
      state.front = null
      state.back = null
      state.selfie = null
    },
  },
})

export const { nextStep, previousStep, setPersonalData, clearState } =
  uiSlice.actions

export default uiSlice.reducer
