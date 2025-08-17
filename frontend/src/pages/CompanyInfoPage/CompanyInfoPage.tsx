import { type FC, useEffect, useState } from 'react';
interface ICompanyInfoPageProps {}
import { getCompanyInfo, type CompanyInfo } from '../../api';
import { useParams } from 'react-router-dom';
import { Sidebar } from '../../components/CompanyInfo/Sidebar/Sidebar';
import { Dashboard } from '../../components/CompanyInfo/Dashboard/Dashboard';

export const CompanyInfoPage: FC<ICompanyInfoPageProps> = (props) => {
  let { ticker } = useParams();
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>();

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
        <Sidebar />
        <Dashboard />
      </div>
    </div>
  );
};
