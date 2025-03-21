import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <div className="flex flex-col items-center container max-h-screen w-screen text-center overflow-hidden">
            <h1 className="text-6xl font-bold text-red-600">404</h1>
            <p className="text-xl text-gray-700 mt-4">Page not found</p>
            <Link to="/" className="mt-6 px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition">
                Go Home
            </Link>
        </div>
    );
}

export default NotFoundPage;
