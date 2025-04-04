import Login from "components/Login/Login";

function LoginNotification({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  return (
    <div className="w-full max-w-sm p-6 border border-gray-300 shadow-md rounded bg-white">
      <div className="mb-4">
        <h5 className="text-lg font-bold text-left mb-2">
          Please log in to continue
        </h5>
        <p className="text-sm text-left text-gray-600">
          Please login to continue to the page you have requested
        </p>
      </div>
      <Login 
        showHeader={false} 
        img={false} 
        onLoginSuccess={onLoginSuccess}  // передаем handleLoginSuccess
      />
    </div>
  );
}

export default LoginNotification;




/* 


import Login from "components/Login/Login"
import { useNavigate } from "react-router-dom";


function LoginNotification({ carId, onLoginSuccess }: { carId: string, onLoginSuccess: () => void }) {

  
  const navigate = useNavigate();

 const handleLoginSuccess = () => {
    // скрыть уведомление и перенаправить
    onLoginSuccess();
    navigate(`/rent-car/${carId}`);  
  }; 


  return (
    <div className="w-full max-w-sm p-6 border border-gray-300 shadow-md rounded bg-white ">
      {" "}
      <div className="mb-4">
        <h5 className="text-lg font-bold text-left mb-2">
          Please log in to continue
        </h5>
        <p className="text-sm text-left text-gray-600">
          Please login to continue to the page you have requested
        </p>
      </div>
      <Login showHeader={false} img={false} url={`/rent-car/${carId}`} onLoginSuccess={handleLoginSuccess}   />
    </div>
  )
}
export default LoginNotification  */


