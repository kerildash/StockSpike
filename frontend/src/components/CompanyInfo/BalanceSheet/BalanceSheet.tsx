import { useEffect, useState, type FC } from 'react';
import { Table } from '../../Table/Table';
import { type ICompanyBalanceSheetStatement, getBalanceSheet } from '../../../api';
import { useOutletContext } from 'react-router-dom';
import Loading from '../../Loading/Loading';
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
export const BalanceSheet: FC<IBalanceSheetProps> = (props) => {
  const ticker = useOutletContext<string>();
  const [balanceSheet, setBalanceSheet] = useState<ICompanyBalanceSheetStatement[]>();
  useEffect(() => {
    const fetchBalanceSheet = async () => {
      const result = await getBalanceSheet(ticker);
      if (typeof result === 'string') {
        console.log('Error getting company info');
      } else {
        setBalanceSheet(result);
      }
    };
    fetchBalanceSheet();
  }, []);
  return (
    <div>
      {balanceSheet ? <Table data={balanceSheet} config={configs} /> : <Loading />}
    </div>
  );
};