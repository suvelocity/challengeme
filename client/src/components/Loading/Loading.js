import React from "react";
import "./Loading.css";
function Loading({ darkMode, firstLoading }) {
    const getBackground = () => {
        if (firstLoading) {
            return { backgroundColor: "white" };
        } else if (darkMode) {
            return { backgroundColor: "rgb(33,33,33)" };
        } else {
            return { backgroundColor: "rgb(232,244,248)" };
        }
    };
    return (
        <div style={getBackground()} className="loaderContainer">
            <div className="loader"></div>
        </div>
    );
}

export default Loading;
