import { useEffect, useState, type FC } from 'react';
import { Table } from '../../Table/Table';
import { type ICompanyCashflowStatement, getCashflowStatement } from '../../../api';
import { useOutletContext } from 'react-router-dom';
import Loading from '../../Loading/Loading';
interface ICashflowStatementProps {}
const configs = [
  {
    label: "Date",
    render: (company: ICompanyCashflowStatement) => company.date,
  },
  {
    label: "Net Income",
    render: (company: ICompanyCashflowStatement) => company.netIncome,
  },
  {
    label: "Net Cash From Operating Activities",
    render: (company: ICompanyCashflowStatement) => company.netCashProvidedByOperatingActivities,
  },
  {
    label: "Net Cash From Investing Activities",
    render: (company: ICompanyCashflowStatement) => company.netCashProvidedByInvestingActivities,
  },
  {
    label: "Net Dividends Paid",
    render: (company: ICompanyCashflowStatement) => company.netDividendsPaid,
  },
  {
    label: "Net Cash From Financing Activities",
    render: (company: ICompanyCashflowStatement) => company.netCashProvidedByFinancingActivities,
  },
  {
    label: "Net Change In Cash",
    render: (company: ICompanyCashflowStatement) => company.netChangeInCash,
  },
  {
    label: "Operating Cash Flow",
    render: (company: ICompanyCashflowStatement) => company.operatingCashFlow,
  },
  {
    label: "Capital Expenditure",
    render: (company: ICompanyCashflowStatement) => company.capitalExpenditure,
  },
  {
    label: "Free Cash Flow",
    render: (company: ICompanyCashflowStatement) => company.freeCashFlow,
  },
];
export const CashflowStatement: FC<ICashflowStatementProps> = (props) => {
  const ticker = useOutletContext<string>();
  const [cashflowStatement, setCashflowStatement] = useState<ICompanyCashflowStatement[]>();
  useEffect(() => {
    const fetchCashflowStatement = async () => {
      const result = await getCashflowStatement(ticker);
      if (typeof result === 'string') {
        console.log('Error getting company info');
      } else {
        setCashflowStatement(result);
      }
    };
    fetchCashflowStatement();
  }, []);
  return (
    <div>
      {cashflowStatement ? <Table data={cashflowStatement} config={configs} /> : <Loading />}
    </div>
  );
};