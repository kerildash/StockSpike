import axios from 'axios';

export interface ICompanySearch {
  currency: string;
  exchangeFullName: string;
  name: string;
  exchange: string;
  symbol: string;
}

export interface IKeyMetricsTtm {
  symbol: string;
  marketCap: number;
  enterpriseValueTTM: number;
  evToSalesTTM: number;
  evToOperatingCashFlowTTM: number;
  evToFreeCashFlowTTM: number;
  evToEBITDATTM: number;
  netDebtToEBITDATTM: number;
  currentRatioTTM: number;
  incomeQualityTTM: number;
  grahamNumberTTM: number;
  grahamNetNetTTM: number;
  taxBurdenTTM: number;
  interestBurdenTTM: number;
  workingCapitalTTM: number;
  investedCapitalTTM: number;
  returnOnAssetsTTM: number;
  operatingReturnOnAssetsTTM: number;
  returnOnTangibleAssetsTTM: number;
  returnOnEquityTTM: number;
  returnOnInvestedCapitalTTM: number;
  returnOnCapitalEmployedTTM: number;
  earningsYieldTTM: number;
  freeCashFlowYieldTTM: number;
  capexToOperatingCashFlowTTM: number;
  capexToDepreciationTTM: number;
  capexToRevenueTTM: number;
  salesGeneralAndAdministrativeToRevenueTTM: number;
  researchAndDevelopementToRevenueTTM: number;
  stockBasedCompensationToRevenueTTM: number;
  intangiblesToTotalAssetsTTM: number;
  averageReceivablesTTM: number;
  averagePayablesTTM: number;
  averageInventoryTTM: number;
  daysOfSalesOutstandingTTM: number;
  daysOfPayablesOutstandingTTM: number;
  daysOfInventoryOutstandingTTM: number;
  operatingCycleTTM: number;
  cashConversionCycleTTM: number;
  freeCashFlowToEquityTTM: number;
  freeCashFlowToFirmTTM: number;
  tangibleAssetValueTTM: number;
  netCurrentAssetValueTTM: number;
}

export interface ICompanyInfo {
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
export interface ICompanyIncomeStatement {
  date: string;
  symbol: string;
  reportedCurrency: string;
  cik: string;
  filingDate: string;
  acceptedDate: string;
  fiscalYear: string;
  period: string;
  revenue: number;
  costOfRevenue: number;
  grossProfit: number;
  researchAndDevelopmentExpenses: number;
  generalAndAdministrativeExpenses: number;
  sellingAndMarketingExpenses: number;
  sellingGeneralAndAdministrativeExpenses: number;
  otherExpenses: number;
  operatingExpenses: number;
  costAndExpenses: number;
  netInterestIncome: number;
  interestIncome: number;
  interestExpense: number;
  depreciationAndAmortization: number;
  ebitda: number;
  ebit: number;
  nonOperatingIncomeExcludingInterest: number;
  operatingIncome: number;
  totalOtherIncomeExpensesNet: number;
  incomeBeforeTax: number;
  incomeTaxExpense: number;
  netIncomeFromContinuingOperations: number;
  netIncomeFromDiscontinuedOperations: number;
  otherAdjustmentsToNetIncome: number;
  netIncome: number;
  netIncomeDeductions: number;
  bottomLineNetIncome: number;
  eps: number;
  epsDiluted: number;
  weightedAverageShsOut: number;
  weightedAverageShsOutDil: number;
}

export interface ICompanyBalanceSheetStatement {
  date: string;
  symbol: string;
  reportedCurrency: string;
  cik: string;
  filingDate: string;
  acceptedDate: string;
  fiscalYear: string;
  period: string;
  cashAndCashEquivalents: number;
  shortTermInvestments: number;
  cashAndShortTermInvestments: number;
  netReceivables: number;
  accountsReceivables: number;
  otherReceivables: number;
  inventory: number;
  prepaids: number;
  otherCurrentAssets: number;
  totalCurrentAssets: number;
  propertyPlantEquipmentNet: number;
  goodwill: number;
  intangibleAssets: number;
  goodwillAndIntangibleAssets: number;
  longTermInvestments: number;
  taxAssets: number;
  otherNonCurrentAssets: number;
  totalNonCurrentAssets: number;
  otherAssets: number;
  totalAssets: number;
  totalPayables: number;
  accountPayables: number;
  otherPayables: number;
  accruedExpenses: number;
  shortTermDebt: number;
  capitalLeaseObligationsCurrent: number;
  taxPayables: number;
  deferredRevenue: number;
  otherCurrentLiabilities: number;
  totalCurrentLiabilities: number;
  longTermDebt: number;
  deferredRevenueNonCurrent: number;
  deferredTaxLiabilitiesNonCurrent: number;
  otherNonCurrentLiabilities: number;
  totalNonCurrentLiabilities: number;
  otherLiabilities: number;
  capitalLeaseObligations: number;
  totalLiabilities: number;
  treasuryStock: number;
  preferredStock: number;
  commonStock: number;
  retainedEarnings: number;
  additionalPaidInCapital: number;
  accumulatedOtherComprehensiveIncomeLoss: number;
  otherTotalStockholdersEquity: number;
  totalStockholdersEquity: number;
  totalEquity: number;
  minorityInterest: number;
  totalLiabilitiesAndTotalEquity: number;
  totalInvestments: number;
  totalDebt: number;
  netDebt: number;
}
export const searchCompanies = async (query: string) : Promise<ICompanySearch[] | string> => {
  const apiKey = import.meta.env.VITE_API_KEY;
  if (!apiKey) throw new Error('API key is not set');
  try {
    const response = await axios.get<ICompanySearch[]>(
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

export const getCompanyInfo = async (ticker: string) : Promise<ICompanyInfo | string> => {
  const apiKey = import.meta.env.VITE_API_KEY;
  if (!apiKey) throw new Error('API key is not set');
  try {
    const response = await axios.get<ICompanyInfo[]>(
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


export const getTtmKeyMetrics = async (ticker: string) : Promise<IKeyMetricsTtm | string> => {
  const apiKey = import.meta.env.VITE_API_KEY;
  if (!apiKey) throw new Error('API key is not set');
  try {
    const response = await axios.get<IKeyMetricsTtm[]>(
      `https://financialmodelingprep.com/stable/key-metrics-ttm`,
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


export const getIncomeStatement = async (ticker: string) : Promise<ICompanyIncomeStatement[] | string> => {
  const apiKey = import.meta.env.VITE_API_KEY;
  if (!apiKey) throw new Error('API key is not set');
  try {
    const response = await axios.get<ICompanyIncomeStatement[]>(
      `https://financialmodelingprep.com/stable/income-statement`,
      {
        params: {
          symbol: ticker,
          apikey: apiKey,
        },
      }
    );
    return response.data;
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

export const getBalanceSheet = async (ticker: string) : Promise<ICompanyBalanceSheetStatement[] | string> => {
  const apiKey = import.meta.env.VITE_API_KEY;
  if (!apiKey) throw new Error('API key is not set');
  try {
    const response = await axios.get<ICompanyBalanceSheetStatement[]>(
      `https://financialmodelingprep.com/stable/balance-sheet-statement`,
      {
        params: {
          symbol: ticker,
          apikey: apiKey,
        },
      }
    );
    return response.data;
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
