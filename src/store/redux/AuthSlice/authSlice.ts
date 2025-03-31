import axios from "axios";
import { createAppSlice } from "store/createAppSlice"

const initialAuthState: AuthSliceState = {
  user: null,
  error: undefined,
  status: 'default'
}

const LOGIN_URL = '/api/auth/login';
const LOGOUT_URL = '/api/logout';

export const authSlice = createAppSlice({
  name: 'AUTH',
  initialState: initialAuthState,
  reducers: create => ({
    loginUser: create.asyncThunk(
      async (
        {email, password} : {email: string, password: string}, 
        thunkApi
      ) => {
        try {
          const response = await axios.post(LOGIN_URL, {email, password});
        return response.data;
        } catch (error: any){
          return thunkApi.rejectWithValue(error.response?.data?.message || "Login failed");
        }
      },
      {
        pending: (state: AuthSliceState) => {
          state.status = 'loading';
          state.error = undefined;
        },
        fulfilled: (state: AuthSliceState, action: any) => {
          state.status = 'success';
          state.user = action.payload 
          state.error = undefined;
        },
        rejected: ( state: AuthSliceState, action: any) => {
          state.status = 'error';
          state.error = action.payload || 'Something went wrong';
        }
      }
    ),
    //  logoutUser
  }),
  selectors : {
    userData: (state: AuthSliceState) => state.user,
    authStatus: (state: AuthSliceState) => state.status,
    authError: (state: AuthSliceState) => state.error,
  }
});

export const authActions = authSlice.actions;
export const authSelectors = authSlice.selectors;
