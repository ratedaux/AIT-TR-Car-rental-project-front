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
import { useNavigate } from "react-router-dom";
import Notification from "components/Notification/Notification1"
import { useEffect, useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"

/* 
1
customer_1@car-rent.de
Qwertzu12345!$

2
customer_2@cr.de
Qqqqqq1234!


3
customer_3@cr.de
Aaaaaaa1234!$

4-admin
admin_1@car-rent.de
Admin12345!

акт
admin@gmail.com
Yyyyyyy12345!
 */

const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/

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
      "Password must include an uppercase letter, a number, and a special character (# ? ! @ $ % ^ & * -)",
    ),
})


type LoginProps = {
  showHeader?: boolean
  img?: boolean
  onLoginSuccess: () => void;
  url?: string;
  carId?: string | null;
}

function Login({ showHeader = true, img = true, onLoginSuccess, url = "/", carId = null,}: LoginProps) {

  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false)
  const [isNotificationVisible, setIsNotificationVisible] = useState(true)

  /* const user = useAppSelector(authSelectors.userData) */
  const status = useAppSelector(authSelectors.authStatus)
  const loginError = useAppSelector(authSelectors.loginError)
  const successMessage = useAppSelector(authSelectors.successMessage)
  const isLoggedIn = useAppSelector(authSelectors.isLoggedIn);
  const isEmailConfirmed = useAppSelector(authSelectors.isEmailConfirmed);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: values => {
      /* временно для проверки */
       console.log("Login form submitted with:", values);

    /*   if (!isEmailConfirmed) {
       уведомление чтобы подтверлил email  
      console.log("Email is not confirmed");
        return;
      } */
      dispatch(
        authActions.loginUser({
          email: values.email,
          password: values.password,
        }),
      )
      formik.resetForm()
    },
  })


  const onHandleCloseNotification = () => {
    setIsNotificationVisible(false)
  }



  useEffect(() => {
    if (status === "success" && isLoggedIn) {
      onLoginSuccess(); 
  
      const redirectUrl = carId ? `/rent-car/${carId}` : url;
  
      navigate(redirectUrl, { replace: true });
    }
  }, [status, isLoggedIn, carId, onLoginSuccess, navigate, url]);


 /*  useEffect(() => {
    if (status === "success" && isLoggedIn) {
      onLoginSuccess(); 
      navigate(url, { replace: true }); 
    }
  }, [status, isLoggedIn, onLoginSuccess, navigate, url]);
 */

  useEffect(() => {
    if (loginError || successMessage) {
      setIsNotificationVisible(true);
    }
  }, [loginError, successMessage]);

  return (
    <div className="flex justify-center items-center mt-10 px-4 sm:px-6 lg:px-8">
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

          {/*  Notifications */}
          {isNotificationVisible && (loginError || successMessage) && (
            <div className="absolute top-46 left-0 w-full flex justify-center z-50">
              {loginError && (
                <Notification
                  topic="Error"
                  message={loginError}
                  onClose={onHandleCloseNotification} 
                />
              )}
              {successMessage && (
                <Notification
                  topic="Success"
                  message={successMessage}
                  onClose={onHandleCloseNotification} 
                />
              )}
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="mb-4 relative">
            {/* {(loginError || successMessage) && (
        <div className="absolute top-46 left-0 w-full flex justify-center z-50">
          {loginError && <NotificationMessage type="error" message={loginError} />}
          {successMessage && <NotificationMessage type="success" message={successMessage} />}
        </div>
      )} */}

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
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formik.values.password}
                label="Password"
                onChange={formik.handleChange}
                autoComplete="current-password"
              />

              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 translate-y-[-26px] cursor-pointer"
              >
                {showPassword ? (
                  /* EyeOffIcon */
                  <FaEyeSlash className="h-5 w-5 text-gray-500" />
                ) : (
                  <FaEye className="h-5 w-5 text-gray-500" />
                )}
              </div>

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
