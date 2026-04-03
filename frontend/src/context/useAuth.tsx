import { createContext, useEffect, useState, useContext } from 'react';
import type { UserProfile } from '../models/UserProfile';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import {
  loginWithApi,
  registerWithApi,
} from '../services/AuthenticationService';
import axios from 'axios';

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (username: string, email: string, password: string) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logOut: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    setIsReady(true);
  }, []);

  const registerUser = async (
    username: string,
    email: string,
    password: string,
  ) => {
    await registerWithApi(username, email, password)
      .then((response) => {
        console.log('logging into...');
        if (response) {
          console.log(response?.data);

          const token = response?.data?.token;
          const user: UserProfile = {
            userName: response?.data?.userName,
            email: response?.data?.email,
          };

          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));

          setToken(token);
          setUser(user);

          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

          toast.success('user registered successfully');
          navigate('/search');
        }
      })
      .catch(() => toast.error('Error while registration.'));
  };

  const login = async (username: string, password: string) => {
    await loginWithApi(username, password)
      .then((response) => {
        if (response) {

          const token = response?.data?.token;
          const user: UserProfile = {
            userName: response?.data?.userName,
            email: response?.data?.email,
          };

          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));

          setToken(token);
          setUser(user);

          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

          toast.success('user logged in successfully');
          navigate('/search');
        }
      })
      .catch(() => toast.error('Error while logging in.'));
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setToken('');
    navigate('/');
  };

  return (
    <UserContext.Provider
      value={{ user, token, isLoggedIn, registerUser, login, logOut }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
