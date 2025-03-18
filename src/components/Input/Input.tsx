import { InputProps } from "./type"

function Input({
  name,
  type = "text",
  placeholder,
  label,
  input_id,
  value,
  onChange,
  errorMessage,
}: InputProps) {
    
  return (
    <div className="mb-6">
      <div className="relative">
        <label
          htmlFor={input_id}
          className="absolute -top-3 left-3 bg-white px-1 text-sm font-semibold text-gray-800 z-10"
        >
          {label}
        </label>
        <input
          className={`block w-full px-4 pt-5 py-3 border-1 rounded-md focus:outline-none ${
            errorMessage ? "border-red-500" : "border-gray-400"
          }`}
          name={name}
          id={input_id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
      {errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  )
}

export default Input
