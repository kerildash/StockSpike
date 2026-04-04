import type { FC } from 'react';
import { Link } from 'react-router';
interface IFooterProps {
  className?: string;
}

export const Footer: FC<IFooterProps> = ({ className }) => {
  return (
    <div className={className}>
      <div className='h-14 border-t border-gray-200 text-gray-600 font-thin text-sm flex flex-row justify-center items-center'>
        <div className='flex px-12 gap-8'>
          <div className='flex  gap-1'>
            <span>StockSpike — made by Kiryl Dashkevich.</span>
            <a
              className='font-bold hover:underline text-gray-600'
              href='https://linktr.ee/kerildash'
              target='_blank'
              rel='noopener noreferrer'
            >
              Hire me!
            </a>
          </div>
          <div className='flex gap-1'>
            <a
              className='hover:underline'
              href='https://github.com/kerildash/StockSpike'
              target='_blank'
              rel='noopener noreferrer'
            >
              Github repository
            </a>
          </div>
          <div className='flex gap-1'>
            <Link className='hover:underline' to='/disclaimer'>
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
