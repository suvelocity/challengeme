import React from "react";

export default function Change({ data, handleChange }) {
  return (
    <div>
      Enter new password{" "}
      <input
        type="password"
        name="newP"
        value={data.password}
        onChange={handleChange("newP")}
        placeholder="Enter New Password"
      />{" "}
      <br />
      Confirm your password{" "}
      <input
        type="password"
        name="confirmP"
        placeholder="Confirm Password"
        value={data.confirmPassword}
        onChange={handleChange("confirmP")}
      />
      <br />
    </div>
  );
}
