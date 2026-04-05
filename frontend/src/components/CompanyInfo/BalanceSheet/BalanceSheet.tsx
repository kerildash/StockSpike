import { useEffect, useState, type FC } from 'react';
import { Table } from '../../Table/Table';
import { type ICompanyBalanceSheetStatement, getBalanceSheet } from '../../../services/FinancialApiService';
import { Link, useOutletContext } from 'react-router-dom';
import Loading from '../../Loading/Loading';
import { ErrorTile } from '../../ErrorTile/ErrorTile';
interface IBalanceSheetProps {}
const configs = [
  {
    label: "Date",
    render: (company: ICompanyBalanceSheetStatement) => company.date,
  },
  {
    label: "Cash and Cash Equivalents",
    render: (company: ICompanyBalanceSheetStatement) => company.cashAndCashEquivalents,
  },
  {
    label: "Short Term Investments",
    render: (company: ICompanyBalanceSheetStatement) => company.shortTermInvestments,
  },
  {
    label: "Net Receivables",
    render: (company: ICompanyBalanceSheetStatement) => company.netReceivables,
  },
  {
    label: "Inventory",
    render: (company: ICompanyBalanceSheetStatement) => company.inventory,
  },
  {
    label: "Total Current Assets",
    render: (company: ICompanyBalanceSheetStatement) => company.totalCurrentAssets,
  },
  {
    label: "Property Plant Equipment Net",
    render: (company: ICompanyBalanceSheetStatement) => company.propertyPlantEquipmentNet,
  },
  {
    label: "Goodwill",
    render: (company: ICompanyBalanceSheetStatement) => company.goodwill,
  },
  {
    label: "Intangible Assets",
    render: (company: ICompanyBalanceSheetStatement) => company.intangibleAssets,
  },
  {
    label: "Total Assets",
    render: (company: ICompanyBalanceSheetStatement) => company.totalAssets,
  },
  {
    label: "Account Payables",
    render: (company: ICompanyBalanceSheetStatement) => company.accountPayables,
  },
  {
    label: "Short Term Debt",
    render: (company: ICompanyBalanceSheetStatement) => company.shortTermDebt,
  },
  {
    label: "Total Current Liabilities",
    render: (company: ICompanyBalanceSheetStatement) => company.totalCurrentLiabilities,
  },
  {
    label: "Long Term Debt",
    render: (company: ICompanyBalanceSheetStatement) => company.longTermDebt,
  },
  {
    label: "Total Liabilities",
    render: (company: ICompanyBalanceSheetStatement) => company.totalLiabilities,
  },
  {
    label: "Common Stock",
    render: (company: ICompanyBalanceSheetStatement) => company.commonStock,
  },
  {
    label: "Retained Earnings",
    render: (company: ICompanyBalanceSheetStatement) => company.retainedEarnings,
  },
  {
    label: "Total Stockholders Equity",
    render: (company: ICompanyBalanceSheetStatement) => company.totalStockholdersEquity,
  },
  {
    label: "Total Debt",
    render: (company: ICompanyBalanceSheetStatement) => company.totalDebt,
  },
  {
    label: "Net Debt",
    render: (company: ICompanyBalanceSheetStatement) => company.netDebt,
  },
];
export const BalanceSheet: FC<IBalanceSheetProps> = () => {
  const {ticker} = useOutletContext<{ticker: string}>();
  const [balanceSheet, setBalanceSheet] = useState<ICompanyBalanceSheetStatement[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    setLoading(true);
    const getBalanceSheetInit = async () => {
      try {
        setLoading(true);
        const result = await getBalanceSheet(ticker);

        if (typeof result === 'string') {
          setError(result);
        } else if (result) {
          setBalanceSheet(result);
          setError(null);
        } else {
          setError('No company data found');
        }
      } catch (err) {
        setError('Failed to fetch company info');
      } finally {
        setLoading(false);
      }
    };

    getBalanceSheetInit();
  }, []);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorTile message='Balance sheet not available.' isWarning>
          <div>
            <p className='text-yellow-700'>Please check another company, for example:</p>
            <div className='mt-4 grid grid-cols-4 gap-2 w-fit mx-auto'>
            {['AAPL', 'MSFT', 'TSLA', 'META'].map((ticker) => (
              <Link
                title='View company details'
                to={`/company/${ticker}/company-profile`}
                className='border-1 border-yellow-200 bg-white hover:border-green-300 hover:bg-green-100 text-gray-800 font-medium py-2 px-4 rounded cursor-pointer transition-colors duration-200 whitespace-nowrap'
              >
                {ticker}
              </Link>
            ))}
            </div>
          </div>
        </ErrorTile>
      ) : (
        <Table data={balanceSheet} config={configs} />
      )}
    </div>
  );
};