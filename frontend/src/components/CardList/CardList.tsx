import React, { type SyntheticEvent } from 'react';
import Card from '../Card/Card';
import { type ICompanySearch } from '../../api';
import { v4 as uuidv4 } from 'uuid';

interface CardListProps {
  companies: ICompanySearch[];
  onAddToPortfolio: (e: SyntheticEvent) => void;
}

const CardList: React.FC<CardListProps> = ({ companies, onAddToPortfolio: onAddToPortfolio }: CardListProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      {companies.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <p className="text-xl text-gray-600 font-medium">No results found</p>
          <p className="text-gray-500 mt-2">Try searching for a different company</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {companies.map((company) => (
            <Card 
              key={uuidv4()} 
              company={company} 
              onAddToPortfolio={onAddToPortfolio} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CardList;
