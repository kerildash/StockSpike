import { type FC } from 'react';
import { Link } from 'react-router-dom';
interface ISidebarProps {}

export const Sidebar: FC<ISidebarProps> = (props) => {
  return (
    <nav className='block py-4 px-6 top-0 bottom-0 w-70 bg-white border-r-1 border-gray-200 left-0 absolute flex-row flex-nowrap md:z-10 z-9999 transition-all duration-300 ease-in-out transform md:translate-x-0 -translate-x-full'>
      <div className='flex-col min-h-full px-0 flex flex-wrap items-center justify-between w-full mx-auto overflow-y-auto overflow-x-hidden'>
        <div className='flex bg-white flex-col items-stretch opacity-100 relative mt-4 overflow-y-auto overflow-x-hidden h-auto z-40 items-center flex-1 rounded w-full'>
          <div className='md:flex-col md:min-w-full flex flex-col list-none'>
            <Link
              to='company-profile'
              className='text-blueGray-500 text-md uppercase block pb-3 pt-2 no-underline cursor-pointer px-2 border border-white hover:border-gray-300 rounded-lg'
            >
              🏢 Company Profile
            </Link>
            <Link
              to='income-statement'
              className=' text-blueGray-500 text-md uppercase block pb-3 pt-2 no-underline cursor-pointer px-2 border border-white hover:border-gray-300 rounded-lg'
            >
              💸 Income Statement
            </Link>
            <Link
              to='balance-sheet'
              className=' text-blueGray-500 text-md uppercase block pb-3 pt-2 no-underline cursor-pointer px-2 border border-white hover:border-gray-300 rounded-lg'
            >
              📊 Balance Sheet
            </Link>
            <Link
              to='cashflow-statement'
              className=' text-blueGray-500 text-md uppercase block pb-3 pt-2 no-underline cursor-pointer px-2 border border-white hover:border-gray-300 rounded-lg'
            >
              🔄 Cashflow Statement
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
