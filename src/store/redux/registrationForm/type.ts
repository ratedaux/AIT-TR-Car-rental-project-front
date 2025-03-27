export interface RegistrationFormValues {
firstName: string;
lastName: string;
email: string;
password: string;
isChecked: boolean;
  }
  
  export interface UserState {
    loading: boolean;
    error: string | null;
    success: boolean;
  }
  
  