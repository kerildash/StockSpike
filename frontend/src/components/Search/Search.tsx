import { type ChangeEvent, type FC, type KeyboardEvent } from 'react';
import { IoSearch } from "react-icons/io5";

interface SearchProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;  
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  search: string;
}



const Search: FC<SearchProps> = ({ onChange, onKeyDown, search }: SearchProps) => {
  
  return (
    <section className="max-w-3xl mx-auto ">
      <div className="relative">
        <input
          type='text'
          value={search}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder="Search companies..."
          className="w-full px-4 py-2 pl-10 text-gray-900 bg-white border-1 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors duration-200"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <IoSearch className="mt-0.75 w-4 h-4 text-gray-400" />
        </div>
      </div>
    </section>
  );
};

export default Search;
