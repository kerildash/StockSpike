import React from 'react';
import Card from '../Card/Card';
import { type CompanySearch } from '../../api';
import { v4 as uuidv4 } from 'uuid';

interface CardListProps {
  companies: CompanySearch[];
}

const CardList: React.FC<CardListProps> = ({ companies }: CardListProps) => {
  return (
    <>
      {companies.length === 0 && <p>No results</p>} 
      <ul>
        {companies.map((company) => (
        <li key={uuidv4()}>
          <Card {...company} />
        </li>
        ))}
      </ul>
    </>
  );
};

export default CardList;
