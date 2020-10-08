import React, { useState } from "react";
import axios from "../../services/network";

export default function Identify(props) {
  const { data, handleChange } = props;

  return (
    <div>
      your username{" "}
      <input
        name="userName"
        type="text"
        value={data.userName}
        onChange={handleChange("userName")}
      />
    </div>
  );
}
