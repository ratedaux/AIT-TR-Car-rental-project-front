import BookingComponent from "components/BookingComponent/BookingComponent"
import Button from "components/Button/Button"
import CustomerComponent from "components/CustomerComponent/CustomerComponent"
import { useEffect } from "react"
import { BrowserRouter, Route, Link, Routes, useNavigate } from "react-router-dom"

// example booking data delete later
const bookingData = {
  startDate: "20.03.2025",
  endDate: "21.03.2025",
  carBrand: "Toyota",
  carModel: "Corolla",
  status: false,
  price: 50,
  renterFirstName: "Masha",
  renterLastName: "Neshyna",
  updateBookingDate: "19.03.2025",
  createBookingDate: "18.03.2025",
}

const customerData = {
  firstName: "Masha",
  lastName: "Neshyna",
  email: "test@email.com",
  drivingLicense: "12345QWERTY",
  bornDate: "11.11.1111",
}

function CustomerPage() {
  const navigate = useNavigate(); // Use useNavigate hook to programmatically navigate

  // Handle Rent button click
  const handleRentButtonClick = () => {
    navigate("/"); // Replace '/rent' with the actual route you want to navigate to
  };

  // Set default route when the component is first rendered
  useEffect(() => {
    navigate("/account");  // Default route
  }, [navigate]);
  
  return (
    
      <div className="flex flex-row w-auto bg-gray-100 justify-center rounded-lg">
        {/* left block */}
        <div className="w-1/3 items-center m-6">
          {/* hello */}
          <div className="flex flex-col  w-auto p-3 rounded-lg rounded-br-lg m-4">
            <div className="bg-black text-white font-bold  rounded-tl-lg rounded-tr-lg p-3 ">
              Hi, {customerData.firstName}!
            </div>
            <div className="flex flex-col gap-2 w-auto p-3  bg-white ">
              <p> What's up? </p>
              <p>Do you want to rent a car?</p>
            </div>

            <div>
              {/* button redirects to home page car list */}
              <Button name="Rent" onClick={handleRentButtonClick} />
            </div>
          </div>

          {/* navigation block */}

          <div className="flex flex-col  w-auto p-3   m-4">
            <div className="bg-black text-white font-bold mt-10 rounded-tl-lg rounded-tr-lg p-3 ">
              Navigation:
            </div>

            {/* two links */}

            <nav className="flex flex-col space-x-6 bg-white p-3 gap-2 rounded-lg rounded-br-lg">
              <Link to="/account/customerData" className="text-black hover:text-red-700 text-lg ">
                Customer Data
              </Link>
              <Link to="/account/bookingDetails" className="text-blac hover:text-red-700 text-lg ">
                Booking Details
              </Link>
            </nav>
          </div>
        </div>

        {/* right block */}
        <div className="flex flex-col w-2/3 m-6 gap-6">
          <Routes>
            
            <Route
              path="/account/customerData"
              element={
                <CustomerComponent
                  firstName={customerData.firstName}
                  lastName={customerData.lastName}
                  email={customerData.email}
                  drivingLicense={customerData.drivingLicense}
                  bornDate={customerData.bornDate}
                />
              }
            />
            <Route
              path="/account/bookingDetails"
              element={
                <BookingComponent
                  startDate={bookingData.startDate}
                  endDate={bookingData.endDate}
                  carBrand={bookingData.carBrand}
                  carModel={bookingData.carModel}
                  status={bookingData.status}
                  price={bookingData.price}
                  renterFirstName={bookingData.renterFirstName}
                  renterLastName={bookingData.renterLastName}
                  updateBookingDate={bookingData.updateBookingDate}
                  createBookingDate={bookingData.createBookingDate}
                />
              }
            />
          </Routes>
        </div>
      </div>
    
  )
}
export default CustomerPage
