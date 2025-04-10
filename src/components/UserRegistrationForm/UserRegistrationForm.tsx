import Button from "components/Button/Button"
import Input from "components/Input/Input"
import * as Yup from "yup"
import { useEffect, useState } from "react"
import imgRegistrationForm from "../../assets/imgRegistrationForm.jpg"
import { useFormik } from "formik"
import { RegisrtationFormValues } from "./types"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { authActions, authSelectors } from "store/redux/AuthSlice/authSlice"
//import NotificationMessage from "components/Notification/Notification"
import Notification from "components/Notification/Notification1"
import Loader from "components/Loader/Loader"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

type UserRegistrationFormProps = {
  img?: boolean
}

function UserRegistrationForm({ img = true }: UserRegistrationFormProps) {
  useEffect(() => {
    // Прокрутка страницы вверх
    window.scrollTo(0, 0)
  }, [])

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const status = useAppSelector(authSelectors.authStatus)
  const registerError = useAppSelector(authSelectors.registerError)
  const registerMessage = useAppSelector(authSelectors.registerMessage)
  const isEmailConfirmed = useAppSelector(authSelectors.isEmailConfirmed)

  const [showPassword, setShowPassword] = useState(false)
  const [isNotificationVisible, setIsNotificationVisible] = useState(false)

  const onHandleCloseNotification = () => {
    setIsNotificationVisible(false)
    /* if (isEmailConfirmed) {
      navigate("/login")
    } */
  }

  useEffect(() => {
    if (registerError || registerMessage /* || isEmailConfirmed */) {
      setIsNotificationVisible(true)
    }
  }, [registerError, registerMessage/* , isEmailConfirmed */])


  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/

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
        "Password must include an uppercase letter, a number, and a special character (# ? ! @ $ % ^ & * -)",
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

    onSubmit: async (values: RegisrtationFormValues) => {
      console.table(values) // временно
     await dispatch(authActions.registerNewCustomer(values))
      formik.resetForm()
      setIsNotificationVisible(true)
      navigate(`/confirm-email/${values.email}`);
    },
  })

  return (
    <div className="flex justify-center items-center -mt-4 px-4 sm:px-6 lg:px-8">
      <div className="w-[300px] sm:w-[300px] lg:w-[350px] xl:w-[400px] rounded-lg p-2 bg-white lg:bg-transparent">
        <h2 className="mt-6 text-xl sm:text-1xl md:text-2xl lg:text-2xl font-semibold text-gray-900 text-center">
          Create your account
        </h2>
        <form onSubmit={formik.handleSubmit} className="mt-12 relative">
          {isNotificationVisible && (registerError || registerMessage) && (
            <div className="absolute top-64 left-0 w-full flex justify-center z-50">
              {registerError && (
                <Notification
                  topic="Error"
                  message={registerError}
                  onClose={onHandleCloseNotification}
                />
              )}
              {registerMessage && (
                <Notification
                  topic="Success"
                  message={registerMessage}
                  onClose={onHandleCloseNotification}
                />
              )}
              {registerMessage && (
                <Notification
                  topic="Success"
                  message={registerMessage}
                  onClose={onHandleCloseNotification}
                />
              )}
            </div>
          )}
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
            <div className="relative">
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

          <div className="relative mb-8">
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formik.values.password}
              label="Password"
              onChange={formik.handleChange}
              autoComplete="current-password"
            />

            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 translate-y-[-32px] cursor-pointer"
            >
              {showPassword ? (
                <FaEyeSlash className="h-5 w-5 text-gray-500" />
              ) : (
                <FaEye className="h-5 w-5 text-gray-500" />
              )}
            </div>

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
          {status === "loading" && (
        <div className="flex justify-center items-center mt-4">
          <Loader />
        </div>
      )}
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
     {/*  {status === "loading" && (
        <div className="flex justify-center items-center mt-4">
          <Loader />
        </div>
      )} */}
      {img && (
        <div className="hidden lg:block w-[350px] h-[450px] relative ml-6">
          <img
            src={imgRegistrationForm}
            alt="auto"
            className="rounded-xl shadow-md w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  )
}

export default UserRegistrationForm
