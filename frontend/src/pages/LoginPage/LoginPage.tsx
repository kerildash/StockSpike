import { type FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useAuth } from '../../context/useAuth';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router';

interface ILoginPageProps {};

type LoginFormInputs = {
    username: string;
    password: string;
}

type NavigationState = {
    username?: string;
}

const validation = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
})

export const LoginPage: FC<ILoginPageProps> = (props) => {
  const location = useLocation();
  const state = location.state as NavigationState | null;
  const { login } = useAuth();

  const { register, handleSubmit, formState: {errors}} = useForm<LoginFormInputs>({
    resolver: yupResolver(validation),
    defaultValues: {
      username: state?.username ?? "",
      password: ""
    }
  });
  
  const handleLogin = (form: LoginFormInputs) => {
    
    console.log("login");
    login(form.username, form.password);
  };

  return (
    <section>
      <div className='min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-6 mx-auto py-0 lg:py-0'>
        <div className='w-full border border-gray-400 bg-white rounded-lg my-8 sm:max-w-md'>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl leading-tight tracking-tight text-gray-800 md:text-2xl">
              Log in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(handleLogin)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm normal text-gray-800"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="w-full px-4 py-2 text-gray-800 bg-white border-1 border-gray-400 rounded-lg focus:outline-none focus:border-gray-800 transition-colors duration-200"
                  placeholder="Username"
                  {...register("username")}
                />
                {errors.username ? (
                  <p className="text-gray-800 text-sm normal shake-in">{errors.username.message}</p>
                ) : (
                  ""
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm normal text-gray-800"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2 text-gray-800 bg-white border-1 border-gray-400 rounded-lg focus:outline-none focus:border-gray-800 transition-colors duration-200"
                  {...register("password")}
                />
                {errors.password ? (
                  <p className="text-gray-900 text-sm normal shake-in">{errors.password.message}</p>
                ) : (
                  ""
                )}
                <a
                href="#"
                className="text-sm font-semibold text-gray-800 hover:underline"
              >
                Forgot password?
              </a>
              </div>
              <div className="flex items-center justify-between">
                
              </div>
              <button
                type="submit"
                className="w-full text-gray-800 border-1 border-gray-400 cursor-pointer hover:border-gray-800 duration-200 focus:ring-1 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Log in
              </button>
              <p className="normal text-sm text-gray-800">
                Don’t have an account yet?{" "}
                <a
                  href="/signup"
                  className="text-gray-800 font-semibold hover:underline"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}