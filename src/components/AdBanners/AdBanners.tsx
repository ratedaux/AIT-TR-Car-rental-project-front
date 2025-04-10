import { useState } from "react";

const AdBanners = () => {
    const [banners] = useState([
        {
            id: 1,
            title: "Special Offer!",
            description: "Rent premium cars with 20% discount",
            image: "https://t3.ftcdn.net/jpg/07/66/85/76/360_F_766857639_A6cA6pmFDUx0eoAfeczYX3MRsBbRxUWM.jpg",
            link: "/premium-cars"
        },
        {
            id: 2,
            title: "New Cars",
            description: "Try our latest 2025 models",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLysQEFSsLmBekaBIq3br7_xCpe9dO6yLnoQ&s",
            link: "/new-cars"
        },
        {
            id: 3,
            title: "Long-term Rental",
            description: "Special conditions for rentals from 30 days",
            image: "data:image/jpeg;base64,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",
            link: "/long-term"
        }
    ]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Special Offers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                {banners.map((banner) => (
                    <div
                        key={banner.id}
                        className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="h-48 bg-gray-200">
                            <img
                                src={banner.image}
                                alt={banner.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-6 group">
                            <h3 className="text-xl font-semibold mb-2 transform transition-transform duration-300 group-hover:scale-105">{banner.title}</h3>
                            <p className="text-gray-600 mb-4 transform transition-transform duration-300 group-hover:scale-105">{banner.description}</p>
                            <a
                                href={banner.link}
                                className="text-red-600 font-medium hover:text-red-700 transition-all duration-300 transform group-hover:scale-105"
                            >
                                Learn More →
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdBanners; 