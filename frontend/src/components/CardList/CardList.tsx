import React, { type SyntheticEvent } from 'react';
import Card from '../Card/Card';
import { type CompanySearch } from '../../api';
import { v4 as uuidv4 } from 'uuid';

interface CardListProps {
  companies: CompanySearch[];
  onAddToPortfolio: (e: SyntheticEvent) => void;
}

const CardList: React.FC<CardListProps> = ({ companies, onAddToPortfolio: onAddToPortfolio }: CardListProps) => {
  return (
    <>
      {companies.length === 0 && <p>No results</p>} 
      <ul>
        {companies.map((company) => (
        <li key={uuidv4()}>
          <Card company={company} onAddToPortfolio={onAddToPortfolio} />
        </li>
        ))}
      </ul>
    </>
  );
};

export default CardList;
