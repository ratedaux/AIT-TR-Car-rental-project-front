import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createAppSlice } from "store/createAppSlice"


const authInitialState: AuthSliceState = {
  user: null,
  error: undefined,
  status: "default",
}

export const loginUser = createAsyncThunk(
  'auth/loginUser', 
  async (loginData: { email: string; password: string }, thunkApi) => {
    try {
      const response = await axios.post('/api/login', loginData)// заменить на наш API 
      return response.data // Возвращаем данные пользователя
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data?.message || 'Login failed')
    }
  }
)


export const authSlice = createAppSlice({
    name: "AUTH",
    initialState: authInitialState,
    reducers: {
      logout: (state: AuthSliceState) => {
        state.user = null
        state.error = undefined
        state.status = "default"
      },
    },
    
    extraReducers: (builder) => {
      builder
        .addCase(loginUser.pending, (state) => {
          state.status = "loading"
          state.error = undefined
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.status = "success"
          state.user = action.payload
          state.error = undefined
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.status = "error"
          state.error = typeof action.payload === 'string' ? action.payload : 'Unknown error'
        })
    },

    selectors: {
      // данные пользователя
      userData: (state: AuthSliceState) => state.user,
      // статус
      authStatus: (state: AuthSliceState) => state.status,
      // ошибка
      authError: (state: AuthSliceState) => state.error,
    }
  })
  
 
  
  export const authActions = authSlice.actions
  export const authSelectors = authSlice.selectors