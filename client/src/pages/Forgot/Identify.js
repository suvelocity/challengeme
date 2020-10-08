import React, { useState } from "react";
import axios from "../../services/network";

export default function Identify(props) {
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");

  const getQuestion = async () => {
    try {
      const { data } = await axios.post("/api/v1/auth/getquestion", {
        userName,
      });
      props.setQuestion(data.securityQuestion);
    } catch (e) {
      setError(e.response.data.message);
    }
  };

  return (
    <div>
      your username{" "}
      <input
        name="userName"
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button onClick={getQuestion} />
      <div name="error-box">{error}</div>
    </div>
  );
}
