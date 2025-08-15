import { useState, type ChangeEvent, type KeyboardEvent, } from 'react';
import CardList from './components/CardList/CardList';
import Search from './components/Search/Search';
import './App.css';
import { searchCompanies, type CompanySearch } from './api';
import { ListPortfolio } from './components/Portfolio/ListPortfolio/ListPortfolio';

const App: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [searchResponse, setSearchResponse] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [portfolioItems, setPortfolioItems] = useState<string[]>([]);


  const searchOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const onAddToPortfolio = (e: any) => {
    console.log('onAddToPortfolio');
    if (portfolioItems.includes(e.target[0].value)) {
      return;
    }
    const portfolioUpdate = [...portfolioItems, e.target[0].value]
    setPortfolioItems(portfolioUpdate);
  }
  const onKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter')  {
      setLoading(true);
      const result = await searchCompanies(search);

      if (typeof result === 'string') {
        setServerError(result);
        console.log(result);
      } else {
        setSearchResponse(result);
      }
      setLoading(false);
    }
  };

  const onDeleteFromPortfolio = (e: any) => {
    console.log('onDeleteFromPortfolio');
    const portfolioUpdate = portfolioItems.filter((item) => item !== e.target.value);
    setPortfolioItems(portfolioUpdate);
  }

  return (
    <>
    
      <Search onChange={searchOnChange} onKeyDown={onKeyDown} search={search}/>
      <ListPortfolio portfolioItems={portfolioItems} onDeleteFromPortfolio={onDeleteFromPortfolio}/>
      {loading && <p>Loading...</p>}
      {serverError ? <p>{serverError}</p> : <CardList companies={searchResponse} onAddToPortfolio={onAddToPortfolio}/>}

      
    </>
  );
}

export default App;
