import { type FC } from 'react';

interface IErrorTileProps {
  message: string;
  className?: string;
  children?: React.ReactNode;
  isWarning?: boolean;
}

export const ErrorTile: FC<IErrorTileProps> = ({
  message,
  className,
  children,
  isWarning = false,
}: IErrorTileProps) => {
  return (
    <div
      className={` bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center ${className}`}
    >
      {isWarning && <div className='text-4xl mb-4'>⚠️</div>}
      <p className='text-yellow-700 font-medium text-lg'>{message}</p>
      {children}
    </div>
  );
};
