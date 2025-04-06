import { Outlet, useNavigate } from "react-router-dom"

function AdminPage() {
  const navigate = useNavigate()

  const showCustomersList = () => navigate("/admin/allUsers")
  const showBookingsList = () => navigate("/admin/allBookings")
  const showCarsList = () => navigate("/admin/allCars")
  const showAddNewCarForm = () => navigate("/admin/newCar")

  return (
    <div className="flex flex-row w-auto bg-gray-100 justify-center rounded-lg">
      {/* left block  */}
      <div className="w-1/4  items-center m-6 ">
        {/* navigation */}
        <div className="flex flex-col w-auto  mt-4 ">
          <div className="bg-black text-white font-bold  rounded-tl-lg rounded-tr-lg p-3 ">
            Navigation:
          </div>
          <nav className="flex flex-col  bg-white p-3 gap-3 rounded-lg rounded-br-lg">
            <button
              onClick={showAddNewCarForm}
              className="text-black hover:text-red-700 text-lg text-left hover:underline  "
            >
              Add car
            </button>
            <button
              onClick={showCarsList}
              className="text-black hover:text-red-700 text-lg text-left hover:underline "
            >
              Cars
            </button>
            <button
              onClick={showBookingsList}
              className="text-black hover:text-red-700 text-lg text-left hover:underline "
            >
              Bookings
            </button>
            <button
              onClick={showCustomersList}
              className="text-black hover:text-red-700 text-lg text-left hover:underline "
            >
              Customers
            </button>
          </nav>
        </div>
      </div>

      {/* right block with container for components */}
      <div className="flex flex-col w-3/4 m-6">
        <Outlet />
      </div>
    </div>
  )
}
export default AdminPage
