import { type FC } from 'react';
import { Outlet } from 'react-router-dom';
interface IDashboardProps {
  children: React.ReactNode;
  ticker: string;
}

export const Dashboard: FC<IDashboardProps> = ({
  children,
  ticker,
}: IDashboardProps) => {
  return (
    <div className='relative md:ml-64 bg-blueGray-100 w-full'>
      <div className='relative pt-10 pb-32 bg-lightBlue-500'>
        <div className='px-4 md:px-6 mx-auto w-full'>
          <div className='flex flex-wrap'>{children}</div>
          <div className='flex flex-wrap'>{<Outlet context={ticker} />}</div>
        </div>
      </div>
    </div>
  );
};
