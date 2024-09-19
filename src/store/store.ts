import { configureStore } from '@reduxjs/toolkit'
import uiSlice from './slices/uiSlice'
import { appApi } from '../services'

export const store = configureStore({
  reducer: {
    ui: uiSlice,
    [appApi.reducerPath]: appApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
