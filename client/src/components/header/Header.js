import React, { useState, useMemo, useEffect } from 'react';
import './Header.css';
import Cookies from 'js-cookie';
import NarrowNav from './NarrowNav/NarrowNav';
import WideNav from './WideNav/WideNav';

function Header({ darkMode, setDarkMode }) {
  const [navOrMenu, setNavOrMenu] = useState(window.innerWidth < 700);
  const [isAdmin, setIsAdmin] = useState(false);

  const displayWindowSize = () => {
    if (window.innerWidth < 700) {
      setNavOrMenu(true);
    } else {
      setNavOrMenu(false);
    }
  };
  useEffect(() => {
    if (Cookies.get('isAdmin') === 'admin') {
      console.log('I AM ADMIN NOW YAY');
      setIsAdmin(true);
    }
  }, []);

  useMemo(() => window.addEventListener('resize', displayWindowSize), []);
  return (
    <>
      {!navOrMenu ? (
        <WideNav isAdmin={isAdmin} darkMode={darkMode} setDarkMode={setDarkMode} />
      ) : (
        <NarrowNav isAdmin={isAdmin} darkMode={darkMode} setDarkMode={setDarkMode} />
      )}
    </>
  );
}

export default Header;
