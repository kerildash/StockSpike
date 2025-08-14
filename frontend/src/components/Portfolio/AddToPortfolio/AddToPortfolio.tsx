import React, { type SyntheticEvent } from 'react';

interface AddToPortfolioProps {
    onSubmit: (e: SyntheticEvent) => void;
    symbol: string;
}

const AddToPortfolio: React.FC<AddToPortfolioProps> = ({onSubmit, symbol}: AddToPortfolioProps) => {
  return (
    <>
    <form onSubmit={onSubmit}>
        <input readOnly={true} type='text' hidden={true} value={symbol} />
        <button type='submit'>Add to Portfolio</button>
    </form>
    </>
  );
};

export default AddToPortfolio;
