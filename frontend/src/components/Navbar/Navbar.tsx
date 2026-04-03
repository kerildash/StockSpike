import { type FC } from "react";
import { Link } from "react-router-dom";
import { NavbarAuth } from "./NavbarAuth/NavbarAuth";

export const Navbar: FC = () => {
    return (
        <nav className="sticky flex h-16 items-center overflow-x-hidden bg-gray-800">
            <div className="flex w-full min-w-max flex-nowrap items-baseline justify-between gap-4 pl-12 pr-12">
                <div className="flex shrink-0 flex-nowrap items-baseline gap-12">
                    <Link
                        to="/"
                        className="text-2xl font-bold text-white mr-12 whitespace-nowrap transition-colors duration-200 hover:text-gray-300"
                    >
                        stock📈spike
                    </Link>
                    <Link
                        to="/search"
                        className="ml-12 mr-12 text-lg text-white whitespace-nowrap transition-colors duration-200 hover:text-gray-300"
                    >
                        Search
                    </Link>
                </div>
                <NavbarAuth />
            </div>
        </nav>
    );
}
