import { Link, useLocation } from 'react-router-dom';
import logo from '../../../assets/logo.svg';
import mainImg from '../../../assets/mainImg.jpg';
import { LayoutProps } from './types';
import './styles.css';

function Layout({ children }: LayoutProps) {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <div className="flex flex-col min-h-screen w-full">
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
                            <Link to="/" className="nav-link">
                                Home
                            </Link>
                            <Link to="/login" className="nav-link">
                                Log in
                            </Link>
                            <Link to="/account" className="nav-link">
                                My Account
                            </Link>
                        </nav>
                    </div>
                </div>
                {isHomePage && (
                    <div className="hero-text">
                        <h1 className="hero-title">
                            <span className="hero-highlight">RentCar</span> – Your Road to <span className="hero-highlight">Freedom</span>
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
                            <Link to="/about" className="footer-link">
                                About us
                            </Link>
                            <Link to="/contacts" className="footer-link">
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