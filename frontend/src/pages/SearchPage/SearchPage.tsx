import {
  type FC,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  useEffect,
} from 'react';
import { searchCompanies, type ICompanySearch } from '../../api';
import { ListPortfolio } from '../../components/Portfolio/ListPortfolio/ListPortfolio';
import CardList from '../../components/CardList/CardList';
import Search from '../../components/Search/Search';
import Loading from '../../components/Loading/Loading';
import { ErrorTile } from '../../components/ErrorTile/ErrorTile';
import type { StockResponse } from '../../models/StockResponse';
import {
  addToPortfolioWithApi,
  deleteFromPortfolioWithApi,
  getPortfolioWithApi,
} from '../../services/PortfolioService';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/useAuth';
import {
  addToPortfolio,
  deleteFromPortfolio,
  getGuestPortfolio,
} from '../../services/GuestPortfolioService';
import { useLocation } from 'react-router';

interface ISearchPageProps {}

type NavigationState = {
  search?: string;
};

export const SearchPage: FC<ISearchPageProps> = () => {
  const [search, setSearch] = useState<string>('');
  const [searchResponse, setSearchResponse] = useState<ICompanySearch[]>([]);
  const [serverError, setServerError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [portfolioItems, setPortfolioItems] = useState<StockResponse[]>([]);
  
  const location = useLocation();
  const navigationState = location.state as NavigationState | null;

  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (navigationState?.search){
      setSearch(navigationState?.search);
      runSearch(navigationState?.search);
    }

    getPortfolio();
  }, []);
  

  const getPortfolio = () => {
    if (isLoggedIn()) {
      getPortfolioWithApi()
        .then((response) => {
          if (response?.data) {
            setPortfolioItems(response?.data);
          }
        })
        .catch(() => {
          toast.error('Error while getting the portfolio.');
        });
    } else {
      const portfolio = getGuestPortfolio();
      const portfolioMapped: StockResponse[] = portfolio.map((item) => {
        return {
          id: null,
          ticker: item,
          companyName: null,
          price: null,
          marketCap: null,
        };
      });
      setPortfolioItems(portfolioMapped);
    }
  };

  const searchOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const onAddToPortfolio = (e: any) => {
    if (isLoggedIn()) {
      const item = e.target[0].value;
      addToPortfolioWithApi(item)
        .then((response) => {
          if (response?.status === 200) {
            toast.success(`${item.toUpperCase()}Item added to portfolio!`);
            getPortfolio();
          }
        })
        .catch(() => {
          toast.error('Failed to add item to the portfolio.');
        });
    } else {
      const item = e.target[0].value;
      const isAdded = addToPortfolio(item);
      if(!isAdded){
        toast.error(`${item.toUpperCase()} already in portfolio.`);
        return;
      }

      toast.success(`${item.toUpperCase()}Item added to portfolio!`);
      getPortfolio();
    }
  };

  const onDeleteFromPortfolio = (e: any) => {
    console.log(e);
    if (isLoggedIn()) {
      deleteFromPortfolioWithApi(e.target.value)
        .then((response) => {
          if (response?.status === 200) {
            toast.success('Item removed from portfolio!');
            getPortfolio();
          }
        })
        .catch(() => {
          toast.error('Failed to remove item from the portfolio.');
        });
    } else {
      deleteFromPortfolio(e.target.value);
      getPortfolio();
    }
  };

  const runSearch = async (term: string) => {
    setLoading(true);
    const result = await searchCompanies(term);

    if (typeof result === 'string') {
      setServerError(result);
      console.log(result);
      setSearchResponse([]);
    } else {
      setServerError('');
      setSearchResponse(result);
    }
    setLoading(false);
  }

  const onKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      runSearch(search);
    }
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <div className='flex-2 min-h-screen bg-gray-50'>
        {/* First Column - CardList and Loading */}
        <div className='min-w-[20rem] p-6 lg:pr-[22rem]'>
          <Search
            onChange={searchOnChange}
            onKeyDown={onKeyDown}
            search={search}
          />
          {loading ? (
            <Loading />
          ) : serverError ? (
            <ErrorTile message={serverError} className='m-15' isWarning />
          ) : (
            <CardList
              companies={searchResponse}
              onAddToPortfolio={onAddToPortfolio}
            />
          )}
        </div>

        {/* Second Column - Portfolio */}
        <div className='hidden lg:block fixed top-16 right-0 h-[calc(100vh-4rem)] w-80 overflow-y-auto bg-white border-l border-gray-200'>
          <div className='p-6'>
            <h2 className='text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3'>
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
  );
};
