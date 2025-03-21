function CarFilter() {
    return (
        <div className="flex flex-col bg-white gap-4 rounded-lg shadow-lg p-6 border border-gray-100 h-screen sticky top-0 overflow-y-auto my-3">
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
        </div>
    );
};

export default CarFilter;