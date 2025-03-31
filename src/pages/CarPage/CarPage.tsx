import { CarCardProps } from "components/CarCard/types";
import CarComponent from "components/CarComponent/CarComponent";
import { useLocation, useParams } from "react-router-dom";

function CarPage() {
    const { id } = useParams();
    const location = useLocation();
    const car = location.state as CarCardProps;

    return (

        <div className="container mx-auto px-4 py-8">
            <CarComponent car={car} />
        </div>
        // <div>
        //     <p>Car: {id}</p>
        // </div>
    );
}

export default CarPage;