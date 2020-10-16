import React from "react";

export default function Background() {
    return (
        <div
            style={{
                background:
                    "linear-gradient(60deg, rgba(58, 106, 183, 0.7) 0%, rgba(213, 240, 255, 0.5) 100%",
                position: "absolute",
                zIndex: "-1",
                height: "100vh",
                width: "100%",
            }}
        ></div>
    );
}
