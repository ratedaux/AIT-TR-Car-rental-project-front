import axios from "axios"
import { createAppSlice } from "store/createAppSlice"

const initialAuthState: AuthSliceState = {
  user: null,
  loginError: undefined,  
  registerError: undefined,
  status: "default",
  successMessage: undefined,
  registerMessage: undefined,
}

const LOGIN_URL = "/api/auth/login"
const LOGOUT_URL = "/api/auth/logout"
const REGISTER_URL = "/api/auth/register"

export const authSlice = createAppSlice({
  name: "AUTH",
  initialState: initialAuthState,
  reducers: create => ({
    loginUser: create.asyncThunk(
      async (
        { email, password }: { email: string; password: string },
        thunkApi,
      ) => {
        try {
          const response = await axios.post(LOGIN_URL, { email, password })
          return response.data
        } catch (error: any) {
          return thunkApi.rejectWithValue(
            error.response?.data?.message || "Login failed",
          )
        }
      },
      {
        pending: (state: AuthSliceState) => {
          state.status = "loading"
          state.loginError = undefined
          state.successMessage = undefined
        },
        fulfilled: (state: AuthSliceState, action: any) => {
          state.status = "success"
          state.user = action.payload
          state.loginError = undefined
          state.successMessage = "Login successful!"
        },
        rejected: (state: AuthSliceState, action: any) => {
          state.status = "error"
          state.loginError = action.payload || "Something went wrong"
          state.successMessage = undefined
        },
      },
    ),
    //  logoutUser
    //  registerNewCustomer
    registerNewCustomer: create.asyncThunk(
      async (
        {
          firstName,
          lastName,
          email,
          password,
        }: {
          firstName: string
          lastName: string
          email: string
          password: string
        },
        thunkApi,
      ) => {
        try {
          const response = await axios.post(REGISTER_URL, {
            firstName,
            lastName,
            email,
            password,
          })
          return response.data
        } catch (error: any) {
          return thunkApi.rejectWithValue(
            error.response?.data?.message || "Registration failed",
          )
        }
      },
      {
        pending: state => {
          state.status = "loading"
          state.registerError = undefined
        },
        fulfilled: (state, action) => {
          state.status = "success"
          state.user = action.payload 
          state.registerError = undefined
          state.registerMessage = "Registration successful!";
        },
        rejected: (state, action) => {
          state.status = "error"
          state.registerMessage = undefined;
          state.registerError = typeof action.payload === 'string' ? action.payload : 'Something went wrong';
         /*  state.registerError = action.payload ||'Something went wrong';  */
        },
      },
    ),
  }),
  selectors: {
    userData: (state: AuthSliceState) => state.user,
    authStatus: (state: AuthSliceState) => state.status,
    loginError: (state: AuthSliceState) => state.loginError, 
    registerError: (state: AuthSliceState) => state.registerError, 
    successMessage: (state: AuthSliceState) => state.successMessage,
    registerMessage: (state: AuthSliceState) => state.registerMessage, 
  },
})

export const authActions = authSlice.actions
export const authSelectors = authSlice.selectors
