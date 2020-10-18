import React, { useContext } from "react";
import { Logged } from "../context/LoggedInContext";

export default function Background({ darkMode }) {
    const status = useContext(Logged);
    const authBg = `linear-gradient(60deg, rgba(58, 106, 183, 0.7) 0%, rgba(213, 240, 255, 0.5) 100%`;
    const appBg = darkMode ? "rgb(33,33,33)" : "rgb(232,244,248)";
    return (
        <div
            style={{
                background: status.logged ? appBg : authBg,
                position: "absolute",
                zIndex: "-1",
                height: "100vh",
                width: "100%",
                backgroundAttachment: "fixed",
            }}
        ></div>
    );
}
