import { type FC } from 'react';

const Loading: FC = () => {
  return (
    <div className='flex justify-center items-center py-12'>
      <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
      <p className='ml-4 text-lg text-gray-600 font-medium'>Loading...</p>
    </div>
  );
};

export default Loading;
