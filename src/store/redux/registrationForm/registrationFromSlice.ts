import { createAppSlice } from "store/createAppSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import {RegisrtationFormStateSlice } from './type'


const registrationFormInitialState: RegisrtationFormStateSlice = {
    userFirstName: "",
    userLastName: "",
    userEmail: "",
    userPhoneNumber: "",
    userPassword: "",
    isChecked: false,
    id: "",
    errors: {
        userFirstName: "",
        userLastName: "",
        userEmail: "",
        userPhoneNumber: "",
        userPassword: "",
      }
};


export const registrationFormSlice = createAppSlice({
  name: "REGISTRATION_FORM",

  initialState: registrationFormInitialState,

  reducers: {
   
    setFieldValue: (state, action) => {
        const { name, value } = action.payload;
        state[name] = value;
      },
  
    // 
    setChecked: (state, action) => {
        state.isChecked = action.payload;
      },
      setError: (state, action: PayloadAction<{ name: keyof RegisrtationFormStateSlice['errors'], error: string }>) => {
        const { name, error } = action.payload;
        state.errors[name] = error;
      },
    resetForm: (state) => {
        // 
        Object.assign(state, registrationFormInitialState);
      }
    },
  
  selectors: {
    formValues: (state: RegisrtationFormStateSlice) => state,
    errors: (state) => state.errors, 
    isChecked: (state: RegisrtationFormStateSlice) => state.isChecked,
  }
});

//
export const registrationFormActions = registrationFormSlice.actions;
export const registrationFormSelectors = registrationFormSlice.selectors;
