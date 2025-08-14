import axios from 'axios';

export interface CompanySearch {
  currency: string;
  exchangeFullName: string;
  name: string;
  exchange: string;
  symbol: string;
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
