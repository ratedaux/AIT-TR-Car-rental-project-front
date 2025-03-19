import Button from "components/Button/Button"
import Input from "components/Input/Input"
import { Link } from "react-router-dom"
import fotoCar from "../../assets/fotoCar.jpg"
function Login() {

    return (
      <div className="flex justify-center items-center min-h-screen "> {/* bg-gray-100 */}
        <div className=" p-8   w-full max-w-md ">{/*  bg-white  shadow-md rounded*/}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-6 text-left">Login</h2>
            <p className="mb-4 text-left text-gray-600">
              Login to access your account
            </p>
          </div>
          <form className="mb-6 ">
            <Input
              name="userEmail"
              type="email"
              placeholder="Enter your email"
              value={""}
              label="Email"
              onChange={() => {}}
            />
            <Input
              name="userPassword"
              type="password"
              placeholder="Enter your password"
              value={""}
              label="Password"
              onChange={() => {}}
            />
  
            <div className="flex items-center justify-between my-4">
              <label className="flex items-center mb-4 cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox h5 w-5 text-red-500"
                  id="termsCheckbox"
                  onChange={() => {}}
                />
                <span className="ml-2 text gray-700">Remember me</span>
              </label>
              <a href="#" className="text-red-500 text-sm">
                Forgot Password
              </a>
            </div>
            <Button name="Login"/>
          </form>
          <p className="text-center mt-4">
            Don’t have an account?{" "}
            <Link to="registration" className="text-red-500">
              Sign up
            </Link>
          </p>
        </div>
        <img src={fotoCar} alt="auto" className="w-1/2 h-auto  rounded-lg ml-6" />
        
      </div>
    )
  }
  
  export default Login