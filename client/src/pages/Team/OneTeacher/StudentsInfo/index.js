import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import SubmissionsByChallenges from "./SubmissionsByChallenges";
import SubmissionsByUsers from "./SubmissionsByUsers";
import "./style.css";
export default function Index({ teamName,darkMode }) {
  const [state, setState] = useState(true);
  return (
    <div className="generic-page">
      <div className="student-info-control-panel">
        <h1 className="student-info-title-page">
          {" "}
          Team: <span className="student-info-title-page-name">{teamName}</span>{" "}
        </h1>
        <Button
          variant={darkMode ? "contained" : "outlined"}
          style={{ marginBottom: "20px" }}
          onClick={() => setState((prev) => !prev)}
        >
          change State
        </Button>
      </div>
      {state ? <SubmissionsByChallenges darkMode={darkMode}/> : <SubmissionsByUsers />}
      <div style={{ height: "50px" }}></div>
    </div>
  );
}
