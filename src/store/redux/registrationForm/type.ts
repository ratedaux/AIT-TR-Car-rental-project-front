export interface RegistrationFormValues {
    userFirstName: string;
    userLastName: string;
    userEmail: string;
    userPassword: string;
    isChecked: boolean;
  }
  
  export interface UserState {
    loading: boolean;
    error: string | null;
    success: boolean;
  }
  
  