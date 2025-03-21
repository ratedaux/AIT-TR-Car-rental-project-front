import { Link, useLocation } from 'react-router-dom';
import logo from '../../../assets/logo.svg';
import mainImg from '../../../assets/mainImg.jpg';
import { LayoutProps } from './types';


function Layout({ children }: LayoutProps) {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <div className="flex flex-col min-h-screen w-full bg-gray-100">
            {/* Header */}
            <header className="relative bg-cover bg-center h-64 shadow-md border-b-[7px] border-red-600"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${mainImg})`,
                    backgroundPosition: 'center 75%'
                }}>
                <div className="container mx-auto px-4 py-3relative z-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center">
                                <img src={logo} alt="Logo" className="h-15  w-auto bg-transparent" />
                            </Link>
                        </div>

                        <nav className="flex items-center space-x-6">
                            <Link to="/" className="text-white font-bold px-4 py-2 rounded-md transition-all duration-300 hover:bg-red-600 relative z-10 hover:text-white">
                                Home
                            </Link>
                            <Link to="/login" className="text-white font-bold px-4 py-2 rounded-md transition-all duration-300 hover:bg-red-600 relative z-10 hover:text-white">
                                Log in
                            </Link>
                            <Link to="/account" className="text-white font-bold px-4 py-2 rounded-md transition-all duration-300 hover:bg-red-600 relative z-10 hover:text-white">
                                My Account
                            </Link>
                            <Link to="/admin" className="text-white font-bold px-4 py-2 rounded-md transition-all duration-300 hover:bg-red-600 relative z-10 hover:text-white">
                                Admin
                            </Link>
                        </nav>
                    </div>
                </div>
                {isHomePage && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h1 className="text-white text-4xl font-bold text-center italic text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);">
                            <span className=" text-red-600 italic">RentCar</span> – Your Road to <span className=" text-red-600 italic">Freedom</span>
                        </h1>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="flex-grow container mx-auto px-4 py-8">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex justify-between items-center">
                        <div className="space-x-6">
                            <Link to="/about" className=" text-white hover:text-gray-300 hover:underline transition-colors">
                                About us
                            </Link>
                            <Link to="/contacts" className=" text-white hover:text-gray-300 hover:underline transition-colors">
                                Contacts
                            </Link>
                        </div>
                        <div className="text-sm text-gray-400">
                            © {new Date().getFullYear()} RentCar. All rights reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </div >
    );
};

export default Layout;