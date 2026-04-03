import './App.css';
import { Toaster } from "react-hot-toast";
import { Navbar } from './components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { UserProvider } from './context/useAuth';

const App: React.FC = () => {
  return (
    <>
      <UserProvider>
        <Toaster position="top-right" />
        <div className='fixed top-0 right-0 left-0 z-50'>
          <Navbar />
        </div>
        <main className='pt-16'>
          <Outlet />
        </main>
      </UserProvider>
    </>
  );
};

export default App;
