import Button from "components/Button/Button"
import Input from "components/Input/Input"
import * as Yup from "yup"
import { useEffect } from "react"
import imgRegistrationForm from "../../assets/imgRegistrationForm.jpg"
import { useFormik } from "formik"
import { RegisrtationFormValues } from "./types"

type UserRegistrationFormProps = {
  img?: boolean
}

function UserRegistrationForm({img= true}: UserRegistrationFormProps) {
  useEffect(() => {
    // Прокрутка страницы вверх
    window.scrollTo(0, 0)
  }, [])

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("First name is required")
      .min(2, "Must have at least 2 characters"),
    lastName: Yup.string()
      .required("Last name is required")
      .min(2, "Must have at least 2 characters"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required")
      .typeError("Email must be a string"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        passwordRegex,
        "Password must include at least one uppercase letter, one number, and one special character",
      ),
  })

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      isChecked: false,
    } as RegisrtationFormValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: (values: RegisrtationFormValues) => {
      console.table(values) // временно
      /* dispatch(registerUser(values)); */
      formik.resetForm()
    },
  })

  return (
    <div className="flex justify-center items-center mt-12 px-4 sm:px-6 lg:px-8">
      <div className="w-[500px] sm:w-[450px] lg:w-[500px] xl:w-[550px] rounded-lg p-8 bg-white lg:bg-transparent"> {/* bg-white max-h-[90vh] */}
        {" "}
        {/* border border-gray-300 */}
        <h2 className="mt-6 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 text-center">
          Create your account
        </h2>
        <form onSubmit={formik.handleSubmit} className="mt-12">
          <div className="grid gap-3 mb-6 md:grid-cols-2">
            <div className="relative">
              <Input
                name="firstName"
                placeholder="Enter your first name"
                value={formik.values.firstName}
                label="First Name"
                onChange={formik.handleChange}
              
              />
              <div className="absolute text-red-500 text-sm top-16">
                {formik.errors.firstName && formik.touched.firstName
                  ? formik.errors.firstName
                  : ""}
              </div>
            </div>
            <div className="relative -mb-2">
              <Input
                name="lastName"
                placeholder="Enter your last name"
                value={formik.values.lastName}
                label="Last Name"
                onChange={formik.handleChange}
              />
              <div className="absolute text-red-500 text-sm top-16">
                {formik.errors.lastName && formik.touched.lastName
                  ? formik.errors.lastName
                  : ""}
              </div>
            </div>
          </div>

          <div className="relative mb-8">
            <Input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formik.values.email}
              label="Email"
              onChange={formik.handleChange}
              autoComplete="email"
            />
            <div className="absolute text-red-500 text-sm top-4">
              {formik.errors.email && formik.touched.email
                ? formik.errors.email
                : ""}
            </div>
          </div>
          <div >
            <Input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formik.values.password}
              label="Password"
              onChange={formik.handleChange}
              autoComplete="current-password"
            />
            <div className="text-red-500 text-sm mb-4 h-6">
              {formik.errors.password && formik.touched.password
                ? formik.errors.password
                : ""}
            </div>
          </div>
        

          <label className="flex items-center mb-4 cursor-pointer mt-[-8px]">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-red-500"
              id="termsCheckbox"
              checked={formik.values.isChecked}
              onChange={formik.handleChange}
              name="isChecked"
            />
            <span className="ml-2 text-gray-700">
              I agree to all the{" "}
              <a href="#" className="text-red-500 underline">
                Terms{" "}
              </a>
              and{" "}
              <a href="#" className="text-red-500 underline">
                Privacy Policies
              </a>
            </span>
          </label>

          <Button
            name="Create"
            type="submit"
            disabled={
              !formik.values.isChecked ||
              !formik.values.firstName ||
              !formik.values.lastName ||
              !formik.values.email ||
              !formik.values.password
            }
          />
        </form>
      </div>
          {img && (
            <div className="hidden lg:block w-[550px] h-[650px] relative ml-6">
              <img
        src={imgRegistrationForm}
        alt="auto"
        className=" rounded-xl shadow-md w-full h-full object-cover"/*  w-1/3 h-126 rounded-lg ml-6 */
      />
            </div>

          )}

    </div>
    
  )
}

export default UserRegistrationForm
