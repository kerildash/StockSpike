import { type FC } from 'react';

interface IRatioListProps {
  config: any;
  data: any;
}

export const RatioList: FC<IRatioListProps> = ({config, data} : IRatioListProps) => { 
  const format = (number: number): string => {
    return number > 1000000000 ? `${(number / 1000000000).toFixed(2)} B` : number > 1000000 ? `${(number / 1000000).toFixed(2)} M` : number > 1000 ? `${(number / 1000).toFixed(2)} K` : number >=10 ? `${number.toFixed(2)}` : number.toFixed(3)
  }
  const renderedItem = config.map((configItem: any) => {
    return (
      <li key={configItem.label} className='py-3 '>
        <div className='flex items-center space-x-4'>
          <div className='flex-1 min-w-0'>
            <p className='text-sm font-semibold text-gray-900 truncate'>
              {configItem.label}
            </p>
            <p className='text-sm text-gray-500'>
              <a>{configItem.description && configItem.description}</a>
            </p>
          </div>
          <div className='inline-flex items-center text-base text-xl font-semibold text-gray-900 pl-10'>
            {format(configItem.render(data))}
          </div>
        </div>
      </li>
    );
  });
  return (
    <div className='bg-white border-1 border-gray-200 rounded-lg p-5 w-full'>
      <ul className='divide-y divide-gray-200'>{renderedItem}</ul>
    </div>
  );
};
