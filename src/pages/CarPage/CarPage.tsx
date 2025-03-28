import { useParams } from "react-router-dom";

function CarPage() {
    const { id } = useParams();

    return (
        <div>
            <p>Car: {id}</p>
        </div>
    );
}

export default CarPage;