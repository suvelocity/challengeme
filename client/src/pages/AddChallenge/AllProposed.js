import React from "react";

function AllProposed() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Only Admin Can See Me</h1>
      <h2>admin can see all the pending challenges</h2>
    </div>
  );
}

export default AllProposed;
