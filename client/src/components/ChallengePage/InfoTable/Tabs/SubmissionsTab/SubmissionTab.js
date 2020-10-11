import React, { useEffect, useState } from "react";
import network from "../../../../../services/network";
import Submission from "./Submission";
import Cookies from "js-cookie";

// TODO: get the userName from the coockies and allow him to see his own submissions
const loggedUserId  = Cookies.get('userId');

function SubmissionTab({ challengeId }) {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      const { data: submissions } = await network.get(
        `/api/v1/challenges/${challengeId}/submissions`
      );
      setSubmissions(submissions);
    };
    fetchSubmissions();
    const liveSubmissions = setInterval(fetchSubmissions, 7000);
    return () => clearInterval(liveSubmissions);
  }, [challengeId]);
  console.log({ submissions });
  return (
    <div>
      <Submission
        className="headlines"
        name={"Name"}
        status={"Status"}
        submittedAt={"Submitted at"}
        bold={true}
      />
      {submissions.map((item, i) => (
        <Submission
          className="submission"
          key={i}
          name={item.solutionRepository.split("/")[0]}
          status={item.state}
          submittedAt={item.updatedAt.split("T").join(" ").split(".")[0]}
          solutionRepository={item.solutionRepository}
          bold={false}
        />
      ))}
    </div>
  );
}

export default SubmissionTab;
