import { CarCardProps } from "components/CarCard/types";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BookingForm from "components/BookingForm/BookingForm";

const RentCarPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const carDetails = location.state as CarCardProps;


  return (
    <div className="flex flex-row">
      <BookingForm />
    </div>
  );
};

export default RentCarPage;
