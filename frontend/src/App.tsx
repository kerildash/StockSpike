import { useState, type ChangeEvent, type KeyboardEvent } from 'react';
import CardList from './components/CardList/CardList';
import './App.css';
import { searchCompanies, type CompanySearch } from './api';
import { ListPortfolio } from './components/Portfolio/ListPortfolio/ListPortfolio';
import { Navbar } from './components/Navbar/Navbar';

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
    const portfolioUpdate = [...portfolioItems, e.target[0].value];
    setPortfolioItems(portfolioUpdate);
  };
  const onKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setLoading(true);
      const result = await searchCompanies(search);

      if (typeof result === 'string') {
        setServerError(result);
        console.log(result);
      } else {
        setServerError('');
        setSearchResponse(result);
      }
      setLoading(false);
    }
  };

  const onDeleteFromPortfolio = (e: any) => {
    console.log('onDeleteFromPortfolio');
    const portfolioUpdate = portfolioItems.filter(
      (item) => item !== e.target.value
    );
    setPortfolioItems(portfolioUpdate);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 sticky top-0 z-50">
        <Navbar searchOnChange={searchOnChange} onKeyDown={onKeyDown} search={search} />
      </div>
      <div className="flex-2 flex flex-col lg:flex-row min-h-screen bg-gray-50">
        {/* First Column - CardList and Loading */}
        <div className="flex-1 min-w-[20rem] p-6">
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="ml-4 text-lg text-gray-600 font-medium">Loading...</p>
            </div>
          )}
          {serverError ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <div className="text-red-400 text-4xl mb-4">⚠️</div>
              <p className="text-red-700 font-medium text-lg">{serverError}</p>
            </div>
          ) : (
            <CardList companies={searchResponse} onAddToPortfolio={onAddToPortfolio}/>
          )}
        </div>
        
        {/* Second Column - Portfolio */}
        <div className="hidden lg:block w-80 bg-white border-l border-gray-200 shadow-lg">
          <div className="sticky top-0 h-screen overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">
                Portfolio
              </h2>
              <ListPortfolio
                portfolioItems={portfolioItems}
                onDeleteFromPortfolio={onDeleteFromPortfolio}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
