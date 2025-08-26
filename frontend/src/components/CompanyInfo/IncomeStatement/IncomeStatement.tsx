import { useEffect, useState, type FC } from 'react';
import { Table } from '../../Table/Table';
import { type ICompanyIncomeStatement, getIncomeStatement } from '../../../api';
import { Link, useOutletContext } from 'react-router-dom';
import Loading from '../../Loading/Loading';
import { ErrorTile } from '../../ErrorTile/ErrorTile';
interface IIncomeStatementProps {}
const configs = [
  {
    label: 'Date',
    render: (company: ICompanyIncomeStatement) => company.date,
  },
  {
    label: 'Revenue',
    render: (company: ICompanyIncomeStatement) => company.revenue,
  },
  {
    label: 'Cost Of Revenue',
    render: (company: ICompanyIncomeStatement) => company.costOfRevenue,
  },
  {
    label: 'Gross Profit',
    render: (company: ICompanyIncomeStatement) => company.grossProfit,
  },
  {
    label: 'Depreciation & Amortization',
    render: (company: ICompanyIncomeStatement) =>
      company.depreciationAndAmortization,
  },
  {
    label: 'EBITDA',
    render: (company: ICompanyIncomeStatement) => company.ebitda,
  },
  {
    label: 'EBIT',
    render: (company: ICompanyIncomeStatement) => company.ebit,
  },
  {
    label: 'Operating Income',
    render: (company: ICompanyIncomeStatement) => company.operatingIncome,
  },
  {
    label: 'Non-Operating Income',
    render: (company: ICompanyIncomeStatement) =>
      company.nonOperatingIncomeExcludingInterest,
  },
  {
    label: 'Total Other Income/Expenses Net',
    render: (company: ICompanyIncomeStatement) =>
      company.totalOtherIncomeExpensesNet,
  },
  {
    label: 'Income Before Tax',
    render: (company: ICompanyIncomeStatement) => company.incomeBeforeTax,
  },
  {
    label: 'Income Tax Expense',
    render: (company: ICompanyIncomeStatement) => company.incomeTaxExpense,
  },
  {
    label: 'Net Income',
    render: (company: ICompanyIncomeStatement) => company.netIncome,
  },
  {
    label: 'Earnings Per Share',
    render: (company: ICompanyIncomeStatement) => company.eps,
  },
];
export const IncomeStatement: FC<IIncomeStatementProps> = () => {
  const { ticker } = useOutletContext<{ ticker: string }>();
  const [incomeStatement, setIncomeStatement] =
    useState<ICompanyIncomeStatement[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    setLoading(true);
    const getIncomeStatementInit = async () => {
      try {
        setLoading(true);
        const result = await getIncomeStatement(ticker);

        if (typeof result === 'string') {
          setError(result);
        } else if (result) {
          setIncomeStatement(result);
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

    getIncomeStatementInit();
  }, []);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorTile message='Income statement not available.' isWarning>
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
        <Table data={incomeStatement} config={configs} />
      )}
    </div>
  );
};
