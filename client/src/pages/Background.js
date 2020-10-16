import React, { useContext } from "react";
import { Logged } from "../context/LoggedInContext";
import ThemeApi from "../context/ThemeContext";

export default function Background() {
    const status = useContext(Logged);
    const darkMode = useContext(ThemeApi).darkTheme;
    const authBg = darkMode
        ? "black"
        : `linear-gradient(60deg, rgba(58, 106, 183, 0.7) 0%, rgba(213, 240, 255, 0.5) 100%`;
    const appBg = darkMode ? "rgb(33,33,33)" : "#EEF2F7";
    return (
        // <div
        //     style={{
        //         background: status
        //             ? darkMode?:"#EEF2F7"
        //             : `linear-gradient(60deg, rgba(58, 106, 183, 0.7) 0%, rgba(213, 240, 255, 0.5) 100%"`,
        //         position: "absolute",
        //         zIndex: "-1",
        //         height: "100vh",
        //         width: "100%",
        //     }}
        // ></div>
        <div
            style={{
                background: status.logged ? appBg : authBg,
                position: "absolute",
                zIndex: "-1",
                height: "100vh",
                width: "100%",
            }}
        ></div>
    );
}
