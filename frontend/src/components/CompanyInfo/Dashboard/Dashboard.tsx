import { type FC } from 'react';
import { BigTile } from '../BigTile/BigTile';
interface IDashboardProps {}

export const Dashboard: FC<IDashboardProps> = (props) => {
  return (
    <div className='relative md:ml-64 bg-blueGray-100 w-full'>
      <div className='relative pt-10 pb-32 bg-lightBlue-500'>
        <div className='px-4 md:px-6 mx-auto w-full'>
          <div className='flex flex-wrap'>
            <BigTile title='NEW USERS' info='2,356' />
            <BigTile title='INCOME STATEMENT' info='350,897' />
            <BigTile title='CASH FLOW' info='924' />
            <BigTile title='ROI' info='49,65%' />
          </div>
        </div>
      </div>
    </div>
  );
};
