import { Link } from 'react-router-dom';
import type { CompanySearch } from '../../api';
import AddToPortfolio from '../Portfolio/AddToPortfolio/AddToPortfolio';
import React, { type SyntheticEvent } from 'react';

interface CardProps {
  company : CompanySearch;
  onAddToPortfolio: (e: SyntheticEvent) => void;
}

const Card: React.FC<CardProps> = ({
  company, 
  onAddToPortfolio: onAddToPortfolio
}: CardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-200 flex flex-col h-full">
      <div className="flex-1">
        <div className='mb-4 text-center'>
          <Link to={`/company/${company.symbol}`} className="text-xl font-bold text-gray-900 mb-4 cursor-pointer py-2 px-8 hover:m-px hover:border hover:border-gray-300 rounded-lg">{company.symbol}</Link>
        </div>
        
        <div className="space-y-2 text-sm">
          <p className="font-medium text-gray-800">
            {company.name}
          </p>
          <p className="font-medium text-gray-800">
            {`${company.exchange} / ${company.exchangeFullName}`}
          </p>
          <p className="font-medium text-gray-800">
            {company.currency}
          </p>
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-gray-100 flex gap-3">
        <Link title='View company details' to={`/company/${company.symbol}`} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded cursor-pointer transition-colors duration-200 whitespace-nowrap">
          📊
        </Link>
        <AddToPortfolio onSubmit={onAddToPortfolio} symbol={company.symbol}/>
      </div>
    </div>
  );
};

export default Card;
