// import { CarProps } from "./types";
// import Button from "components/Button/Button";
// import fuelIcon from "assets/CarImages/fuel-icon.png";
// import transmissionIcon from "assets/CarImages/transmission-icon.png";
// import yearIcon from "assets/CarImages/year-icon.png";
// import euroIcon from "assets/CarImages/euro-icon.png";
// import carIcon from "assets/CarImages/car-icon.jpg";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { CarCardProps } from "components/CarCard/types";

// interface CarComponentProps {
//   car: CarCardProps;
// }

// function CarComponent({ car }: CarComponentProps) {
//   // State to manage the visibility of the window
//   // const [isVisible, setIsVisible] = useState(true);

//   // Handle close button click
//   // const handleClose = () => {
//   //   setIsVisible(false); // Set visibility to false, effectively "closing" the window
//   // };

//   // if (!isVisible) {
//   //   return null; // If not visible, return nothing (effectively hiding the component)
//   // }

//   // const [car, setCar] = useState<CarProps>();

//   // async function fetchCar() {
//   //   const response = await axios.get("/api/cars/id/6");
//   //   setCar(response.data);
//   // }

//   // useEffect(() => {
//   //   fetchCar();
//   // }, []);

//   return (
//     <div className="flex flex-row w-auto justify-center rounded-lg ">
//       {/* right block */}
//       <div className="w-2/3 items-center">
//         <div className="flex flex-col w-auto m-6 gap-6">
//           <img
//             src={car?.image}
//             alt={car?.brand}
//             className="rounded-lg w-auto object-cover"
//           />

//           <div className="flex flex-col w-auto ">
//             <div className="bg-black text-white font-bold  rounded-tl-lg rounded-tr-lg p-3 ">
//               Info:
//             </div>

//             <div className="flex flex-row gap-1 w-auto p-3 bg-white  rounded-lg rounded-br-lg">
//               <div className="flex flex-row items-center gap-1 ">
//                 <img src={fuelIcon} className="w-1/5" />
//                 <div className="w-5/6">{car?.fuelType}</div>
//               </div>

//               <div className="flex flex-row items-center gap-1">
//                 <img src={transmissionIcon} className="w-1/5" />
//                 <div className="w-5/6">{car?.transmissionType}</div>
//               </div>

//               <div className="flex flex-row items-center gap-1">
//                 <img src={yearIcon} className="w-1/5" />
//                 <div className="w-5/6">{car?.year}</div>
//               </div>

//               <div className="flex flex-row items-center gap-1">
//                 <img src={euroIcon} className="w-1/5" />
//                 <div className="w-5/6">{car?.dayRentalPrice}</div>
//               </div>

//               <div className="flex flex-row items-center gap-1">
//                 <img src={carIcon} className="w-1/3" />
//                 <div className="w-2/3">{car?.carStatus}</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* left block */}
//       <div className="flex flex-col w-1/3 m-6 gap-6">
//         {/* description block */}
//         <div className="flex flex-col w-auto ">
//           <div className="bg-black text-white font-bold  rounded-tl-lg rounded-tr-lg p-3 ">
//             Description:
//           </div>
//           <div className="flex flex-col gap-3 w-auto p-3 bg-white  rounded-lg rounded-br-lg">
//             <div className="flex gap-4">
//               <div className="w-1/4 font-bold">Brand:</div>
//               <div className="w-3/4">{car?.brand}</div>
//             </div>
//             <div className="flex gap-4">
//               <div className="w-1/4 font-bold">Model:</div>
//               <div className="w-3/4">{car?.model}</div>
//             </div>
//             <div className="flex gap-4">
//               <div className="w-1/4 font-bold">Year:</div>
//               <div className="w-3/4">{car?.year}</div>
//             </div>
//             <div className="flex gap-4">
//               <div className="w-1/4 font-bold">Body type:</div>
//               <div className="w-3/4">{car?.type}</div>
//             </div>
//             <div className="flex gap-4">
//               <div className="w-1/4 font-bold">Fuel:</div>
//               <div className="w-3/4">{car?.fuelType}</div>
//             </div>
//             <div className="flex gap-4">
//               <div className="w-1/4 font-bold">Transmission:</div>
//               <div className="w-3/4">{car?.transmissionType}</div>
//             </div>
//             <div className="flex gap-4">
//               <div className="w-1/4 font-bold">Status:</div>
//               <div className="w-3/4">{car?.carStatus}</div>
//             </div>
//             <div className="flex gap-4">
//               <div className="w-1/4 font-bold">Daily price:</div>
//               <div className="w-3/4">{car?.dayRentalPrice} €</div>
//             </div>
//           </div>
//         </div>

//         {/* Note Block */}
//         <div className="flex flex-col w-auto ">
//           <div className="bg-black text-white font-bold  rounded-tl-lg rounded-tr-lg p-3 ">
//             Note:
//           </div>
//           <div className="flex flex-col gap-1 w-auto p-3 bg-white  rounded-lg rounded-br-lg">
//             <p>You can pick up a car only at the pick up station! </p>
//             <p>Payment possible only at the pick up station! </p>
//             <p>Don't forget your driving license! </p>
//           </div>
//         </div>

//         <div className="w-auto">
//           <Button name="Rent" type="button" onClick={() => { }} />
//         </div>

//         {/* Edit car only for Admin */}
//         <div className="w-auto">
//           <Button name="Edit" type="button" onClick={() => { }} />
//         </div>
//       </div>

//       {/* close button */}
//       {/* <div className="mt-6">
//         <Button
//           name="X"
//           customClasses=" !px-6 !py-6 !rounded-full font-semibold !bg-gray-400 hover:!bg-red-700 text-white"
//           onClick={handleClose}
//         />
//       </div> */}
//     </div>
//   );
// }
// export default CarComponent;

import { CarCardProps } from "components/CarCard/types";
import Button from "components/Button/Button";
import fuelIcon from "assets/CarImages/fuel-icon.png";
import transmissionIcon from "assets/CarImages/transmission-icon.png";
import yearIcon from "assets/CarImages/year-icon.png";
import euroIcon from "assets/CarImages/euro-icon.png";
import carIcon from "assets/CarImages/car-icon.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { CarCardProps } from "components/CarCard/types";
import { useNavigate } from "react-router-dom";


interface CarComponentProps {
  car: CarCardProps;
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function CarComponent({ car }: CarComponentProps) {

  const navigate = useNavigate()

  return (


    <div className="relative flex flex-col md:flex-row w-full max-w-4xl justify-center rounded-lg bg-white shadow-lg overflow-hidden">

      {/* Image Block */}
      <div className="md:w-2/3 flex flex-col justify-between p-6">
        <img
          src={car?.image}
          alt={car?.brand}
          className="rounded-lg w-full h-auto object-cover mb-4"
        />

        {/* Icons Block */}
        <div className="flex flex-row justify-center gap-4 w-full p-3 rounded-lg shadow-md bg-gray-50">
          <div className="flex flex-row items-center gap-2">
            <img src={fuelIcon} className="w-6 h-6" alt="Fuel" />
            <div className="text-sm text-gray-700">{capitalizeFirstLetter(car?.fuelType)}</div>
          </div>

          <div className="flex flex-row items-center gap-2">
            <img src={transmissionIcon} className="w-6 h-6" alt="Transmission" />
            <div className="text-sm text-gray-700">{capitalizeFirstLetter(car?.transmissionType)}</div>
          </div>

          <div className="flex flex-row items-center gap-2">
            <img src={yearIcon} className="w-6 h-6" alt="Year" />
            <div className="text-sm text-gray-700">{car?.year}</div>
          </div>

   const handleEditCar = (carId: string, carDetails: CarCardProps) => {
      console.log("Edit car with Id:", carId)
      navigate(`/edit-car/${carId}`, { state: { carDetails } })
    }

    const handleRentCar = (carId: string) => {
      navigate(`/rent-car/${carId}`)
    }


  return (
    <div className="flex flex-row w-auto justify-center rounded-lg ">
      {/* right block */}
      <div className="w-2/3 items-center">
        <div className="flex flex-col w-auto m-6 gap-6">
          <img
            src={car?.image}
            alt={car?.brand}
            className="rounded-lg w-auto object-cover"
          />

          <div className="flex flex-col w-auto ">
            <div className="bg-black text-white font-bold  rounded-tl-lg rounded-tr-lg p-3 ">
              Info:
            </div>

          <div className="flex flex-row items-center gap-2">
            <img src={euroIcon} className="w-6 h-6" alt="Price" />
            <div className="text-sm text-gray-700">{car?.dayRentalPrice}</div>
          </div>


          <div className="flex flex-row items-center gap-2">
            <img src={carIcon} className="w-6 h-6" alt="Status" />
            <div className="text-sm text-gray-700">{car?.carStatus}</div>
          </div>
        </div>
      </div>

      {/* Info Block */}
      <div className="flex flex-col md:w-1/3 p-6 gap-6">
        {/* Description Block */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-red-600">Description</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-semibold">Brand:</span>
              <span>{car?.brand}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Model:</span>
              <span>{car?.model}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Year:</span>
              <span>{car?.year}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Body type:</span>
              <span>{capitalizeFirstLetter(car?.type)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Fuel:</span>
              <span>{capitalizeFirstLetter(car?.fuelType)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Transmission:</span>
              <span>{capitalizeFirstLetter(car?.transmissionType)}</span>
            </div>
            {/* <div className="flex justify-between">
              <span className="font-semibold">Status:</span>
              <span>{capitalizeFirstLetter(car.carStatus)}</span>
            </div> */}
            <div className="flex justify-between">
              <span className="font-semibold">Daily price:</span>
              <span>{car?.dayRentalPrice} €</span>
            </div>
          </div>
        </div>

        {/* Note Block */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Note</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>You can pick up a car only at the pick up station!</li>
            <li>Payment possible only at the pick up station!</li>
            <li>Don't forget your driving license!</li>
          </ul>
        </div>


        <div className="w-auto">
          <Button name="Rent" type="button" onClick={() => handleRentCar(car.id)} />
        </div>

        {/* Edit car only for Admin */}
        <div className="w-auto">
          <Button name="Edit" type="button" onClick={() => handleEditCar(car.id,car)} />

        </div>
      </div>
    </div>

  );
}

export default CarComponent;
