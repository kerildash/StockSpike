import axios from 'axios';

export interface CompanySearch {
  currency: string;
  exchangeFullName: string;
  name: string;
  exchange: string;
  symbol: string;
}

export interface CompanyInfo {
		symbol: string;
		price: number;
		marketCap: number;
		beta: number;
		lastDividend: number;
		range: string;
		change: number;
		changePercentage: number;
		volume: number;
		averageVolume: number;
		companyName: string;
		currency: string;
		cik: string;
		isin: string;
		cusip: string;
		exchangeFullName: string;
		exchange: string;
		industry: string;
		website: string;
		description: string;
		ceo: string;
		sector: string;
		country: string;
		fullTimeEmployees: string;
		phone: string;
		address: string;
		city: string;
		state: string;
		zip: string;
		image: string;
		ipoDate: string;
		defaultImage: boolean;
		isEtf: boolean;
		isActivelyTrading: boolean;
		isAdr: boolean;
		isFund: boolean;
}

export const searchCompanies = async (query: string) : Promise<CompanySearch[] | string> => {
  const apiKey = import.meta.env.VITE_API_KEY;
  if (!apiKey) throw new Error('API key is not set');
  try {
    const response = await axios.get<CompanySearch[]>(
      `https://financialmodelingprep.com/stable/search-symbol`,
      {
        params: {
          query,
          apikey: apiKey,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error searching companies:', error.message);
      return 'Error searching companies';
    } else {
      console.error('unexpected error', error);
      return 'Unexpected error';
    }
  }
};

export const getCompanyInfo = async (ticker: string) : Promise<CompanyInfo | string> => {
  const apiKey = import.meta.env.VITE_API_KEY;
  if (!apiKey) throw new Error('API key is not set');
  try {
    const response = await axios.get<CompanyInfo[]>(
      `https://financialmodelingprep.com/stable/profile`,
      {
        params: {
          symbol: ticker,
          apikey: apiKey,
        },
      }
    );
    return response.data[0];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error getting company info:', error.message);
      return 'Error getting company info';
    }
    else {
      console.error('unexpected error', error);
      return 'Unexpected error';
    }
  }
};