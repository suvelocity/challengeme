import React from "react";
import "./Loading.css";
function Loading({ darkMode, firstLoading }) {
    const getBackground = () => {
        if (firstLoading) {
            return { backgroundColor: "white" };
        } else if (darkMode) {
            return { backgroundColor: "transparent" };
        } else {
            return { backgroundColor: "transparent" };
        }
    };
    return (
        <div style={getBackground()} className="loaderContainer">
            <div className="loader"></div>
        </div>
    );
}

export default Loading;
