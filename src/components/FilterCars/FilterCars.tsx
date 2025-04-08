import Button from "components/Button/Button";
import Input from "components/Input/Input";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { FilterCarsValues } from "./types";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { useEffect, useState } from "react";
import { rentCarActions, rentCarSelectors } from "store/redux/rentCarSlice/rentCarSlice";
import CarCard from "components/CarCard/CarCard";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';
import { bodyTypesSelectors, bodyTypesActions } from "store/redux/BodyTypeSlice/bodyTypeSlice";
import { brandsSelectors, brandsActions } from "store/redux/BrandsSlice/brandsSlice";
import Notification1 from "components/Notification/Notification1";
import Loader from "components/Loader/Loader";

export default function FilterCars() {
    const dispatch = useAppDispatch();
    const { cars } = useAppSelector(rentCarSelectors.carsData);
    const brands = useAppSelector(brandsSelectors.brandsData);
    const priceRange = useAppSelector(rentCarSelectors.selectPriceRange);
    const types = useAppSelector(bodyTypesSelectors.bodyTypesData);

    const [showFilters, setShowFilters] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedBodyTypes, setSelectedBodyTypes] = useState<string[]>([]);
    const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>([]);
    const [selectedTransmissionTypes, setSelectedTransmissionTypes] = useState<string[]>([]);

    useEffect(() => {
        dispatch(brandsActions.fetchBrands());
    }, [dispatch]);

    useEffect(() => {
        dispatch(bodyTypesActions.fetchTypes());
    }, [dispatch]);


    const handleBrandChange = (brand: string) => {
        setSelectedBrands(prev =>
            prev.includes(brand)
                ? prev.filter(b => b !== brand)
                : [...prev, brand]
        );
    };

    const handleBodyTypeChange = (type: string) => {
        setSelectedBodyTypes(prev =>
            prev.includes(type)
                ? prev.filter(t => t !== type)
                : [...prev, type]
        );
    };

    const handleFuelTypeChange = (fuelType: string) => {
        setSelectedFuelTypes(prev =>
            prev.includes(fuelType)
                ? prev.filter(f => f !== fuelType)
                : [...prev, fuelType]
        );
    };

    const handleTransmissionTypeChange = (transmissionType: string) => {
        setSelectedTransmissionTypes(prev =>
            prev.includes(transmissionType)
                ? prev.filter(tt => tt !== transmissionType)
                : [...prev, transmissionType]
        );
    };

    const handleSliderChange = (value: number | number[]) => {
        if (Array.isArray(value)) {
            dispatch(rentCarActions.setPriceRange(value as [number, number]));
            //setPriceRange(value as [number, number]);
        }
    };


    const schema = Yup.object().shape({
        startDateTime: Yup.date()
            .min(new Date(new Date().setHours(0, 0, 0, 0)), 'Start date and time cannot be in the past')
            .required('Start date and time is required'),
        endDateTime: Yup.date()
            .min(Yup.ref('startDateTime'), 'End date and time must be later than start date and time')
            .required('End date and time is required'),
    });

    const formik = useFormik({
        initialValues: {
            startDateTime: "",
            endDateTime: "",
            minPrice: priceRange[0],
            maxPrice: priceRange[1],
            brands: [],
            bodyTypes: [],
            fuelTypes: [],
            transmissionTypes: []
        } as FilterCarsValues,
        validationSchema: schema,
        validateOnChange: false,
        onSubmit: async (values) => {
            setIsLoading(true);
            try {
                await dispatch(rentCarActions.fetchCars({
                    startDateTime: values.startDateTime,
                    endDateTime: values.endDateTime,
                    minPrice: priceRange[0],
                    maxPrice: priceRange[1],
                    brands: selectedBrands,
                    bodyTypes: selectedBodyTypes,
                    fuelTypes: selectedFuelTypes,
                    transmissionTypes: selectedTransmissionTypes
                }));
                dispatch(rentCarActions.setSelectedDates({
                    startDate: values.startDateTime,
                    endDate: values.endDateTime,
                }));
                setShowFilters(true);
            } finally {
                setIsLoading(false);
            }
        }
    });


    useEffect(() => {
        if (formik.values.startDateTime && formik.values.endDateTime) {
            // setIsLoading(true);
            dispatch(rentCarActions.fetchCars({
                startDateTime: formik.values.startDateTime,
                endDateTime: formik.values.endDateTime,
                minPrice: priceRange[0],
                maxPrice: priceRange[1],
                brands: selectedBrands,
                bodyTypes: selectedBodyTypes,
                fuelTypes: selectedFuelTypes,
                transmissionTypes: selectedTransmissionTypes
            })).then((action) => {
                setIsLoading(false);
                if (Array.isArray(action.payload) && action.payload.length === 0) {
                    setShowNotification(true);
                }
            });
        }
    }, [
        formik.values.startDateTime,
        formik.values.endDateTime,
        priceRange,
        selectedBrands,
        selectedBodyTypes,
        selectedFuelTypes,
        selectedTransmissionTypes,
        dispatch
    ]);

    useEffect(() => {
        setSelectedBrands([]);
        setSelectedBodyTypes([]);
        setSelectedFuelTypes([]);
        setSelectedTransmissionTypes([]),
            dispatch(rentCarActions.setPriceRange([20, 100]));
    }, [formik.values.startDateTime, formik.values.endDateTime]);

    const today = new Date().toISOString().split("T")[0];

    function capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    const handleNotificationClose = () => {
        setShowNotification(false);
    };

    const formatDateTimeForInput = (dateTime: string) => {
        if (!dateTime) return '';
        const date = new Date(dateTime);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    return (
        <div>
            <div className='max-w-5xl mx-auto bg-white rounded-lg shadow-lg relative -mt-30 py-5 border border-gray-100 mb-6'>

                <h2 className='text-2xl font-bold text-gray-800 mb-12 text-center'>Find Available Cars</h2>
                <form className="flex flex-col md:flex-row gap-4 mt-5 items-stretch p-7" onSubmit={formik.handleSubmit}>
                    <div className="flex-1">
                        <Input
                            name="startDateTime"
                            type="datetime-local"
                            label="Pick-up Date and Time"
                            input_id="startDateTime"
                            value={formatDateTimeForInput(formik.values.startDateTime)}
                            onChange={formik.handleChange}
                            errorMessage={formik.errors.startDateTime}
                            min={today}
                        />
                    </div>
                    <div className="flex-1">
                        <Input
                            name="endDateTime"
                            type="datetime-local"
                            label="Return Date and Time"
                            input_id="endDateTime"
                            value={formatDateTimeForInput(formik.values.endDateTime)}
                            onChange={formik.handleChange}
                            errorMessage={formik.errors.endDateTime}
                            min={formik.values.startDateTime || today}
                        />
                    </div>
                    <div className="md: w-48">
                        <Button
                            type="submit"
                            name="SEARCH"
                            customClasses="!w-full !h-[58px] !py-2.5 !px-5 !rounded-lg !font-semibold !bg-gray-900 !text-white hover:!bg-red-700 !transition-colors !duration-300"
                        />
                    </div>
                </form>
            </div>
            {isLoading && <Loader />}
            {showFilters && !isLoading && (
                <div className="max-w-5xl mx-auto h-screen flex">

                    {/* Filter sidebar */}
                    <div className="w-1/4 h-screen sticky top-0">
                        <div className="flex flex-col bg-white gap-4 rounded-lg shadow-lg p-6 border border-gray-100 h-full overflow-y-auto my-3">

                            {/* Filter sidebar */}
                            <h3 className="font-semibold text-lg">Filter Cars</h3>

                            {/* Brand Filter */}
                            <div>
                                <h4 className="font-semibold">Brand</h4>
                                {brands.map(brand => (
                                    <label key={brand} className="block">
                                        <input type="checkbox" className="mr-2"
                                            value={brand}
                                            checked={selectedBrands.includes(brand)}
                                            onChange={() => {
                                                handleBrandChange(brand);
                                            }} />
                                        {brand}
                                    </label>
                                ))}
                            </div>

                            {/* Transmission Filter */}
                            <div>
                                <h4 className="font-semibold">Transmission Type</h4>
                                {["Manual", "Automatic"].map(transmissionType => (
                                    <label key={transmissionType} className="block">
                                        <input type="checkbox" className="mr-2"
                                            value={transmissionType}
                                            checked={selectedTransmissionTypes.includes(transmissionType)}
                                            onChange={() => {
                                                handleTransmissionTypeChange(transmissionType);
                                            }} />
                                        {transmissionType}
                                    </label>
                                ))}
                            </div>

                            {/* Fuel Filter */}
                            <div>
                                <h4 className="font-semibold">Fuel Type</h4>
                                {["Petrol", "Diesel", "Electric", "Hybrid"].map(fuelType => (
                                    <label key={fuelType} className="block">
                                        <input type="checkbox" className="mr-2"
                                            value={fuelType}
                                            checked={selectedFuelTypes.includes(fuelType)}
                                            onChange={() => {
                                                handleFuelTypeChange(fuelType);
                                            }} />
                                        {fuelType}
                                    </label>
                                ))}
                            </div>

                            {/* Body Type Filter */}
                            <div>
                                <h4 className="font-semibold">Body Type</h4>
                                {types.map(type => (
                                    <label key={type} className="block">
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                            value={type}
                                            checked={selectedBodyTypes.includes(type)}
                                            onChange={() => {
                                                handleBodyTypeChange(type);
                                            }}
                                        />
                                        {capitalizeFirstLetter(type)}
                                    </label>
                                ))}
                            </div>

                            {/* Price Range Filter */}
                            <div>
                                <h4 className="font-semibold">Price Range</h4>
                                <Slider
                                    range
                                    min={0}
                                    max={200}
                                    step={10}
                                    value={priceRange}
                                    onChange={handleSliderChange}
                                />
                                <div className="flex justify-between text-sm">
                                    <span>{priceRange[0]} €</span>
                                    <span>{priceRange[1]} €</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Cars list */}
                    <div className="w-3/4 h-screen overflow-y-auto space-y-6 p-4">
                        {cars.map(car => (
                            <CarCard key={car.id} {...car} image={car.carImage || ""} />
                        ))}
                    </div>
                </div>
            )}
            {showNotification && (
                <Notification1
                    topic="Error :("
                    message="No cars found matching your search criteria. Please try different filters."
                    onClose={handleNotificationClose}
                />
            )}
        </div>
    );
}