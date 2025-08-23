import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import { SearchPage } from '../pages/SearchPage/SearchPage';
import { CompanyInfoPage } from '../pages/CompanyInfoPage/CompanyInfoPage';
import { IncomeStatement } from '../components/CompanyInfo/IncomeStatement/IncomeStatement';
import { CompanyProfile } from '../components/CompanyInfo/CompanyProfile/CompanyProfile';
import { BalanceSheet } from '../components/CompanyInfo/BalanceSheet/BalanceSheet';
import { CashflowStatement } from '../components/CompanyInfo/CashflowStatement/CashflowStatement';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'search',
        element: <SearchPage />,
      },
      {
        path: 'company/:ticker',
        element: <CompanyInfoPage />,
        children: [
          {
            index: true,
            element: <Navigate to="company-profile" replace />
          },
          {
            path: 'company-profile',
            element: <CompanyProfile />
          },
          {
            path: 'income-statement',
            element: <IncomeStatement />
          },
          {
            path: 'balance-sheet',
            element: <BalanceSheet />
          },
          {
            path: 'cashflow-statement',
            element: <CashflowStatement />
          },
        ],
      },
    ],
  },
]);
