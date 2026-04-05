import { type FC } from 'react';
import { Outlet } from 'react-router-dom';
interface IDashboardProps {
  children: React.ReactNode;
  ticker: string;
  description: string;
}

export const Dashboard: FC<IDashboardProps> = ({
  children,
  ticker,
  description
}: IDashboardProps) => {
  return (
    <div className='mt-15 mx-15 mb-5'>
      <div className=''>{children}</div>
      <div className=''>{<Outlet context={{ticker, description}}/>}</div>
    </div>
  );
};
