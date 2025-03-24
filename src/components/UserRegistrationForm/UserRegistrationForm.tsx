import Button from "components/Button/Button"
import Input from "components/Input/Input"
import * as Yup from "yup"
import { useEffect } from "react"
import car_foto_for_login from "../../assets/car_foto_for-login.jpg"
import { useFormik } from "formik"
import { RegisrtationFormValues } from "./types"

function UserRegistrationForm() {
  useEffect(() => {
    // Прокрутка страницы вверх
    window.scrollTo(0, 0)
  }, [])

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  const validationSchema = Yup.object({
    userFirstName: Yup.string()
      .required("First name is required")
      .min(2, "First Name must have at least 2 characters"),
    userLastName: Yup.string()
      .required("Last name is required")
      .min(2, "Last Name must have at least 2 characters"),
    userEmail: Yup.string()
      .email("Invalid email format")
      .required("Email is required")
      .typeError("Email must be a string"),
    userPassword: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        passwordRegex,
        "Password must include at least one uppercase letter, one number, and one special character",
      ),
  })

  const formik = useFormik({
    initialValues: {
      userFirstName: "",
      userLastName: "",
      userEmail: "",
      userPassword: "",
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
    <div className="flex justify-center items-center">
      <div className="w-[500px] rounded-lg p-8 bg-white ">
        {" "}
        {/* border border-gray-300 */}
        <h2 className="mt-6 text-3xl font-semibold text-gray-900 text-center">
          Create your account
        </h2>
        <form onSubmit={formik.handleSubmit} className="mt-12">
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <Input
                name="userFirstName"
                placeholder="Enter your first name"
                value={formik.values.userFirstName}
                label="First Name"
                onChange={formik.handleChange}
              />
              <div className="min-h-[10px] text-red-500 text-sm mt-3">
                {formik.errors.userFirstName && formik.touched.userFirstName
                  ? formik.errors.userFirstName
                  : ""}
              </div>
            </div>
            <div>
              <Input
                name="userLastName"
                placeholder="Enter your last name"
                value={formik.values.userLastName}
                label="Last Name"
                onChange={formik.handleChange}
              />
              <div className="min-h-[10px] text-red-500 text-sm mt-3">
                {formik.errors.userLastName && formik.touched.userLastName
                  ? formik.errors.userLastName
                  : ""}
              </div>
            </div>
          </div>

          <div>
            <Input
              name="userEmail"
              type="email"
              placeholder="Enter your email"
              value={formik.values.userEmail}
              label="Email"
              onChange={formik.handleChange}
              autoComplete="email"
            />
            <div className="min-h-[16px] text-red-500 text-sm mt-3">
              {formik.errors.userEmail && formik.touched.userEmail
                ? formik.errors.userEmail
                : ""}
            </div>
          </div>
          <div>
            <Input
              name="userPassword"
              type="password"
              placeholder="Enter your password"
              value={formik.values.userPassword}
              label="Password"
              onChange={formik.handleChange}
              autoComplete="current-password"
            />
            <div className="min-h-[16px] text-red-500 text-sm mt-3">
              {formik.errors.userPassword && formik.touched.userPassword
                ? formik.errors.userPassword
                : ""}
            </div>
          </div>

          <label className="flex items-center mb-4 cursor-pointer">
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
              !formik.values.userFirstName ||
              !formik.values.userLastName ||
              !formik.values.userEmail ||
              !formik.values.userPassword
            }
          />
        </form>
      </div>
      <img
        src={car_foto_for_login}
        alt="auto"
        className="w-1/3 h-126 rounded-lg ml-6"
      />
    </div>
  )
}

export default UserRegistrationForm
