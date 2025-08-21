import './App.css';
import { Navbar } from './components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <>
      <div className='sticky top-0 z-50'>
        <Navbar />
      </div>
      <Outlet />
    </>
  );
};

export default App;
