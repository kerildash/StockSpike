import { useState, type FC } from 'react';
import { useNavigate } from 'react-router';
import Search from '../../components/Search/Search';
import { StartLoginRegister } from '../../components/StartLoginRegister/StartLoginRegister';

interface IHomePageProps {}

export const HomePage: FC<IHomePageProps> = (props) => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const onChange = (e: any) => {
    setSearch(e.target.value);
  }

  const onKeyDown = async (e: any) => {
    if (e.key === 'Enter' && search.trim()) {
        navigate('/search', { state: { search: search.trim() } })
    }
  };

  return (
    <>
      <div className='lg:min-w-350 lg:w-350 py-10 md:px-40 sm:px-20 px-10 lg:mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-15'>
          <div className='flex flex-col justify-between gap-10'>

            <div className='font-bold text-4xl'>
              <u>Track</u> stocks, <u>build</u> your portfolio and{' '}
              <u>explore</u> finansial metrics with{' '}
              <span className='text-blue-800'>StockSpike</span>
            </div>

            <div className=' hidden lg:block border border-gray-900 rounded-3xl overflow-hidden bg-white'>
              <img
                src='/homepage-demo-image.png'
                alt='StockSpike demo'
                className='h-auto object-cover'
              />
            </div>
          </div>

          <div className='flex flex-col justify-between gap-10'>
            <div>
              <div className='text-4xl pb-8'>Try right now, register later</div>
              <Search
                onChange={onChange}
                onKeyDown={onKeyDown}
                search={search}
                style='hero'
              />
            </div>

            <div className='text-4xl flex justify-center'>or</div>

            <div>
              <div className='text-4xl pb-8'>Dive deeper with personal account</div>
              <StartLoginRegister />
            </div>

          </div>
        </div>
      </div>
    </>
  );
};
