import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface IUiState {
  step: number
}

// Define the initial state using that type
const initialState: IUiState = {
  step: 1,
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
  },
})

export const { nextStep, previousStep } = uiSlice.actions

export const selectUi = (state: RootState) => state.ui
export default uiSlice.reducer
