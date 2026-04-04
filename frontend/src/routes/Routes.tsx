import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import { SearchPage } from '../pages/SearchPage/SearchPage';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { RegisterPage } from '../pages/RegisterPage/RegisterPage';
import { CompanyInfoPage } from '../pages/CompanyInfoPage/CompanyInfoPage';
import { IncomeStatement } from '../components/CompanyInfo/IncomeStatement/IncomeStatement';
import { CompanyProfile } from '../components/CompanyInfo/CompanyProfile/CompanyProfile';
import { BalanceSheet } from '../components/CompanyInfo/BalanceSheet/BalanceSheet';
import { CashflowStatement } from '../components/CompanyInfo/CashflowStatement/CashflowStatement';
import { ProtectedRoute } from './ProtectedRoute';
import { HomePage } from '../pages/HomePage/HomePage';
import { ErrorPage } from '../pages/NotFoundPage/ErrorPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },      
      {
        path: 'signup',
        element: <RegisterPage />,
      },
      {
        path: 'company/:ticker',
        element: <ProtectedRoute><CompanyInfoPage /></ProtectedRoute>,
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
