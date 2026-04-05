import { useEffect, useState, type FC } from 'react';
import { getTtmKeyMetrics, type IKeyMetricsTtm } from '../../../services/FinancialApiService';
import { RatioList } from '../../RatioList/RatioList';
import { Link, useOutletContext } from 'react-router-dom';
import Loading from '../../Loading/Loading';
import { ExpandableText } from '../../ExpandableText/ExpandableText';
import { ErrorTile } from '../../ErrorTile/ErrorTile';
interface ICompanyProfileProps {}

const listConfig = [
  {
    label: 'Market Capitalization',
    render: (company: IKeyMetricsTtm) => company.marketCap,
    description: "The total value of a company's shares of stock.",
  },

  {
    label: 'Enterprise Value',
    render: (company: IKeyMetricsTtm) => company.enterpriseValueTTM,
    description: "The total value of a company's debt and equity.",
  },
  {
    label: 'EV/EBITDA',
    render: (company: IKeyMetricsTtm) => company.evToEBITDATTM,
    description:
      "The total value of a company's operations relative to its earnings before interest, taxes, depreciation, and amortization.",
  },
  {
    label: 'EV/FCF',
    render: (company: IKeyMetricsTtm) => company.evToFreeCashFlowTTM,
    description:
      "The total value of a company's operations relative to its free cash flow.",
  },
  {
    label: 'Return On Equity',
    render: (company: IKeyMetricsTtm) => company.returnOnEquityTTM,
    description:
      "Demonstrates how business uses shareholders' equity to generate net income.",
  },
  {
    label: 'Return On Invested Capital',
    render: (company: IKeyMetricsTtm) => company.returnOnInvestedCapitalTTM,
    description:
      'The amount of net income returned as a percentage of the capital that is employed to generate that income.',
  },
  {
    label: 'Free Cash Flow Yield',
    render: (company: IKeyMetricsTtm) => company.freeCashFlowYieldTTM,
    description:
      "The ratio of a company's free cash flow to its market capitalization.",
  },
  {
    label: 'Debt to EBITDA',
    render: (company: IKeyMetricsTtm) => company.netDebtToEBITDATTM,
    description: "The ratio of a company's net debt to its EBITDA.",
  },
  {
    label: 'Current Ratio',
    render: (company: IKeyMetricsTtm) => company.currentRatioTTM,
    description:
      'The ability of a company to cover its short-term obligations with its current assets.',
  },
  {
    label: 'Free Cash Flow to Equity',
    render: (company: IKeyMetricsTtm) => company.freeCashFlowToEquityTTM,
    description:
      'The amount of cash a company generates after all expenses, reinvestment, and debts are paid.',
  },
];

export const CompanyProfile: FC<ICompanyProfileProps> = () => {
  const { ticker, description } = useOutletContext<{
    ticker: string;
    description: string;
  }>();

  const [keyMetrics, setKeyMetrics] = useState<IKeyMetricsTtm>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const getKeyMetricsInit = async () => {
      try {
        setLoading(true);
        const result = await getTtmKeyMetrics(ticker);

        if (typeof result === 'string') {
          setError(result);
        } else if (result) {
          setKeyMetrics(result);
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

    getKeyMetricsInit();
  }, []);

  return (
    <div>
      <ExpandableText text={description} maxSentences={3} className='mb-5' />
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorTile message='Company metrics not available.' isWarning>
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
        <RatioList config={listConfig} data={keyMetrics} />
      )}
    </div>
  );
};
