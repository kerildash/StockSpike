import { type FC } from 'react';
import { CardPortfolio } from '../CardPortfolio/CardPortfolio';
interface ListPortfolioProps {
  portfolioItems: string[];
  onDeleteFromPortfolio: (e: any) => void;
}

export const ListPortfolio: FC<ListPortfolioProps> = (
  props: ListPortfolioProps
) => {
  return (
    <>
      <p>My portfolio</p>
      {props.portfolioItems.map((item) => {
        return <CardPortfolio portfolioItem={item} onDelete={props.onDeleteFromPortfolio} />;
      })}
    </>
  );
};
