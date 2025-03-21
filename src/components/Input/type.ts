import { ChangeEvent } from "react"

type AutocompleteTypes = "email" | "current-password" | "username" | "new-password" | "off" | undefined;

export interface InputProps {

  name: string
  type?: "text" | "email" | "password" | "tel" | "url" | "number" | "date" | "checkbox"
  placeholder?: string
  label?: string
  input_id?: string
  value: string
  errorMessage?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  min?: string;
  autoComplete?: AutocompleteTypes; 

}

