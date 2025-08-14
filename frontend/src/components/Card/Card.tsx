import AddToPortfolio from '../Portfolio/AddToPortfolio/AddToPortfolio';
import styles from './Card.module.css';
import React from 'react';

interface CardProps {
  symbol: string;
  currency: string;
  exchangeFullName: string;
  name: string;
  exchange: string;
}

const Card: React.FC<CardProps> = ({
  symbol,
  currency,
  exchangeFullName,
  name,
  exchange,
}: CardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.details}>
        <h2>{symbol}</h2>
        <p>Currency: {currency}</p>
        <p>Exchange: {exchangeFullName}</p>
        <p>Name: {name}</p>
        <p>Exchange Code: {exchange}</p>
      </div>
      <AddToPortfolio onSubmit={() => {}} symbol={symbol}/>
    </div>
  );
};

export default Card;
