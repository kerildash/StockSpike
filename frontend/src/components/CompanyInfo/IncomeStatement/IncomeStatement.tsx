import { useEffect, useState, type FC } from 'react';
import { Table } from '../../Table/Table';
import { type ICompanyIncomeStatement, getIncomeStatement } from '../../../api';
import { useOutletContext } from 'react-router-dom';
import Loading from '../../Loading/Loading';
interface IIncomeStatementProps {}
const configs = [
  {
    label: "Date",
    render: (company: ICompanyIncomeStatement) => company.date,
  },
  {
    label: "Revenue",
    render: (company: ICompanyIncomeStatement) => company.revenue,
  },
  {
    label: "Cost Of Revenue",
    render: (company: ICompanyIncomeStatement) => company.costOfRevenue,
  },
  {
    label: "Gross Profit",
    render: (company: ICompanyIncomeStatement) => company.grossProfit,
  },
  {
    label: "Depreciation & Amortization",
    render: (company: ICompanyIncomeStatement) => company.depreciationAndAmortization,
  },
  {
    label: "EBITDA",
    render: (company: ICompanyIncomeStatement) => company.ebitda,
  },
  {
    label: "EBIT",
    render: (company: ICompanyIncomeStatement) => company.ebit,
  },
  {
    label: "Operating Income",
    render: (company: ICompanyIncomeStatement) => company.operatingIncome,
  },
  {
    label: "Non-Operating Income",
    render: (company: ICompanyIncomeStatement) => company.nonOperatingIncomeExcludingInterest,
  },
  {
    label: "Total Other Income/Expenses Net",
    render: (company: ICompanyIncomeStatement) => company.totalOtherIncomeExpensesNet,
  },
  {
    label: "Income Before Tax",
    render: (company: ICompanyIncomeStatement) => company.incomeBeforeTax,
  },
  {
    label: "Income Tax Expense",
    render: (company: ICompanyIncomeStatement) => company.incomeTaxExpense,
  },
  {
    label: "Net Income",
    render: (company: ICompanyIncomeStatement) => company.netIncome,
  },
  {
    label: "Earnings Per Share",
    render: (company: ICompanyIncomeStatement) => company.eps,
  },
];
export const IncomeStatement: FC<IIncomeStatementProps> = (props) => {
  const ticker = useOutletContext<string>();
  const [incomeStatement, setIncomeStatement] = useState<ICompanyIncomeStatement[]>();
  useEffect(() => {
    const fetchIncomeStatement = async () => {
      const result = await getIncomeStatement(ticker);
      if (typeof result === 'string') {
        console.log('Error getting company info');
      } else {
        setIncomeStatement(result);
      }
    };
    fetchIncomeStatement();
  }, []);
  return (
    <div>
      {incomeStatement ? <Table data={incomeStatement} config={configs} /> : <Loading />}
    </div>
  );
};