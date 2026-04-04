import type { FC } from 'react';
import { ErrorTile } from '../../components/ErrorTile/ErrorTile';
import { UserProvider } from '../../context/useAuth';
import { Toaster } from 'react-hot-toast';
import { Navbar } from '../../components/Navbar/Navbar';
import { Footer } from '../../components/Footer/Footer';
import { isRouteErrorResponse, useRouteError } from 'react-router';
interface IErrorPageProps {}

export const ErrorPage: FC<IErrorPageProps> = (props) => {
  const error = useRouteError();
  const isNotFound = isRouteErrorResponse(error) && error.status === 404;

  const contactMeLink = (
    <a
      className='font-bold hover:underline'
      href='https://linktr.ee/kerildash'
      target='_blank'
      rel='noopener noreferrer'
    >
      contact me⮌
    </a>
  );

  const notFound = (
  <ErrorTile title='😕' message={'Page not found'}>
    <p className='text-yellow-700 pt-4'>
      The page is probably moved, deleted, or yet not created.
    </p>
    <p className='text-yellow-700 pt-2'>
      If you think this is an error, please {' '}
      {contactMeLink} and report the issue.
    </p>
  </ErrorTile>)

  const defaultError = (
    <ErrorTile isWarning message={'Something went wrong'}>
      <p className='text-yellow-700 pt-4'>
        You can {contactMeLink}{' '}
        and tell about the error.
      </p>
    </ErrorTile>)

  return (
    <>
      <UserProvider>
        <Toaster position='top-right' />
        <div className='fixed top-0 right-0 left-0 z-50'>
          <Navbar />
        </div>
        <main className='pt-16'>
          <div className='flex flex-col h-[calc(100vh-4rem)]'>
            <div className='py-10 px-15 flex-1'>
              {isNotFound ? notFound : defaultError}
            </div>
            <Footer />
          </div>
          
        </main>
      </UserProvider>
    </>
  );
};
