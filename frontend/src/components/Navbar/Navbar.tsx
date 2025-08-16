import { type FC } from "react";
import { Link } from "react-router-dom";

export const Navbar: FC = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex items-center">
                <Link to="/" className="text-white text-2xl font-bold ml-12 mr-12">
                    stock📈spike
                </Link>
                <Link to="/search" className="text-white text-lg ml-12 mr-12 hover:text-gray-300 transition-colors duration-200">
                    Search
                </Link>
            </div>
        </nav>
    );
}
