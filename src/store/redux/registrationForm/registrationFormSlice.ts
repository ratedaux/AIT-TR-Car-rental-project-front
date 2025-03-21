import { createAppSlice } from "store/createAppSlice"
import { UserState, RegistrationFormValues } from "./type"


const initialState: UserState = {
  loading: false,
  error: null,
  success: false,
};

export const userRegisterSlice = createAppSlice({
  name: 'user',
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
  },
  selectors: {

    selectLoading: (state: UserState) => state.loading,
    selectError: (state: UserState) => state.error,
    selectSuccess: (state: UserState) => state.success,
  },
});


export const counterActions = userRegisterSlice.actions
export const counterSelectors = userRegisterSlice.selectors

