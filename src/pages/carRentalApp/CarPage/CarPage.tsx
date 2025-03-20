import CarComponent from "./Components/CarComponent"
import CarImg from '../../carRentalApp/CarPage/Images/corolla-exterieur.jpg'
import Button from "components/Button/Button"

function CarPage() {
  //example car data. later object from Backend
  const carData = {
    brand: "Toyota",
    model: "Corolla",
    year: 2021,
    type: "Sedan",
    fuelType: "Gasoline",
    transmissionType: "Automatic",
    carStatus: "Available",
    dayRentalPrice: 30,
    carImage: CarImg,
  }

  return (
   
   <div className="flex flex-row w-auto bg-gray-100 justify-center">
     
      <div className="w-2/3 items-center">
      <CarComponent
        brand={carData.brand}
        model={carData.model}
        year={carData.year}
        type={carData.type}
        fuelType={carData.fuelType}
        transmissionType={carData.transmissionType}
        carStatus={carData.carStatus}
        dayRentalPrice={carData.dayRentalPrice}
        carImage={carData.carImage}
      />

      </div>
      <div className="flex flex-col w-1/3 m-6 ">
        <div className="bg-black text-white font-bold  rounded-tl-lg rounded-tr-lg p-3 ">
          Note:
        </div>
        <div className="flex flex-col gap-1 w-auto p-3 bg-white  rounded-lg rounded-br-lg">
               <p>Please pay attention!</p> 
               <p>You can pick up a car only at the pick up station! </p>
               <p>Payment possible only at the pick up station! </p>   
        </div>
        <div className="w-auto mt-6">
        <Button name="Rent" type="button" onClick={() => {}} />
      </div>
      </div>
    </div>
    
  )
}

export default CarPage
