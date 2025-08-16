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
        <h2 className="text-xl font-bold text-gray-900 mb-4">{company.symbol}</h2>
        <div className="space-y-2 text-sm">
          <p className="text-gray-600">
            <span className="font-medium text-gray-800">Currency:</span> {company.currency}
          </p>
          <p className="text-gray-600">
            <span className="font-medium text-gray-800">Exchange:</span> {company.exchangeFullName}
          </p>
          <p className="text-gray-600">
            <span className="font-medium text-gray-800">Name:</span> {company.name}
          </p>
          <p className="text-gray-600">
            <span className="font-medium text-gray-800">Exchange Code:</span> {company.exchange}
          </p>
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-gray-100">
        <AddToPortfolio onSubmit={onAddToPortfolio} symbol={company.symbol}/>
      </div>
    </div>
  );
};

export default Card;
