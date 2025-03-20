import { ButtonProps } from "./types";

function Button({
  name = "Sign Up",
  type = "button",
  onClick,
  disabled,
  customClasses = "",
}: ButtonProps) {
  const baseClasses =
    "px-[54px] py-[20px] gap-2 text-x2 w-full max-h-[60px] font-medium rounded-md flex items-center justify-center"

  const disabledClasses = disabled
    ? "bg-gray-500 text-white font-bold opacity-50 cursor-not-allowed"
    : "bg-red-600 hover:bg-red-700 text-white font-bold"

  const buttonClasses = `${baseClasses} ${disabledClasses} ${customClasses} `


  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {name}
    </button>
  );
}

export default Button;
