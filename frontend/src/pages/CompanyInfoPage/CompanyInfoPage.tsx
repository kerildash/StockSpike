import { type FC, useEffect, useState } from 'react';
interface ICompanyInfoPageProps {}
import { getCompanyInfo, type ICompanyInfo } from '../../api';
import { useParams } from 'react-router-dom';
import { Sidebar } from '../../components/CompanyInfo/Sidebar/Sidebar';
import { Dashboard } from '../../components/CompanyInfo/Dashboard/Dashboard';
import { BigTile } from '../../components/CompanyInfo/BigTile/BigTile';

export const CompanyInfoPage: FC<ICompanyInfoPageProps> = (props) => {
  let { ticker } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [companyInfo, setCompanyInfo] = useState<ICompanyInfo>();

  useEffect(() => {
    const getProfileInit = async () => {
      if (!ticker) {
        setError('No ticker provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const result = await getCompanyInfo(ticker);

        if (typeof result === 'string') {
          setError(result);
        } else if (result) {
          setCompanyInfo(result);
          setError(null);
        } else {
          setError('No company data found');
        }
      } catch (err) {
        setError('Failed to fetch company info');
      } finally {
        setLoading(false);
      }
    };

    getProfileInit();
  }, []);
  const format = (number: number | undefined): string => {
    return typeof number === 'undefined'
      ? 'N/A'
      : number > 1000000000
      ? `${(number / 1000000000).toFixed(2)} B`
      : number > 1000000
      ? `${(number / 1000000).toFixed(2)} M`
      : number > 1000
      ? `${(number / 1000).toFixed(2)} K`
      : number >= 10
      ? `${number.toFixed(2)} `
      : number.toFixed(3);
  };
  console.log(ticker);
  console.log(companyInfo);

  return (
    <div>
      <div className='w-full relative overflow-x-hidden'>
        <Sidebar />
        <div className='md:ml-70'>
          <Dashboard ticker={ticker!} description={companyInfo?.description!}>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-5 pb-5'>
                <BigTile
                  title='Company Name'
                  info={companyInfo?.companyName!}
                />                
                <BigTile
                  title='Sector'
                  info={companyInfo?.sector!}
                />
                <BigTile
                  title='Stock Price'
                  info={`$${format(companyInfo?.price)}`}
                />
                <BigTile
                  title='Market Cap'
                  info={`$${format(companyInfo?.marketCap)}`}
                />
              </div>
            )}
          </Dashboard>
        </div>
      </div>
    </div>
  );
};
