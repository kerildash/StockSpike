import { type FC, useEffect, useState } from 'react';
interface ICompanyInfoPageProps {}
import { getCompanyInfo, type ICompanyInfo} from '../../api';
import { useParams } from 'react-router-dom';
import { Sidebar } from '../../components/CompanyInfo/Sidebar/Sidebar';
import { Dashboard } from '../../components/CompanyInfo/Dashboard/Dashboard';
import { BigTile } from '../../components/CompanyInfo/BigTile/BigTile';


export const CompanyInfoPage: FC<ICompanyInfoPageProps> = (props) => {
  let { ticker } = useParams();
  const [companyInfo, setCompanyInfo] = useState<ICompanyInfo>();

  useEffect(() => {
    const getProfileInit = async () => {
      const result = await getCompanyInfo(ticker!);
      if (typeof result === 'string') {
        console.log('Error getting company info');
      } else {
        setCompanyInfo(result);
      }
    };
    getProfileInit();
  }, []);
  return (
    <div>
      <div className='w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden'>
        <div className='fixed'>
          <Sidebar />
        </div>
        <div className='px-40 w-full'>
          <Dashboard ticker={ticker!}>
            <BigTile title='INCOME STATEMENT' info='350,897' />
          </Dashboard>
        </div>
      </div>
    </div>
  );
};
