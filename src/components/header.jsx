import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import searchIcon from '../../src/assets/icons/search.png';

import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import ThemeChanger from './themeChanger';

const Header = () => {
  const router = useRouter();
  const [header, setHeader] = useState(false);
  const [headerColor, setHeaderColor] = useState('transparent');
  const [headerText, setHeaderText] = useState('white');
  const [user, setUser] = useState(null);

  const handleHeader = () => {
    setHeader(!header);
  };

  const handleMobileHeader = () => {
    setHeader(false);
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Failed to parse user data');
      }
    }

    const handleColorChange = () => {
      if (window.scrollY >= 250) {
        setHeaderColor('linear-gradient(to right, #8e2de2, #4a00e0)');
        setHeaderText('#ffffff');
      } else {
        setHeaderColor('transparent');
        setHeaderText('#ffffff');
      }
    };
    window.addEventListener('scroll', handleColorChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  return (
    <div
      style={{ background: `${headerColor}` }}
      className=" fixed top-0 left-0 w-full h-20 shadow-xl flex justify-between items-center z-40 ease-in duration-300"
    >
      {/* Menu + Name */}

      <div className="max-w-[1240px] m-5 flex justify-between items-center p-4">
        <Link href="/">
          <h1
            style={{ color: `${headerText}` }}
            className="py-2 text-2xl font-bold hover:text-orange-500"
          >
            Constructor
          </h1>
        </Link>
      </div>

      {/* Search */}

      <div className=" hidden sm:flex">
        <Image src={searchIcon} alt="Menu" className="w-4 h-4 self-center" />
        <input
          type="text"
          placeholder="Search"
          maxLength="20"
          className="w-40 bg-transparent outline-none placeholder-gray-300 mx-4 py-2 text-white capitalize"
        />
      </div>

      {/* navbar Links */}

      <ul
        style={{ color: `${headerText}` }}
        className="text-sm font-bold hidden sm:flex"
      >
        <li className="p-4 hover:text-orange-500">
          <Link href="/properties">Browse Properties</Link>
        </li>
        <li className="p-4 hover:text-orange-500">
          <Link href="#about-container">About</Link>
        </li>
        <li className="p-4 hover:text-orange-500">
          <Link href="#services">Services</Link>
        </li>
        <li className="p-4 hover:text-orange-500">
          <Link href="#reviews">Reviews</Link>
        </li>
        <li className="p-4 hover:text-orange-500">
          <Link href="#contact">Contact</Link>
        </li>
      </ul>

      {/* Auth Buttons */}
      <div className="hidden sm:flex gap-2 mr-5 items-center">
        {user ? (
          <>
            <Link href="/messages" className="px-3 py-2 hover:text-orange-500 text-sm font-bold" title="Messages">
              💬
            </Link>
            <Link href="/notifications" className="px-3 py-2 hover:text-orange-500 text-sm font-bold" title="Notifications">
              🔔
            </Link>
            {user.role === 'landlord' && (
              <>
                <Link href="/landlord/properties" className="px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-bold">
                  Properties
                </Link>
                <Link href="/landlord/analytics" className="px-2 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded text-xs font-bold">
                  Analytics
                </Link>
              </>
            )}
            {user.role === 'admin' && (
              <Link href="/admin/dashboard" className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-bold">
                Admin
              </Link>
            )}
            <Link href="/dashboard" className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-bold">
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-bold"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/auth/login" className="px-4 py-2 hover:text-orange-500 font-bold">
              Login
            </Link>
            <Link href="/auth/signup" className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded font-bold">
              Sign Up
            </Link>
          </>
        )}
      </div>
      <div className="mr-10">
        <ThemeChanger />
      </div>

      {/* Mobile hamburgerMenu */}

      <div onClick={handleHeader} className="block sm:hidden p-4 z-10">
        {header ? (
          <AiOutlineClose size={30} style={{ color: `${headerText}` }} />
        ) : (
          <AiOutlineMenu size={30} style={{ color: `${headerText}` }} />
        )}
      </div>
      <div
        className={
          header
            ? 'sm:hidden absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center w-full h-screen bg-[#020308ea] text-center ease-in duration-300'
            : 'sm:hidden absolute top-0 right-0 bottom-0 left-[-100%] flex justify-center items-center w-full h-screen bg-[#020308ea] text-center ease-in duration-300'
        }
      >
        <ul style={{ color: `${headerText}` }} className="text-sm font-bold space-y-4">
          <li className="mx-7 py-4 text-2xl hover:text-orange-500">
            <Link href="/properties" onClick={handleMobileHeader}>
              Browse Properties
            </Link>
          </li>
          {user ? (
            <>
              <li className="mx-7 py-4 text-2xl hover:text-orange-500">
                <Link href="/messages" onClick={handleMobileHeader}>
                  💬 Messages
                </Link>
              </li>
              <li className="mx-7 py-4 text-2xl hover:text-orange-500">
                <Link href="/notifications" onClick={handleMobileHeader}>
                  🔔 Notifications
                </Link>
              </li>
              <li className="mx-7 py-4 text-2xl hover:text-orange-500">
                <Link href="/dashboard" onClick={handleMobileHeader}>
                  Dashboard
                </Link>
              </li>
              {user.role === 'landlord' && (
                <>
                  <li className="mx-7 py-4 text-2xl hover:text-orange-500">
                    <Link href="/landlord/properties" onClick={handleMobileHeader}>
                      My Properties
                    </Link>
                  </li>
                  <li className="mx-7 py-4 text-2xl hover:text-orange-500">
                    <Link href="/landlord/analytics" onClick={handleMobileHeader}>
                      Analytics
                    </Link>
                  </li>
                </>
              )}
              {user.role === 'admin' && (
                <li className="mx-7 py-4 text-2xl hover:text-orange-500">
                  <Link href="/admin/dashboard" onClick={handleMobileHeader}>
                    Admin Dashboard
                  </Link>
                </li>
              )}
              <li className="mx-7 py-4 text-2xl hover:text-orange-500 cursor-pointer" onClick={() => { handleLogout(); handleMobileHeader(); }}>
                Logout
              </li>
            </>
          ) : (
            <>
              <li className="mx-7 py-4 text-2xl hover:text-orange-500">
                <Link href="/auth/login" onClick={handleMobileHeader}>
                  Login
                </Link>
              </li>
              <li className="mx-7 py-4 text-2xl hover:text-orange-500">
                <Link href="/auth/signup" onClick={handleMobileHeader}>
                  Sign Up
                </Link>
              </li>
            </>
          )}
          <li className="mx-7 py-4 text-2xl hover:text-orange-500">
            <Link href="#about-container" onClick={handleMobileHeader}>
              About
            </Link>
          </li>
          <li className="mx-7 py-4 text-2xl hover:text-orange-500">
            <Link href="#services" onClick={handleMobileHeader}>
              Services
            </Link>
          </li>
          <li className="mx-7 py-4 text-2xl hover:text-orange-500">
            <Link href="#reviews" onClick={handleMobileHeader}>
              Reviews
            </Link>
          </li>
          <li className="mx-7 py-4 text-2xl hover:text-orange-500">
            <Link href="#contact" onClick={handleMobileHeader}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
