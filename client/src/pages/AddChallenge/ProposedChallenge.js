import React from "react";

function ProposedChallenge() {
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
      <h1>this is the form</h1>
      <h2>Form will have the inputs</h2>
      <button>cancel (only author can see me)</button>

      <button>Approve(only admin can see me)</button>
      <button>decline(only admin can see me)</button>
    </div>
  );
}

export default ProposedChallenge;
