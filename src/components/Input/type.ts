import { ChangeEvent } from "react";

export interface InputProps {
    name : string;
    type?: "text" | "email" | "password" | "tel" | "url" | "number";
    placeholder?: string;
    label?: string,
    input_id?: string;
    value: string;
    errorMessage? : string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
   
}