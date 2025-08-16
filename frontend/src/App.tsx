import './App.css';
import { Navbar } from './components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default App;
