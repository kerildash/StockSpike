import { type FC } from 'react';

interface IRatioListProps {
  config: any;
  data: any;
}

export const RatioList: FC<IRatioListProps> = ({config, data} : IRatioListProps) => { 
  const format = (number: number): string => {
    return number > 1000000000 ? `${(number / 1000000000).toFixed(2)} B` : number > 1000000 ? `${(number / 1000000).toFixed(2)} M` : number > 1000 ? `${(number / 1000).toFixed(2)} K` : number.toFixed(3)
  }
  const renderedItem = config.map((item: any) => {
    return (
      <li className='py-3 '>
        <div className='flex items-center space-x-4'>
          <div className='flex-1 min-w-0'>
            <p className='text-sm font-semibold text-gray-900 truncate'>
              {item.label}
            </p>
            <p className='text-sm text-gray-500'>
              <a>{item.description && item.description}</a>
            </p>
          </div>
          <div className='inline-flex items-center text-base text-xl font-semibold text-gray-900 pl-10'>
            {format(item.render(data))}
          </div>
        </div>
      </li>
    );
  });
  return (
    <div className='bg-white border-1 border-gray-200 rounded-lg p-6 w-full'>
      <ul className='divide-y divide-gray-200'>{renderedItem}</ul>
    </div>
  );
};
