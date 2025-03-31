// import { useState, useEffect } from "react";
// import Slider from 'rc-slider';
// import 'rc-slider/assets/index.css';
// import { useFormik } from "formik";
// import { brandsActions, brandsSelectors, rentCarActions } from "store/redux/rentCarSlice/rentCarSlice";
// import { FilterByDatesFormValues } from "components/FilterByDatesForm/types";
// import { useAppDispatch, useAppSelector } from "store/hooks";

// function CarFilter() {
//     const dispatch = useAppDispatch();
//     const brands = useAppSelector(brandsSelectors.brandsData);

//     const [priceRange, setPriceRange] = useState<[number, number]>([20, 100]);
//     const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
//     const [selectedBodyTypes, setSelectedBodyTypes] = useState<string[]>([]);


//     // const [bodyTypes, setBodyTypes] = useState<string[]>([]);



//     // const toggleBrand = (brand: string) => {
//     //     brand(prev =>
//     //         prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
//     //     );
//     // };

//     // const toggleBodyType = (bodyType: string) => {
//     //     setBodyTypes(prev =>
//     //         prev.includes(bodyType) ? prev.filter(b => b !== bodyType) : [...prev, bodyType]
//     //     );
//     // };
//     useEffect(() => {
//         dispatch(brandsActions.fetchBrands());
//     }, [dispatch]);

//     useEffect(() => {
//         if (formik.values.startDateTime && formik.values.endDateTime) {
//             dispatch(rentCarActions.fetchCars({
//                 startDateTime: formik.values.startDateTime,
//                 endDateTime: formik.values.endDateTime,
//                 minPrice: priceRange[0],
//                 maxPrice: priceRange[1],
//                 brands: selectedBrands,
//                 bodyTypes: selectedBodyTypes
//             }));
//         }
//     }, [priceRange, selectedBrands, selectedBodyTypes, dispatch]);

//     const handleSliderChange = (value: number | number[]) => {
//         if (Array.isArray(value)) {
//             setPriceRange(value as [number, number]);
//         }
//     };

//     // const handleFilterChange = () => {
//     //     dispatch(rentCarActions.fetchCars({
//     //         startDateTime: "2024-03-29T10:00:00",
//     //         endDateTime: "2024-03-31T10:00:00",
//     //         minPrice: priceRange[0],
//     //         maxPrice: priceRange[1],
//     //         brands: selectedBrands,
//     //         bodyTypes: selectedBodyTypes
//     //     }));
//     // };

//     const handleBrandChange = (brand: string) => {
//         setSelectedBrands(prev =>
//             prev.includes(brand)
//                 ? prev.filter(b => b !== brand)
//                 : [...prev, brand]
//         );
//     };
//     const formik = useFormik({
//         initialValues: {
//             startDateTime: "",
//             endDateTime: "",
//             minPrice: priceRange[0],
//             maxPrice: priceRange[1],
//             brands: [],
//             bodyTypes: []
//         } as FilterByDatesFormValues,
//         onSubmit: (values) => {
//             dispatch(rentCarActions.fetchCars(values));
//         }
//     });




//     return (
//         <div className="flex flex-col bg-white gap-4 rounded-lg shadow-lg p-6 border border-gray-100 h-full overflow-y-auto my-3">
//             <h3 className="font-semibold text-lg">Filter Cars</h3>

//             {/* Brand Filter */}
//             <div>
//                 <h4 className="font-semibold">Brand</h4>
//                 {brands.map(brand => (
//                     <label key={brand} className="block">
//                         <input type="checkbox" className="mr-2"
//                             value={brand}
//                             checked={selectedBrands.includes(brand)}
//                             onChange={() => {
//                                 handleBrandChange(brand);
//                             }} />
//                         {brand}
//                     </label>
//                 ))}
//             </div>

//             {/* Body Type Filter */}
//             <div>
//                 <h4 className="font-semibold">Body Type</h4>
//                 {["Sedan", "SUV", "Hatchback", "Coupe"].map(type => (
//                     <label key={type} className="block">
//                         <input
//                             type="checkbox"
//                             value={type}
//                             onChange={(e) => {
//                                 const value = e.target.value;
//                                 setSelectedBodyTypes(prev =>
//                                     prev.includes(value)
//                                         ? prev.filter(t => t !== value)
//                                         : [...prev, value]
//                                 );
//                             }}
//                         />
//                         {type}
//                     </label>
//                 ))}
//             </div>

//             {/* Price Range Filter */}
//             <div>
//                 <h4 className="font-semibold">Price Range</h4>
//                 <Slider
//                     range
//                     min={0}
//                     max={200}
//                     step={10}
//                     value={priceRange}
//                     onChange={handleSliderChange}
//                 />
//                 <div className="flex justify-between text-sm">
//                     <span>{priceRange[0]} €</span>
//                     <span>{priceRange[1]} €</span>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default CarFilter;
