import CarList from "components/CarList/CarList";
import FilterByDatesForm from "components/FilterByDatesForm/FilterByDatesForm";

function Home() {

    const testCars = [
        {
            image: "https://via.placeholder.com/200",
            brand: "Toyota",
            model: "Corolla",
            pricePerDay: 50,
            transmission: "Automatic",
            year: 2020,
            fuel: "Gasoline",
            onMoreDetails: () => alert("More details clicked"),
            onRent: () => alert("Rent clicked"),
        },
        {
            image: "https://via.placeholder.com/200",
            brand: "Honda",
            model: "Civic",
            pricePerDay: 55,
            transmission: "Manual",
            year: 2019,
            fuel: "Diesel",
            onMoreDetails: () => alert("More details clicked"),
            onRent: () => alert("Rent clicked"),
        },
        {
            image: "https://via.placeholder.com/200",
            brand: "Toyota",
            model: "Corolla",
            pricePerDay: 50,
            transmission: "Automatic",
            year: 2020,
            fuel: "Gasoline",
            onMoreDetails: () => alert("More details clicked"),
            onRent: () => alert("Rent clicked"),
        },
        {
            image: "https://via.placeholder.com/200",
            brand: "Honda",
            model: "Civic",
            pricePerDay: 55,
            transmission: "Manual",
            year: 2019,
            fuel: "Diesel",
            onMoreDetails: () => alert("More details clicked"),
            onRent: () => alert("Rent clicked"),
        },
        {
            image: "https://via.placeholder.com/200",
            brand: "Toyota",
            model: "Corolla",
            pricePerDay: 50,
            transmission: "Automatic",
            year: 2020,
            fuel: "Gasoline",
            onMoreDetails: () => alert("More details clicked"),
            onRent: () => alert("Rent clicked"),
        },
        {
            image: "https://via.placeholder.com/200",
            brand: "Honda",
            model: "Civic",
            pricePerDay: 55,
            transmission: "Manual",
            year: 2019,
            fuel: "Diesel",
            onMoreDetails: () => alert("More details clicked"),
            onRent: () => alert("Rent clicked"),
        },
        {
            image: "https://via.placeholder.com/200",
            brand: "Toyota",
            model: "Corolla",
            pricePerDay: 50,
            transmission: "Automatic",
            year: 2020,
            fuel: "Gasoline",
            onMoreDetails: () => alert("More details clicked"),
            onRent: () => alert("Rent clicked"),
        },
        {
            image: "https://via.placeholder.com/200",
            brand: "Honda",
            model: "Civic",
            pricePerDay: 55,
            transmission: "Manual",
            year: 2019,
            fuel: "Diesel",
            onMoreDetails: () => alert("More details clicked"),
            onRent: () => alert("Rent clicked"),
        },
        {
            image: "https://via.placeholder.com/200",
            brand: "Toyota",
            model: "Corolla",
            pricePerDay: 50,
            transmission: "Automatic",
            year: 2020,
            fuel: "Gasoline",
            onMoreDetails: () => alert("More details clicked"),
            onRent: () => alert("Rent clicked"),
        },
        {
            image: "https://via.placeholder.com/200",
            brand: "Honda",
            model: "Civic",
            pricePerDay: 55,
            transmission: "Manual",
            year: 2019,
            fuel: "Diesel",
            onMoreDetails: () => alert("More details clicked"),
            onRent: () => alert("Rent clicked"),
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8 ">
            <FilterByDatesForm />
            <CarList cars={testCars} />

        </div>
    );
}

export default Home;