import React, { useState, useMemo } from 'react';
import NarrowNav from './NarrowNav';
import WideNav from './WideNav';
import '../../styles/Header.css';

function Header({ darkMode, setDarkMode }) {
  const [navOrMenu, setNavOrMenu] = useState(window.innerWidth < 700);

  const displayWindowSize = () => {
    if (window.innerWidth < 700) {
      setNavOrMenu(true);
    } else {
      setNavOrMenu(false);
    }
  };

  useMemo(() => window.addEventListener('resize', displayWindowSize), []);
  return (
    <>
      {!navOrMenu ? (
        <WideNav darkMode={darkMode} setDarkMode={setDarkMode} />
      ) : (
          <NarrowNav darkMode={darkMode} setDarkMode={setDarkMode} />
        )}
    </>
  );
}

export default Header;
