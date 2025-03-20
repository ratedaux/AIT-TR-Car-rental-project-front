import Button from "components/Button/Button";
import { CarCardProps } from "./types";

function CarCard({
    image,
    brand,
    model,
    pricePerDay,
    transmission,
    year,
    fuel,
    onMoreDetails,
    onRent

}: CarCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 w-full p-6">
            <div className="flex gap-8">
                <div className="w-1/3">
                    <div className="w-full h-full min-h-[200px] overflow-hidden rounded-lg">

                        <img
                            src={image}
                            alt={model}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
                <div className="w-2/3 flex">
                    <div className="flex-1">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                            {brand}{model}
                        </h3>
                        <div className="flex gap-3 text-gray-600 my-4">
                            <div className="flex items-center gap-0.5">
                                <i className="fas fa-cog text-gray-700"></i>
                                <span>{transmission}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <i className="fas fa-calendar text-gray-700"></i>
                                <span>{year}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <i className="fas fa-gas-pump text-gray-700"></i>
                                <span>{fuel}</span>
                            </div>
                        </div>
                        <div className="hidden lg:block border-b border-gray-200"></div>
                    </div>
                    <div className="w-[200px] flex flex-col gap-5 justify-between align-middle">
                        <div className="text-2xl font-bold text-red-500 text-center">
                            ${pricePerDay}
                            <span className="text-sm font-normal text-gray-600 block">per day</span>
                        </div>
                        <div className="flex flex-col gap-3.5 w-full">
                            <button
                                className="w-full py-2.5 px-5 rounded-lg font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-300"
                                onClick={onMoreDetails}
                            >
                                More Details
                            </button>
                            <button
                                className="w-full py-2.5 px-5 rounded-lg font-semibold bg-gray-900 text-white hover:bg-red-700 transition-colors duration-300"
                                onClick={onRent}
                            >
                                Rent
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CarCard;