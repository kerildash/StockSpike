import React, { type SyntheticEvent } from 'react';

interface AddToPortfolioProps {
  onSubmit: (e: SyntheticEvent) => void;
  symbol: string;
}

const AddToPortfolio: React.FC<AddToPortfolioProps> = ({
  onSubmit,
  symbol,
}: AddToPortfolioProps) => {
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(e);
        }}
      >
        <input readOnly={true} type='text' hidden={true} value={symbol} />
        <button 
          type='submit'
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded cursor-pointer transition-colors duration-200"
        >
          Add to Portfolio
        </button>
      </form>
    </>
  );
};

export default AddToPortfolio;
