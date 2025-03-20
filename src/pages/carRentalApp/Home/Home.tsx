
import FilterByDatesForm from "components/FilterByDatesForm/FilterByDatesForm"
import Login from "components/Login/Login"
import CarComponent from "../../../components/CarComponent/CarComponent"

// test image remove later
//import CarImg from "assets/CarImages/corolla-exterieur.jpg"  


function Home() {

  //example car data. later object from Backend
//   const carData = {
//     brand: "Toyota",
//     model: "Corolla",
//     year: 2021,
//     type: "Sedan",
//     fuelType: "Gasoline",
//     transmissionType: "Automatic",
//     carStatus: "Available",
//     dayRentalPrice: 30,
//     carImage: CarImg,
//   }

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
      
    </div>
  )
}

export default Home
