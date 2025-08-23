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
    <div className='m-15'>
      <div className=''>{children}</div>
      <div className=''>{<Outlet context={{ticker, description}}/>}</div>
    </div>
  );
};
