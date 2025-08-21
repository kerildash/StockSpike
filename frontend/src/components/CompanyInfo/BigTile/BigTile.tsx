import { type FC } from 'react';

interface IBigTileProps {
    title: string;
    info: string
}

export const BigTile: FC<IBigTileProps> = ({title, info}: IBigTileProps) => {
  return (
  <div className='w-full lg:w-6/12 xl:w-3/12 '>
    <div className='relative flex flex-col min-w-0 break-words bg-white rounded-lg duration-300 p-2 border border-gray-200'>
      <div className='flex-auto p-4'>
        <div className='flex flex-wrap'>
          <div className='relative w-full pr-4 max-w-full flex-grow flex-1'>
            <h5 className='text-blueGray-400 uppercase text-xs'>
              {title}
            </h5>
            <span className='text-4xl font-light'>{info}</span>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};