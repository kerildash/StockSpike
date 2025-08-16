import { type FC } from "react";
import { Link } from "react-router-dom";
interface ICardPortfolioProps {
    portfolioItem: string;
    onDelete: (e: any) => void;
};

export const CardPortfolio: FC<ICardPortfolioProps> = ({portfolioItem, onDelete}: ICardPortfolioProps) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center justify-between hover:shadow-md transition-shadow duration-200">
            <Link to={`/company/${portfolioItem}`} className="text-gray-900 font-medium">{portfolioItem}</Link>
            <button 
                onClick={onDelete} 
                value={portfolioItem}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-colors duration-200"
                title="Remove from portfolio"
            >
                <svg className="w-4 h-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
        </div>
    );
}
