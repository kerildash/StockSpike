import { type FC } from 'react';

interface ITableProps {
  data: any;
  config: any;
}

export const Table: FC<ITableProps> = ({data, config} : ITableProps) => {
  const renderredRows = data.map((item: any) => {
    return (
      <tr key={item.date}>
        {config.map((value: any) => {
          return (
            <td className='whitespace-nowrap p-4 text-sm font-normal text-gray-900'>
              {value.render(item)}
            </td>
          );
        })}
      </tr>
    );
  });
  const renderredHeader = config.map((item: any) => {
    return (
      <th
        key={item.label}
        className='p-4 text-left text-xs font-medium text-gray-900 tracking-wider'
      >
        {item.label}
      </th>
    );
  });
  return <div className='p-3 bg-white rounded-lg transition-shadow duration-300 border border-gray-200'>
    <table>
        <thead>{renderredHeader}</thead>
        <tbody>{renderredRows}</tbody>
    </table>
  </div>;
};
