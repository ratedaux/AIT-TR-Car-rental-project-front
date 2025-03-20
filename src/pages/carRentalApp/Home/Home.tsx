
import FilterByDatesForm from "components/FilterByDatesForm/FilterByDatesForm"
import Login from "components/Login/Login"
import CarComponent from "../../../components/CarComponent/CarComponent"
import BookingComponent from "components/BookingComponent/BookingComponent"

// test image remove later
//import CarImg from "assets/CarImages/corolla-exterieur.jpg"  


function Home() {

  //example car data. later object from Backend
  // const carData = {
  //   brand: "Toyota",
  //   model: "Corolla",
  //   year: 2021,
  //   type: "Sedan",
  //   fuelType: "Gasoline",
  //   transmissionType: "Automatic",
  //   carStatus: "Available",
  //   dayRentalPrice: 30,
  //   carImage: CarImg,
  // }

 // example booking data delete later
const bookingData={
  startDate: "20.03.2025",
    endDate: "21.03.2025",
    carBrand: "Toyota",
    carModel: "Corolla",
    status: true,
    price: 50,
    renterName: "Masha",
    updateBookingDate: "19.03.2025",
    createBookingDate: "18.03.2025"
}


  return (
    <div className="container mx-auto px-4 py-8">
      <FilterByDatesForm />

      {/* remove later test car data*/}
      {/* <CarComponent
        brand={carData.brand}
        model={carData.model}
        year={carData.year}
        type={carData.type}
        fuelType={carData.fuelType}
        transmissionType={carData.transmissionType}
        carStatus={carData.carStatus}
        dayRentalPrice={carData.dayRentalPrice}
        carImage={carData.carImage}
      /> */}

      <BookingComponent
      startDate={bookingData.startDate}
      endDate={bookingData.endDate}
      carBrand={bookingData.carBrand}
      carModel={bookingData.carModel}
      status={bookingData.status}
      price={bookingData.price}
      renterName={bookingData.renterName}
      updateBookingDate={bookingData.updateBookingDate}
      createBookingDate={bookingData.createBookingDate}
      />
      
    </div>
  )
}

export default Home
