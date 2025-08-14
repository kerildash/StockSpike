import { useState, type ChangeEvent, type KeyboardEvent } from 'react';
import CardList from './components/CardList/CardList';
import Search from './components/Search/Search';
import './App.css';
import { searchCompanies, type CompanySearch } from './api';

const App: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [searchResponse, setSearchResponse] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string>('');

  const searchOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  const onKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter')  {
      const result = await searchCompanies(search);

      if (typeof result === 'string') {
        setServerError(result);
        console.log(result);
      } else {
        setSearchResponse(result);
      }
    }
  };

  return (
    <>
      <Search onChange={searchOnChange} onKeyDown={onKeyDown} search={search}/>
      {serverError ? <p>{serverError}</p> : <CardList companies={searchResponse}/>}

      
    </>
  );
}

export default App;
