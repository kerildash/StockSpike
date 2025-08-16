import { type ChangeEvent, type FC, type KeyboardEvent } from 'react';

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
          className="w-full px-4 py-2 pl-10 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Search;
