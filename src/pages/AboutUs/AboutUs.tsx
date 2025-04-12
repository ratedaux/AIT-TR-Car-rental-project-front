import { Link } from "react-router-dom";
import elena from "../../assets/avatars/Elena_Karsten.jpeg";
import maria from "../../assets/avatars/Maria_Neshyna.jpeg";
import alla from "../../assets/avatars/Alla_Nazarenko.jpeg";
import liana from "../../assets/avatars/Liana_Kes.jpeg";
import olga from "../../assets/avatars/Olga_Fatina.jpeg";
import gloria from "../../assets/avatars/Gloria_Adler.jpeg";

function AboutUs() {
    return (
        <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 text-gray-800 drop-shadow-lg">
                    About Our Team
                </h1>

                <div className="space-y-12 mt-4">
                    {/* Backend Team */}
                    <section className="bg-white rounded-lg shadow-md p-6 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-red-600">Backend Team</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
                            <div className="text-center">
                                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200 overflow-hidden shadow-lg transform transition duration-500 hover:scale-110">
                                    <img
                                        src={alla}
                                        alt="Alla Nazarenko"
                                        className="w-full h-full object-cover" style={{ objectPosition: 'center 20%' }}
                                    />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Alla Nazarenko</h3>
                                <p className="text-gray-600">Team Lead</p>
                            </div>
                            <div className="text-center">
                                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200 overflow-hidden shadow-lg transform transition duration-500 hover:scale-110">
                                    <img
                                        src={liana}
                                        alt="Liana Kes"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Liana Kes</h3>
                                <p className="text-gray-600">Backend Developer</p>
                            </div>
                            <div className="text-center">
                                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200 overflow-hidden shadow-lg transform transition duration-500 hover:scale-110">
                                    <img
                                        src="/team/katerina.jpg"
                                        alt="Katerina Kibireva"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Katerina Kibireva</h3>
                                <p className="text-gray-600">Backend Developer</p>
                            </div>
                        </div>
                    </section>

                    {/* Frontend Team */}
                    <section className="bg-white rounded-lg shadow-md p-6 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-red-600">Frontend Team</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">

                            <div className="text-center">
                                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200 overflow-hidden shadow-lg transform transition duration-500 hover:scale-110">
                                    <img
                                        src={maria}
                                        alt="Maria Neshyna"
                                        className="w-full h-full object-cover" style={{ objectPosition: 'center 20%' }}
                                    />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Maria Neshyna</h3>
                                <p className="text-gray-600">Frontend Developer</p>
                            </div>
                            <div className="text-center">
                                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200 overflow-hidden shadow-lg transform transition duration-500 hover:scale-110">
                                    <img
                                        src={elena}
                                        alt="Elena Karsten"
                                        className="w-full h-full object-cover scale-130" style={{
                                            objectPosition: 'center 30%'
                                        }}
                                    />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Elena Karsten</h3>
                                <p className="text-gray-600">Frontend Developer</p>
                            </div>
                            <div className="text-center">
                                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200 overflow-hidden shadow-lg transform transition duration-500 hover:scale-110">
                                    <img
                                        src="/team/anastasia.jpg"
                                        alt="Anastasia Yemetz"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Anastasia Yemetz</h3>
                                <p className="text-gray-600">Frontend Developer</p>
                            </div>
                        </div>
                    </section>

                    {/* QA Team */}
                    <section className="bg-white rounded-lg shadow-md p-6 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-red-600">QA Team</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
                            <div className="text-center">
                                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200 overflow-hidden shadow-lg transform transition duration-500 hover:scale-110">
                                    <img
                                        src="/team/galina.jpg"
                                        alt="Galina Troshina"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Galina Troshina</h3>
                                <p className="text-gray-600">QA Engineer</p>
                            </div>
                            <div className="text-center">
                                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200 overflow-hidden shadow-lg transform transition duration-500 hover:scale-110">
                                    <img
                                        src={olga}
                                        alt="Olga Fatina"
                                        className="w-full h-full object-cover" style={{
                                            objectPosition: 'center 40%'
                                        }}
                                    />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Olga Fatina</h3>
                                <p className="text-gray-600">QA Engineer</p>
                            </div>
                            <div className="text-center">
                                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200 overflow-hidden shadow-lg transform transition duration-500 hover:scale-110">
                                    <img
                                        src="/team/german.jpg"
                                        alt="German Kisin"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">German Kisin</h3>
                                <p className="text-gray-600">QA Engineer</p>
                            </div>
                            <div className="text-center">
                                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200 overflow-hidden shadow-lg transform transition duration-500 hover:scale-110">
                                    <img
                                        src={gloria}
                                        alt="Gloria Adler"
                                        className="w-full h-full object-cover" style={{
                                            objectPosition: 'center 35%'
                                        }}
                                    />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Gloria Adler</h3>
                                <p className="text-gray-600">QA Engineer</p>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="mt-12 text-center">
                    <Link
                        to="/"
                        className="inline-block bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors duration-300"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default AboutUs; 