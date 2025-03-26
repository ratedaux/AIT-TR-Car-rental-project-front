import { ChangeEvent } from "react"

type AutocompleteTypes = "email" | "current-password" | "username" | "new-password" | "off" | undefined;

export interface InputProps {
  name: string
  type?:
    | "text"
    | "email"
    | "password"
    | "tel"
    | "url"
    | "number"
    | "date"
    | "checkbox"
    | "file"
    | "select"
    
  placeholder?: string
  label?: string
  input_id?: string
  value?: string | number 
  errorMessage?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  autoComplete?: AutocompleteTypes; 
  min?: string
  
  options?: string[] | undefined; // For dropdown options
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void
  accept?: string
  readOnly?:boolean
  disabled?:boolean
  checked?: boolean;//for checkbox 18
 }
