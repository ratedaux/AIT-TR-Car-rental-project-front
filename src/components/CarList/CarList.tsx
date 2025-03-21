import CarFilter from "components/CarFilter/CarFilter";
import CarCard from "../CarCard/CarCard";
import { CarCardProps } from "../CarCard/types";

interface CarListProps {
    cars: CarCardProps[];
}


function CarList({ cars }: CarListProps) {
    return (
        <div className="max-w-5xl mx-auto h-screen flex">
            {/* Filter sidebar */}
            <div className="w-1/4 h-screen sticky top-0">
                <CarFilter />
            </div>

            {/* Cars list */}
            <div className="w-3/4 h-screen overflow-y-auto space-y-6 p-4">
                {cars.map((car) => (
                    <CarCard key={car.model + car.year} {...car} />
                ))}
            </div>
        </div>
    );
}

export default CarList;
