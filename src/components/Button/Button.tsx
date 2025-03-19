import { ButtonProps } from "./types"

function Button({
  name = "Sign Up",
  type = "button",
  onClick,
  disabled,
  width = "w-full",  
  height = "max-h-[60px]",
  color = "bg-red-600"
}: ButtonProps) {

    const baseClasses = "px-[54px] py-[20px] gap-2 text-x2  font-medium rounded-md flex items-center justify-center";

    const colorClasses = disabled
    ? "bg-gray-500 text-white opacity-50 cursor-not-allowed"  // серый цвет для disabled
    : `${color} hover:${color.replace("bg-", "hover:bg-")} text-white font-bold`;
  
    const buttonClasses = `${baseClasses} ${colorClasses} ${width} ${height}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {name}
    </button>
  )
}

export default Button
