import React, { useState, useMemo } from "react";
import "./Header.css";
import NarrowNav from "./NarrowNav/NarrowNav";
import WideNav from "./WideNav/WideNav";

function Header({ darkMode, setDarkMode }) {
    const [navOrMenu, setNavOrMenu] = useState(window.innerWidth < 700 ? true : false);

    const displayWindowSize = () => {
        if (window.innerWidth < 700) {
            setNavOrMenu(true);
        } else {
            setNavOrMenu(false);
        }
    };

    useMemo(() => window.addEventListener("resize", displayWindowSize), []);
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
