import { configureStore } from '@reduxjs/toolkit'
import patentReducer from './patentSlice'

export const store = configureStore({
  reducer: {
    patent: patentReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
