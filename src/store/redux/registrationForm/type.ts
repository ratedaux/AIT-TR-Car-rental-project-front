export interface RegistrationFormValues {
firstName: string;
lastName: string;
email: string;
password: string;
isChecked: boolean;
  }
  export interface AuthState {
    success: any;
    loading: any;
    user: any | null;
    token: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }
  
  