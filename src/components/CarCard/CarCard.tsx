import { useState } from "react";
import ReactDOM from "react-dom";
import Button from "components/Button/Button"; import { CarCardProps } from "./types";
import CarComponent from "components/CarComponent/CarComponent";
import { useNavigate } from "react-router-dom";

function CarCard({
    id,
    brand,
    model,
    year,
    type,
    fuelType,
    transmissionType,
    carStatus,
    dayRentalPrice,
    image,
}: CarCardProps) {
    const [showCarComponent, setShowCarComponent] = useState(false);

    const navigate = useNavigate();

    const handleRentCar = (carId: string) => {
        navigate(`/rent-car/${carId}`);
    };

    const handleMoreDetailsClick = () => {
        setShowCarComponent(true);
    };

    const handleCloseCarComponent = () => {
        setShowCarComponent(false);
    };

    function capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 w-full p-6">
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
                {/* Image Block */}
                <div className="w-full sm:w-1/3">
                    <div className="w-full h-full min-h-[200px] overflow-hidden rounded-lg">
                        <img
                            src={image}
                            alt={capitalizeFirstLetter(model)}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:flex-wrap sm:justify-between sm:items-start gap-4">
                    {/* Info Block */}
                    <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold text-gray-800 truncate" style={{
                            whiteSpace:
                                'normal', wordWrap: 'break-word'
                        }}>
                            {brand} {capitalizeFirstLetter(model)}
                        </h3>
                        <div className="flex flex-wrap gap-3 text-gray-600 my-4" style={{ fontSize: "0.875rem" }}>
                            <div className="flex items-center gap-1">
                                <i className="fas fa-cog text-gray-700"></i>
                                <span>{capitalizeFirstLetter(transmissionType)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <i className="fas fa-calendar text-gray-700"></i>
                                <span>{year}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <i className="fas fa-gas-pump text-gray-700"></i>
                                <span>{capitalizeFirstLetter(fuelType)}</span>
                            </div>
                        </div>
                        <div className="hidden lg:block border-b border-gray-200"></div>
                    </div>

                    {/* Block with Price and Buttons */}
                    <div className="w-full sm:w-[200px] flex-shrink-0 flex flex-col gap-5 justify-between items-center sm:items-center">
                        <div className="text-2xl font-bold text-red-500 items-center text-center sm:text-right">
                            €{dayRentalPrice}
                            <span className="text-sm font-normal text-gray-600 block">per day</span>
                        </div>
                        <div className="flex flex-col gap-3.5 w-full">
                            <Button
                                name="More Details"
                                customClasses="!w-full !py-2.5 !px-5 !rounded-lg !font-semibold !bg-gray-100 !text-gray-700 hover:!bg-gray-200 transition-colors duration-300"
                                onClick={handleMoreDetailsClick}
                            />
                            <Button
                                name="RENT"
                                customClasses="!w-full !py-2.5 !px-5 !rounded-lg !font-semibold hover:!bg-red-700 transition-colors duration-300 !bg-gray-900 !text-white"
                                onClick={() => handleRentCar(id)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for CarComponent */}
            {showCarComponent && ReactDOM.createPortal(
                <div className="fixed inset-0 flex items-center justify-center bg-gray bg-opacity-50 backdrop-blur-sm z-50">
                    <div className="relative bg-white rounded-lg p-6 shadow-lg max-w-3xl mx-4 my-8">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                            onClick={handleCloseCarComponent}
                        >
                            ✖
                        </button>
                        <CarComponent car={{ id, brand, model, year, fuelType, transmissionType, dayRentalPrice, image, type, carStatus }} onClose={handleCloseCarComponent} />
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}

export default CarCard;