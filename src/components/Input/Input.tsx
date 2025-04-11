import { InputProps } from "./type";

function Input({
  name,
  type = "text",
  placeholder,
  label,
  input_id,
  value,
  onChange,
  errorMessage,
  autoComplete,
  options,
  onBlur,
  readOnly,
  disabled,
  min,
  max
}: InputProps) {

  // DropDownList
  if (type === "select") {
    return (
      <div className="mb-6">
        <div className="relative">
          <label
            htmlFor={name}
            className="absolute -top-3 left-3 bg-white px-1 text-sm font-semibold text-gray-800 z-10"
          >
            {label}
          </label>
          <select
            name={name}
            className={`bg-white block w-full px-4 pt-5 py-3 border-1 rounded-md focus:outline-none ${errorMessage ? "border-red-500" : "border-gray-400"
              }`}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
          >
            {/* Этот option будет вести себя как placeholder */}
            <option value="" disabled selected className="text-gray-500">
              {placeholder}
            </option>
            {options?.map((option, index) => (
              <option key={index} value={option} className="text-black">
                {option}
              </option>
            ))}
          </select>
          {errorMessage && (
            <div className="text-red-500 text-sm mt-1">{errorMessage}</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="relative">
        <label
          htmlFor={input_id}
          className="absolute -top-3 left-3 bg-white px-1 text-sm font-semibold text-gray-800"
        >
          {label}
        </label>
        <input
          className={`bg-white block w-full px-4 pt-5 py-3 border-1 rounded-md focus:outline-none ${errorMessage ? "border-red-500" : "border-gray-400"
            }`}
          name={name}
          id={input_id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          readOnly={readOnly}
          disabled={disabled}
          min={min}
          max={max}
        />
      </div>
      {errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
}

export default Input;
