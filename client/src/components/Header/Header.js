import React, { useState } from "react";
import "./Header.css";
import NarrowNav from "./NarrowNav";
import WideNav from "./WideNav";

function Header({ darkMode, setDarkMode }) {
  const [navOrMenu, setNavOrMenug] = useState(
    window.innerWidth < 700 ? true : false
  );

  const displayWindowSize = () => {
    if (window.innerWidth < 1100) {
      setNavOrMenug(true);
    } else {
      setNavOrMenug(false);
    }
  };
  window.addEventListener("resize", displayWindowSize);

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
