import { useState, type FC } from 'react';
import { Link } from 'react-router';

interface IWarningPortfolioProps {}

export const WarningPortfolio: FC<IWarningPortfolioProps> = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className='relative bg-yellow-50 rounded-lg border border-yellow-500 px-4 py-2 pr-10 flex items-center gap-4 justify-between'>
      <button
        type='button' //text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-colors duration-200
        className='absolute top-2 right-2 rounded-full p-1 text-amber-600/80 hover:bg-amber-100 hover:text-amber-800 transition-colors duration-200 ease-in-out cursor-pointer'
        onClick={() => setDismissed(true)}
        aria-label='Dismiss warning'
      >
        <svg
          className='w-4 h-4'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M6 18L18 6M6 6l12 12'
          />
        </svg>
      </button>

      <span className='text-amber-600 shrink-0' aria-hidden>
        <svg
          className='w-5 h-5'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
          />
        </svg>
      </span>

      <p className='text-xs text-amber-600'>
        You may lose your portfolio. Please <span  className="font-bold hover:underline"><Link to="/signup">sign up</Link></span> to save it
      </p>
    </div>
  );
};
