import Button from "components/Button/Button"
import Input from "components/Input/Input"
import { Link } from "react-router-dom"
import car_foto_for_login from "../../assets/car_foto_for-login.jpg"
import * as Yup from "yup"
import { useFormik } from "formik"
import { useDispatch } from "react-redux"

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
    .max(40, "Max 20 symbols")
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
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: values => {
      console.table(values) // временно для проверки
      formik.resetForm()
    },
  })


const dispatch = useDispatch();

const handleLogin = () => {}


  return (
    <div className="flex justify-center items-center mt-12 px-4 sm:px-6 lg:px-8">
      <div className="w-[450px] sm:w-[450px] lg:w-[500px] xl:w-[550px] rounded-lg p-4 bg-white shadow-lg margin: auto ">
        {" "}
        {/* border border-gray-300 */}
        <div className="flex flex-col w-full "> {/* max-w-sm p-6 */}
          {showHeader && (
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2 text-left">Login</h2>
              <p className=" text-left text-gray-600">
                Login to access your account
              </p>
            </div>
          )}
          <form onSubmit={formik.handleSubmit} className="mb-4">
            <div className="mb-4 mt-6 w-full">
              <Input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formik.values.email}
                label="Email"
                onChange={formik.handleChange}
                autoComplete="email"
              />
              <div className="min-h-[16px] text-red-500 text-sm mt-3">
                {formik.errors.email && formik.touched.email
                  ? formik.errors.email
                  : ""}
              </div>
            </div>
            <div className="mb-4 mt-6 w-full">
              <Input
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formik.values.password}
                label="Password"
                onChange={formik.handleChange}
                autoComplete="current-password"
              />
              <div className="min-h-[16px] text-red-500 text-sm mt-1">
                {formik.errors.password && formik.touched.password
                  ? formik.errors.password
                  : ""}
              </div>
            </div>

            <Button type="submit" name="Login"
            disabled={
              !formik.values.email ||
              !formik.values.password
            } />
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
        <div className="hidden lg:block w-[450px] h-[550px] relative ml-6">
          <img
            src={car_foto_for_login}
            alt="auto"
            className="rounded-xl shadow-md w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  )
}


export default Login;

