import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import mainImg from "../../assets/mainImg.jpg";
import { LayoutProps } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { authActions, authSelectors } from "store/redux/AuthSlice/authSlice";
import { useState } from "react";

function Layout({ children }: LayoutProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useSelector(authSelectors.isLoggedIn);
  const user = useSelector(authSelectors.userData);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isHomePage = location.pathname === "/";


  const logout = () => {
    dispatch(authActions.logoutUser());
  };

  const onHandleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-100">
      {/* Header */}
      <header
        className="relative bg-cover bg-center h-48 sm:h-64 shadow-md border-b-[7px] border-red-600" style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${mainImg})`,
          backgroundPosition: "center 75%",
        }}
      >
        <div className="container mx-auto px-4 py-3 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img
                  src={logo}
                  alt="Logo"
                  className="h-12 sm:h-15 w-auto bg-transparent"
                />
              </Link>
            </div>

            {/* Burger Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden text-white p-2 rounded-md hover:bg-red-600 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              <Link
                to="/"
                className="text-white text-sm sm:text-base font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-md transition-all duration-300 hover:bg-red-600 relative z-10 hover:text-white"
              >
                Home
              </Link>
              {!isLoggedIn ? (
                <Link
                  to="/login"
                  className="text-white text-sm sm:text-base font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-md transition-all duration-300 hover:bg-red-600 relative z-10 hover:text-white"
                >
                  Log in
                </Link>
              ) : (
                <button
                  onClick={onHandleLogout}
                  className="text-white text-sm sm:text-base font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-md transition-all duration-300 hover:bg-red-600 relative z-10 hover:text-white"
                >
                  Log out
                </button>
              )}
             
             {isLoggedIn &&
                (user?.role === "ROLE_CUSTOMER" ) && (

                  <Link
                    to="/account/myData"
                    className="text-white text-sm sm:text-base font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-md transition-all duration-300 hover:bg-red-600 relative z-10 hover:text-white"
                  >
                    My Account
                  </Link>
                )}
              {isLoggedIn && user?.role === "ROLE_ADMIN" && (
                <Link
                  to="/admin/allCars"
                  className="text-white text-sm sm:text-base font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-md transition-all duration-300 hover:bg-red-600 relative z-10 hover:text-white"
                >
                  Admin
                </Link>
              )}
            </nav>
          </div>

          {/* Mobile Navigation Menu */}
          <div
            className={`lg:hidden fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-90 transition-opacity duration-300 ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
          >
            <div className="container mx-auto px-4 py-6 relative z-50">
              <div className="flex flex-col space-y-4">
                <Link
                  to="/"
                  className="text-white text-lg font-bold py-2 hover:text-red-500 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                {!isLoggedIn ? (
                  <Link
                    to="/login"
                    className="text-white text-lg font-bold py-2 hover:text-red-500 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Log in
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      onHandleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="text-white text-lg font-bold py-2 hover:text-red-500 transition-colors text-left"
                  >
                    Log out
                  </button>
                )}
                {isLoggedIn &&
                  (user?.role === "ROLE_CUSTOMER" || !user?.role) && (
                    <Link
                      to="/account/myData"
                      className="text-white text-lg font-bold py-2 hover:text-red-500 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Account
                    </Link>
                  )}
                {isLoggedIn && user?.role === "ROLE_ADMIN" && (
                  <Link
                    to="/admin/allCars"
                    className="text-white text-lg font-bold py-2 hover:text-red-500 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        {
          isHomePage && (
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="hidden lg:block text-white text-2xl sm:text-3xl md:text-4xl font-bold text-center italic text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);">
                <span className=" text-red-600 italic">RentCar</span> – Your Road
                to <span className=" text-red-600 italic">Freedom</span>
              </h1>
            </div>
          )}
      </header >

      {/* Main Content */}
      < main className="flex-grow container mx-auto px-4 py-6 sm:py-8" >
        {children}
      </main >

      {/* Footer */}
      < footer className="bg-gray-800 text-white py-6 sm:py-8" >
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
            <div className="space-x-6">
              <Link
                to="/about"
                className=" text-white hover:text-gray-300 hover:underline transition-colors"
              >
                About us
              </Link>
              <Link
                to="/contacts"
                className=" text-white hover:text-gray-300 hover:underline transition-colors"
              >
                Contacts
              </Link>
            </div>
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} RentCar. All rights reserved.
            </div>
          </div>
        </div>
      </footer >
    </div >
  );
}

export default Layout;
