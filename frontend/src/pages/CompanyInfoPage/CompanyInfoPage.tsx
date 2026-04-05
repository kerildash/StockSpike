import { type FC, useEffect, useState } from 'react';
import { getCompanyInfo, type ICompanyInfo } from '../../api';
import { useParams } from 'react-router-dom';
import { Sidebar } from '../../components/CompanyInfo/Sidebar/Sidebar';
import { Dashboard } from '../../components/CompanyInfo/Dashboard/Dashboard';
import { BigTile } from '../../components/CompanyInfo/BigTile/BigTile';
import Loading from '../../components/Loading/Loading';
import { ErrorTile } from '../../components/ErrorTile/ErrorTile';
import { Footer } from '../../components/Footer/Footer';

interface ICompanyInfoPageProps {}

export const CompanyInfoPage: FC<ICompanyInfoPageProps> = () => {
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
  }, [ticker]);

  const format = (number: number | undefined): string => {
    if (typeof number === 'undefined' || number == 0) {
      return 'N/A';
    }

    const absolute = Math.abs(number);
    const formattedNumber =
      absolute > 1000000000
        ? `$${(number / 1000000000).toFixed(2)} B`
        : absolute > 1000000
          ? `$${(number / 1000000).toFixed(2)} M`
          : absolute > 1000
            ? `$${(number / 1000).toFixed(2)} K`
            : absolute >= 10
              ? `$${number.toFixed(2)}`
              : `$${number.toFixed(3)}`;

    return formattedNumber;
  };

  return (
    <div>
      {loading ? (
        <div className='flex flex-col min-h-[calc(100vh-4rem)]'>
          <div className='flex-1'>
            <Loading />
          </div>
          <Footer />
        </div>
      ) : error ? (
        <div className='flex flex-col min-h-[calc(100vh-4rem)]'>
          <div className='flex-1'>
            <ErrorTile message={error} className='m-15' isWarning />
          </div>
          <Footer />
        </div>
      ) : (
        <div className='w-full relative overflow-x-hidden min-h-[calc(100vh-4rem)] flex flex-col'>
          <Sidebar />
          <div className='md:ml-70 flex flex-col flex-1'>
            <div className='flex-1'>
              <Dashboard
                ticker={ticker!}
                description={companyInfo?.description!}
              >
                <div className='h-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-5 pb-5'>
                  <BigTile
                    title='Company Name'
                    info={companyInfo?.companyName!}
                  />
                  <BigTile title='Sector' info={companyInfo?.sector!} />
                  <BigTile
                    title='Stock Price'
                    info={`${format(companyInfo?.price)}`}
                  />
                  <BigTile
                    title='Market Cap'
                    info={`${format(companyInfo?.marketCap)}`}
                  />
                </div>
              </Dashboard>
            </div>
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
};
