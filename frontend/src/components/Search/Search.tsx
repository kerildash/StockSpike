import { type ChangeEvent, type FC, type KeyboardEvent } from 'react';

interface SearchProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;  
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  search: string;
}



const Search: FC<SearchProps> = ({ onChange, onKeyDown, search }: SearchProps) => {
  
  return (
    <section>
      <input
        type='text'
        value={search}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </section>
  );
};

export default Search;
