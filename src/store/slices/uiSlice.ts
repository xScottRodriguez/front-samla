import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IFormValues, TData } from '../../services/interfaces'

export interface IUiState extends IFormValues {
  step: number
  isOpen: boolean
  activeItem: TData | null
}

// Define the initial state using that type
const initialState: IUiState = {
  step: 2,
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
  isOpen: false,
  activeItem: null,
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

    toggleModal: (state) => {
      state.isOpen = !state.isOpen
    },
    setActiveItem: (state, action: PayloadAction<TData>) => {
      state.activeItem = action.payload
    },
    clearActiveItem: (state) => {
      state.activeItem = null
    },
  },
})

export const {
  nextStep,
  previousStep,
  setPersonalData,
  clearState,
  toggleModal,
  clearActiveItem,
  setActiveItem,
} = uiSlice.actions

export default uiSlice.reducer
