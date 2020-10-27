import React from "react";
import { Link } from "react-router-dom";
function AddChallengeNavbar() {
  return (
    <div
      style={{
        height: "10vh",
        marginTop: "10vh",
        background: "white",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <Link to="/myproposed">My Proposed</Link>

      <Link to="/allproposed">All Proposed</Link>

      <Link to="/proposedchallenge/3">single-challenge</Link>
    </div>
  );
}

export default AddChallengeNavbar;
