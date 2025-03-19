
export  interface RegisrtationFormStateSlice {
    [key: string]: string | boolean | object
    userFirstName: string,
    userLastName: string, 
    userEmail: string, 
    userPhoneNumber: string, 
    userPassword: string,
    id: string,
    isChecked: boolean,
    errors: {
        userFirstName: string;
        userLastName: string;
        userEmail: string;
        userPhoneNumber: string;
        userPassword: string;
      };

  }