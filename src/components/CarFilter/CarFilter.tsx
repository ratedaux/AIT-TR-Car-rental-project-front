import { useState } from "react";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

function CarFilter() {

    const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);

    const handleSliderChange = (value: number | number[]) => {
        if (Array.isArray(value)) {
            setPriceRange(value as [number, number]);
        }
    };

    return (
        <div className="flex flex-col bg-white gap-4 rounded-lg shadow-lg p-6 border border-gray-100 h-full overflow-y-auto my-3">
            <h3 className="font-semibold text-lg">Filter Cars</h3>

            {/* Brand Filter */}
            <div>
                <h4 className="font-semibold">Brand</h4>
                <label className="block">
                    <input type="checkbox" className="mr-2" />
                    Toyota
                </label>
                <label className="block">
                    <input type="checkbox" className="mr-2" />
                    BMW
                </label>
                <label className="block">
                    <input type="checkbox" className="mr-2" />
                    Audi
                </label>
                <label className="block">
                    <input type="checkbox" className="mr-2" />
                    Mercedes
                </label>
            </div>

            {/* Fuel Type Filter */}
            <div>
                <h4 className="font-semibold">Fuel Type</h4>
                <label className="block">
                    <input type="checkbox" className="mr-2" />
                    Petrol
                </label>
                <label className="block">
                    <input type="checkbox" className="mr-2" />
                    Diesel
                </label>
                <label className="block">
                    <input type="checkbox" className="mr-2" />
                    Electric
                </label>
            </div>

            {/* Transmission Type Filter */}
            <div>
                <h4 className="font-semibold">Transmission Type</h4>
                <label className="block">
                    <input type="checkbox" className="mr-2" />
                    Automatic
                </label>
                <label className="block">
                    <input type="checkbox" className="mr-2" />
                    Manual
                </label>
            </div>

            {/* Body Type Filter */}
            <div>
                <h4 className="font-semibold">Body Type</h4>
                <label className="block">
                    <input type="checkbox" className="mr-2" />
                    Sedan
                </label>
                <label className="block">
                    <input type="checkbox" className="mr-2" />
                    SUV
                </label>
                <label className="block">
                    <input type="checkbox" className="mr-2" />
                    Hatchback
                </label>
                <label className="block">
                    <input type="checkbox" className="mr-2" />
                    Coupe
                </label>
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
    );
};

export default CarFilter;;