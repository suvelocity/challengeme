import React from "react";

export default function Change({ data, setData }) {
  return (
    <div>
      Enter new password{" "}
      <input
        type="password"
        value={data.newPassword}
        onChange={(e) =>
          setData((prev) => {
            prev.newPassword = e.target.value;
            return prev;
          })
        }
        placeholder="Enter New Password"
      />{" "}
      <br />
      Confirm your password{" "}
      <input
        type="password"
        placeholder="Confirm Password"
        value={data.confirmPassword}
        onChange={(e) =>
          setData((prev) => {
            prev.confirmPassword = e.target.value;
            return prev;
          })
        }
      />
      <br />
    </div>
  );
}
