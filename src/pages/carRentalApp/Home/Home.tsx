import FilterByDatesForm from "components/FilterByDatesForm/FilterByDatesForm";
import Login from "components/Login/Login";
import CarComponent from "../../../components/CarComponent/CarComponent";
import CarList from "components/CarList/CarList";

import BookingComponent from "components/BookingComponent/BookingComponent";
import BookingForm from "components/BookingForm/BookingForm";
import EditCarForm from "components/EditCarForm/EditCarForm";
import EditBookingDetailsForm from "components/EditBookingDetailsForm/EditBookingDetails";
import { useState } from "react";

import { CarCardProps } from "components/CarCard/types";

// interface Car {
//   id: number;
//   brand: string;
//   model: string;
//   year: number;
//   type: string;
//   fuelType: string;
//   transmissionType: string;
//   carStatus: string;
//   dayRentalPrice: number;
//   carImage: string;
// }


// test image remove later
//import CarImg from "assets/CarImages/corolla-exterieur.jpg"  


function Home() {

  // const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  // const [showCarComponent, setShowCarComponent] = useState(false);

  // const handleMoreDetailsClick = (car: Car) => {
  //   setSelectedCar(car);
  //   setShowCarComponent(true);
  // };

  // const handleCloseModal = () => {
  //   setShowCarComponent(false);
  //   setSelectedCar(null);
  // };


  return (
    <div className="container mx-auto px-4 py-8">
      <FilterByDatesForm />

      <CarList />

      {/* {showCarComponent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="relative bg-white rounded-lg p-6 shadow-lg max-w-2xl w-full">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            // onClick={handleCloseMoreDetails}
            >
              ✖
            </button>
            <CarComponent car={selectedCar as CarCardProps} />
          </div>
        </div>
      )} */}
      {/* <EditCarForm/>
      <BookingForm/>
      <EditBookingDetailsForm/> */}

      {/* remove later test car data*/}
      {/* <CarComponent
        // brand={carData.brand}
        // model={carData.model}
        // year={carData.year}
        // type={carData.type}
        // fuelType={carData.fuelType}
        // transmissionType={carData.transmissionType}
        // carStatus={carData.carStatus}
        // dayRentalPrice={carData.dayRentalPrice}
        // carImage={carData.carImage}
        // id={carData.id}
      /> */}


    </div>
  );
}

export default Home;
