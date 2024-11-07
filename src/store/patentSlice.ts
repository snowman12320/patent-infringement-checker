import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Product {
  product_name: string;
  infringement_likelihood: 'High' | 'Moderate' | 'Low';
  relevant_claims: string[];
  explanation: string;
  specific_features: string[];
}

interface Analysis {
  patent_id: string;
  company_name: string;
  analysis_date: string;
  top_infringing_products: Product[];
  overall_risk_assessment: string;
}

interface PatentState {
  analysis: Analysis | null;
  loading: boolean;
  error: string | null;
}

const initialState: PatentState = {
  analysis: null,
  loading: false,
  error: null
}

const patentSlice = createSlice({
  name: 'patent',
  initialState,
  reducers: {
    setAnalysis: (state, action: PayloadAction<Analysis>) => {
      state.analysis = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    resetAnalysis: (state) => {
      state.analysis = null
      state.error = null
    }
  }
})

export const { setAnalysis, setLoading, setError, resetAnalysis } = patentSlice.actions
export default patentSlice.reducer
