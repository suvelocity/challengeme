import React, { useState } from "react";
import axios from "../../services/network";

export default function Identify(props) {
  const { data, setData } = props;

  return (
    <div>
      your username{" "}
      <input
        name="userName"
        type="text"
        value={data.userName}
        onChange={(e) =>
          setData((prev) => {
            prev.userName = e.target.value;
            return prev;
          })
        }
      />
    </div>
  );
}
