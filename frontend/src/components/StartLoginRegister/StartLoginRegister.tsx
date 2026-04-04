import { useState, type FC } from 'react';
import { useNavigate } from 'react-router';
interface IStartLoginRegisterProps {}

export const StartLoginRegister: FC<IStartLoginRegisterProps> = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  return (
    <div>
      <input
        type='text'
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder='Enter username'
        className='placeholder-gray-900 w-full h-13 px-4 pl-6 text-gray-900 bg-white border-1 border-gray-900 rounded-3xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-white duration-200'
      />

      <div className='mt-8 flex items-center  h-25 rounded-3xl'>
        <button
          className='flex-1 bg-gray-100 rounded-l-3xl h-full hover:cursor-pointer border-1 border-r-0 hover:border-2 hover:border-r-1'
          type='button'
          onClick={() => navigate('/login', { state: { username } })}
        >
          Log in
        </button>

        <button
          className='flex-1 h-full border-1 100 rounded-r-3xl hover:border-2'
          type='button'
          onClick={() => navigate('/signup', { state: { username } })}
        >
          Sign up
        </button>
      </div>
    </div>
  );
};
