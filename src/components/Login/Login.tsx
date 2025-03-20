import Button from "components/Button/Button"
import Input from "components/Input/Input"
import { Link } from "react-router-dom"
import car_foto_for_login from "../../assets/car_foto_for-login.jpg"

type LoginProps = {
  showHeader?: boolean; 
  img?: boolean
};

function Login({ showHeader = true, img = true }: LoginProps) {
  return (
    <div className="flex flex-col w-full max-w-sm p-6">
      {showHeader && (
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2 text-left">Login</h2>
          <p className="mb-4 text-left text-gray-600">
            Login to access your account
          </p>
        </div>
      )}
      <form className="mb-4">
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
        <Button name="Login" />
      </form>
      <p className="text-center mt-2">
        Don’t have an account?{" "}
        <Link to="/login/registration" className="text-red-500">
          Sign up
        </Link>
      </p>

      {img && (
        <img
          src={car_foto_for_login}
          alt="auto"
          className="w-full h-40 object-cover rounded-lg mt-4"
        />
      )}
    </div>
  );
}

export default Login;
