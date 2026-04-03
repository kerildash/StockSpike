import type { FC } from 'react';
import { useAuth } from '../../../context/useAuth';
import { Link } from 'react-router';
interface INavbarAuthProps {}

export const NavbarAuth: FC<INavbarAuthProps> = (props) => {
  const { user, isLoggedIn, logOut } = useAuth();
  const username = user?.userName;

  if (isLoggedIn()) {
    return (
      <div className='flex shrink-0 flex-nowrap items-baseline gap-4'>
        <div className='text-lg text-white whitespace-nowrap'>{username}</div>
        <button
          onClick={logOut}
          className = "inline-flex items-baseline justify-center whitespace-nowrap rounded-md border-2 border-gray-600 bg-gray-600 w-24 py-2 text-white transition-colors duration-200 hover:bg-gray-500 hover:border-gray-500">
            Log Out
        </button>
      </div>
    );
  }

  return (
    <div className='flex shrink-0 flex-nowrap items-baseline gap-2'>
      <Link
        to='/signup'
        className='inline-flex w-24 justify-center border-2 border-gray-600 items-baseline whitespace-nowrap rounded-md py-2 text-white transition-colors duration-200 hover:bg-gray-500 hover:border-gray-500'
      >
        Sign Up
      </Link>
      <Link
        to='/login'
        className='inline-flex items-baseline justify-center whitespace-nowrap rounded-md border-2 border-gray-600 bg-gray-600 w-24 py-2 text-white transition-colors duration-200 hover:bg-gray-500 hover:border-gray-500'
      >
        Log In
      </Link>
    </div>
  );
};
