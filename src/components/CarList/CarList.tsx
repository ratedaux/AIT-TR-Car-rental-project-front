// import CarFilter from "components/CarFilter/CarFilter";
// import CarCard from "../CarCard/CarCard";
// import { CarCardProps } from "../CarCard/types";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useAppDispatch, useAppSelector } from "store/hooks";
// import { rentCarSelectors, rentCarActions } from "store/redux/rentCarSlice/rentCarSlice";
// import { StringParam, useQueryParam } from "use-query-params";

// interface Car {
//     id: number;
//     brand: string;
//     model: string;
//     year: number;
//     type: string;
//     fuelType: string;
//     transmissionType: string;
//     carStatus: string;
//     dayRentalPrice: number;
//     carImage: string;
// }

// function CarList() {
//     const { cars, status, error } = useAppSelector(rentCarSelectors.carsData);



//     return (
//         <div className="max-w-5xl mx-auto h-screen flex">
//             {/* Filter sidebar */}
//             <div className="w-1/4 h-screen sticky top-0">
//                 <CarFilter />
//             </div>

//             {/* Cars list */}
//             <div className="w-3/4 h-screen overflow-y-auto space-y-6 p-4">
//                 {cars.map(car => (
//                     <CarCard key={car.model + car.year} {...car} />
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default CarList;
