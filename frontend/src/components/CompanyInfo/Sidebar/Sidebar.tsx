import { type FC } from 'react';
import { Link } from 'react-router-dom';
interface ISidebarProps {}

export const Sidebar: FC<ISidebarProps> = (props) => {
  return (
    <div>
      <nav className='hidden lg:block w-65 bg-white border-1 border-gray-200'>
          <div className='sticky top-0 h-screen overflow-y-auto'>
            <div className='p-6'><div className='md:flex-col flex flex-col list-none'>
              <Link
                to='company-profile'
                className='text-blueGray-500 text-md uppercase block pb-3 pt-2 no-underline cursor-pointer px-2 border border-white hover:border-gray-300 rounded-lg'
              >
                🏢 Company Profile
              </Link>
            </div>
            <div className='md:flex-col flex flex-col list-none'>
              <Link
                to='income-statement'
                className=' text-blueGray-500 text-md uppercase block pb-3 pt-2 no-underline cursor-pointer px-2 border border-white hover:border-gray-300 rounded-lg'
              >
                📊 Income Statement
              </Link>
            </div>
            <div className='md:flex-col flex flex-col list-none'>
              <Link
                to='balance-sheet'
                className=' text-blueGray-500 text-md uppercase block pb-3 pt-2 no-underline cursor-pointer px-2 border border-white hover:border-gray-300 rounded-lg'
              >
                📄 Balance Sheet
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
