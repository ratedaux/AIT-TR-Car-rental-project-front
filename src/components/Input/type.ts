import { ChangeEvent } from "react"

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
  min?: string
  options?: string[]; // For dropdown options
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void
  accept?: string
}
