import AdBanners from "components/AdBanners/AdBanners";
import FilterCars from "components/FilterCars/FilterCars";

function Home() {

  return (
    <div className="container mx-auto px-4 py-8">
      <FilterCars />
      <AdBanners />
    </div>
  );
}

export default Home;
