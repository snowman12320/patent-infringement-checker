import { configureStore } from '@reduxjs/toolkit'
import patentReducer from './patentSlice'
import formReducer from './formSlice'

export const store = configureStore({
  reducer: {
    patent: patentReducer,
    form: formReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
