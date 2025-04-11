import AdBanners from "components/AdBanners/AdBanners";
import FilterCars from "components/FilterCars/FilterCars";

function Home() {

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <div className="flex flex-col gap-6 sm:gap-8">
        <FilterCars />
        <AdBanners />
      </div>
    </div>
  );
}

export default Home;
