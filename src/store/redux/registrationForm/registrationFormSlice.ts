import { createAppSlice } from "store/createAppSlice"
import { AuthState } from "./type"



const initialState: AuthState = {
  user: null,
  token: null,
  status: 'idle',
  error: null,
  success: undefined,
  loading: undefined
};

/* 
export const registerUser = createAsyncThunk(
 
); */

export const userRegisterSlice = createAppSlice({
  name: 'REGISTRATION',
  initialState,
  reducers: {
  },
 /*  extraReducers:(builder) =>{
   builder
   .addCase(registerUser.pending, (state)=>{
state.status = 'loading';
   })
   .addCase(registerUser.fulfilled, (state, action) =>{
    state.status = 'succeeded';
    //
   })
   .addCase(registerUser.rejected, (state, action) => {
state.status = 'failed'
   })
  }, */
  selectors: {

    selectLoading: (state: AuthState) => state.loading,
    selectError: (state: AuthState) => state.error,
    selectSuccess: (state: AuthState) => state.success,
  },
});


export const counterActions = userRegisterSlice.actions
export const counterSelectors = userRegisterSlice.selectors

