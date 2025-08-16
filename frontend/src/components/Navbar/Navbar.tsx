import { type ChangeEvent, type FC, type KeyboardEvent } from "react";
import Search from "../Search/Search";
interface INavbarProps {
    searchOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
    search: string;
};

export const Navbar: FC<INavbarProps> = ({ searchOnChange, onKeyDown, search }: INavbarProps) => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex items-center">
                <a href="/" className="text-white text-2xl font-bold ml-12 mr-12">
                    stock📈spike
                </a>
                <div className="flex-1 max-w-lg ml-8">
                    <Search onChange={searchOnChange} onKeyDown={onKeyDown} search={search} />
                </div>
            </div>
        </nav>
    );
}
