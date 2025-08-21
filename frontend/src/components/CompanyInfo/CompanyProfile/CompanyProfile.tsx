import { useEffect, useState, type FC } from 'react';
import { getTtmKeyMetrics, type IKeyMetricsTtm } from '../../../api';
import { RatioList } from '../../RatioList/RatioList';
import { useOutletContext } from 'react-router-dom';
import Loading from '../../Loading/Loading';
interface ICompanyProfileProps {}

const tableConfig = [
  {
    label: "Market Capitalization",
    render: (company: IKeyMetricsTtm) => company.marketCap,
    description: "The total value of a company's shares of stock.",
  },
  
  {
    label: "Enterprise Value",
    render: (company: IKeyMetricsTtm) => company.enterpriseValueTTM,
    description: "The total value of a company's debt and equity.",
  },
  {
    label: "EV/EBITDA",
    render: (company: IKeyMetricsTtm) => company.evToEBITDATTM,
    description: "The total value of a company's operations relative to its earnings before interest, taxes, depreciation, and amortization.",
  },
  {
    label: "EV/FCF",
    render: (company: IKeyMetricsTtm) => company.evToFreeCashFlowTTM,
    description: "The total value of a company's operations relative to its free cash flow.",
  },
  
  {
    label: "Return On Equity",
    render: (company: IKeyMetricsTtm) => company.returnOnEquityTTM,
    description: "Demonstrates how business uses shareholders' equity to generate net income.",
  },
  
  {
    label: "Return On Invested Capital",
    render: (company: IKeyMetricsTtm) => company.returnOnInvestedCapitalTTM,
    description: "The amount of net income returned as a percentage of the capital that is employed to generate that income.",
  },
  {
    label: "Free Cash Flow Yield",
    render: (company: IKeyMetricsTtm) => company.freeCashFlowYieldTTM,
    description: "The ratio of a company's free cash flow to its market capitalization.",
  },
  
  {
    label: "Debt to EBITDA",
    render: (company: IKeyMetricsTtm) => company.netDebtToEBITDATTM,
    description: "The ratio of a company's net debt to its EBITDA.",
  },
  
  {
    label: "Current Ratio",
    render: (company: IKeyMetricsTtm) => company.currentRatioTTM,
    description: "The ability of a company to cover its short-term obligations with its current assets.",
  },
  {
    label: "Free Cash Flow to Equity",
    render: (company: IKeyMetricsTtm) => company.freeCashFlowToEquityTTM,
    description: "The amount of cash a company generates after all expenses, reinvestment, and debts are paid.",
  },
];


export const CompanyProfile: FC<ICompanyProfileProps> = (props) => {
  const ticker = useOutletContext<string>();
  const [keyMetrics, setKeyMetrics] = useState<IKeyMetricsTtm>();
  useEffect(() => {
    const getKeyMetrics = async () => {
      const result = await getTtmKeyMetrics(ticker);
      if (typeof result === 'string') {
        console.log('Error getting company info');
      } else {
        setKeyMetrics(result);
      }
    };
    getKeyMetrics();
  }, []);
  return (
    <div>
      {keyMetrics ? <RatioList config={tableConfig} data={keyMetrics} /> : <Loading />}
    </div>
  );
};
