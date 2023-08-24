import { AuthContext } from '@/context/AuthContext';
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect, useState, useContext } from 'react'
import { toast } from 'react-hot-toast';
import { FiLogIn, FiLogOut } from 'react-icons/fi';

const Header = () => {

  const router = useRouter();
  const [isOnAuthPage, setIsOnAuthPage] = useState(false);
  const {
    user,
    logout,
    isLoggedIn,
  } = useContext(AuthContext);

  useEffect(() => {
    const isAuthPage = router.pathname === '/auth';
    if (isAuthPage) {
      setIsOnAuthPage(true);
    } else {
      setIsOnAuthPage(false);
    }
  }, [router.pathname]);

  const handleLogout = () => {
    logout();
  }

  return (
    <>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
            <Link href={'/'} className="mr-5 hover:text-orange-400 cursor-pointer transition-colors duration-500">Home</Link>
            {isLoggedIn && <Link href={'/todos'} className="mr-5 hover:text-orange-400 cursor-pointer transition-colors duration-500">TODO's</Link>
            }
          </nav>
          <Link href={'/'} className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
            <img src="/LOGO_TODO.png" className="w-14 sm:w-16 md:w-20 lg:w-24 xl:w-28" />
          </Link>
          <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">

            <span className="inline-flex sm:ml-auto flex-col sm:mt-0 mt-4 justify-center items-center sm:justify-start">

              {!isOnAuthPage && (
                <>
                  {!isLoggedIn ? (
                    <Link href={'/auth'} className="text-gray-500 hover:text-orange-400 transition-colors duration-500 flex items-center">
                      Login <FiLogIn className="ml-1" />
                    </Link>
                  ) : (
                    <>
                      <span className='text-orange-700 items-center text-sm font-bold mr-2'>{user.email}</span>
                      <button onClick={handleLogout} className="text-gray-500 hover:text-orange-400 transition-colors duration-500 flex items-center mt-2">
                        Logout <FiLogOut className="ml-1" />
                      </button>
                    </>
                  )}
                </>
              )}

            </span>

          </div>
        </div>
      </header>
    </>
  )
}

export default Header