import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FormState {
  patentId: string;
  companyName: string;
  isSubmitting: boolean;
}

const initialState: FormState = {
  patentId: 'US-11950529-B2',
  companyName: 'John Deere',
  isSubmitting: false
}

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setPatentId: (state, action: PayloadAction<string>) => {
      state.patentId = action.payload
    },
    setCompanyName: (state, action: PayloadAction<string>) => {
      state.companyName = action.payload
    },
    setIsSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload
    },
    resetForm: (state) => {
      state.patentId = ''
      state.companyName = ''
      state.isSubmitting = false
    }
  }
})

export const { setPatentId, setCompanyName, setIsSubmitting, resetForm } = formSlice.actions
export default formSlice.reducer
