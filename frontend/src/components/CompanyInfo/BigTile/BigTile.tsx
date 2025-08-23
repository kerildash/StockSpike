import { type FC } from 'react';

interface IBigTileProps {
    title: string;
    info: string
}

export const BigTile: FC<IBigTileProps> = ({title, info}: IBigTileProps) => {
  return (
  
          <div className='bg-white rounded-lg  p-5 border border-gray-200'>
            <h5 className='text-blueGray-400 uppercase text-xs mb-1'>
              {title}
            </h5>
            <span className='text-4xl font-light'>{info}</span>
          </div>
  );
};