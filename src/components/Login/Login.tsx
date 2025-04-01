import Button from "components/Button/Button"
import Input from "components/Input/Input"
import { Link } from "react-router-dom"
import fotoCar from "../../assets/fotoCar.jpg"
import * as Yup from "yup"
import { useFormik } from "formik"

import { authActions, authSelectors } from "store/redux/AuthSlice/authSlice"
import { useAppDispatch, useAppSelector } from "store/hooks"
import Loader from "components/Loader/Loader"
import NotificationMessage from "components/Notification/Notification"

type LoginProps = {
  showHeader?: boolean
  img?: boolean
}

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Field email is required")
    .email("Field must be a valid email")
    .max(40, "Max 40 symbols")
    .min(10, "Min 10 symbols")
    .typeError("Email must be string"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      passwordRegex,
      "Password must include at least one uppercase letter, one number, and one special character",
    ),
})

function Login({ showHeader = true, img = true }: LoginProps) {
  const dispatch = useAppDispatch()

  const user = useAppSelector(authSelectors.userData)
  const status = useAppSelector(authSelectors.authStatus)
  const loginError = useAppSelector(authSelectors.loginError)
  const successMessage = useAppSelector(authSelectors.successMessage)

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: values => {
      // временно для проверки
      console.table(values)
      dispatch(
        authActions.loginUser({
          email: values.email,
          password: values.password,
        }),
      )

      formik.resetForm()
    },
  })

  return (
    <div className="flex justify-center items-center -mt-4 px-4 sm:px-6 lg:px-8">
      <div className="w-full sm:w-[250px] lg:w-[300px] xl:w-[350px] max-w-full rounded-lg p-4 bg-white lg:bg-transparent">
        <div className="flex flex-col w-full">
          {showHeader && (
            <div className="mb-4">
              <h2 className="text-1xl sm:text-1xl lg:text-3xl font-bold mb-2 text-left">
                Login
              </h2>
              <p className="text-1xl text-left text-gray-600">
                Login to access your account
              </p>
            </div>
          )}
          <form onSubmit={formik.handleSubmit} className="mb-4">
            <div className="mb-6 mt-8 w-full">
              <Input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formik.values.email}
                label="Email"
                onChange={formik.handleChange}
                autoComplete="email"
              />
              <div className="text-red-500 text-sm sm:text-base mt-3">
                {formik.errors.email && formik.touched.email
                  ? formik.errors.email
                  : ""}
              </div>
            </div>

            <div className="relative mb-6 mt-8 pb-4 w-full">
              <Input
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formik.values.password}
                label="Password"
                onChange={formik.handleChange}
                autoComplete="current-password"
              />
              <div className="absolute text-red-500 text-xs sm:text-sm mt-1 left-0 bottom-[-20px]">
                {formik.errors.password && formik.touched.password
                  ? formik.errors.password
                  : ""}
              </div>
            </div>

            <Button
              type="submit"
              name="Login"
              disabled={!formik.values.email || !formik.values.password}
            />

            {status === "loading" && (
              <div className="flex justify-center items-center mt-4">
                <Loader />
              </div>
            )}

            {loginError && <NotificationMessage type="error" message={loginError} />}
            {successMessage && (
              <NotificationMessage type="success" message={successMessage} />
            )}
          </form>
          <p className="text-center mt-4">
            Don’t have an account?{" "}
            <Link to="/login/registration" className="text-red-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      {img && (
        <div className="hidden lg:block w-[350px] h-[450px] relative ml-6">
          <img
            src={fotoCar}
            alt="auto"
            className="rounded-xl shadow-md w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  )
}

export default Login