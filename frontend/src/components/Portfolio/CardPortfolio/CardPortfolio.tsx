import { type FC } from "react";
interface ICardPortfolioProps {
    portfolioItem: string;
    onDelete: (e: any) => void;
};

export const CardPortfolio: FC<ICardPortfolioProps> = ({portfolioItem, onDelete}: ICardPortfolioProps) => {
    return (
        <>
            <p>{portfolioItem}</p>
            <button onClick={onDelete} value={portfolioItem}>Remove</button>
        </>
    );
}
