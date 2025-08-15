import type { CompanySearch } from '../../api';
import AddToPortfolio from '../Portfolio/AddToPortfolio/AddToPortfolio';
import styles from './Card.module.css';
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
    <div className={styles.card}>
      <div className={styles.details}>
        <h2>{company.symbol}</h2>
        <p>Currency: {company.currency}</p>
        <p>Exchange: {company.exchangeFullName}</p>
        <p>Name: {company.name}</p>
        <p>Exchange Code: {company.exchange}</p>
      </div>
      <AddToPortfolio onSubmit={onAddToPortfolio} symbol={company.symbol}/>
    </div>
  );
};

export default Card;
