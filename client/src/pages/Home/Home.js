import React, { useEffect, useState, useContext, useCallback } from "react";
import ChallengeCard from "../../components/ChallengeCard/ChallengeCard";
import "./Home.css";
import { useLocation } from "react-router-dom";
import AllChallenges from "../../context/AllChallengesContext";
import { Button } from "@material-ui/core";
//function to get query params
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Home() {
  const [filtered, setFiltered] = useState(false);
  const allChallenges = useContext(AllChallenges).challenges;
  const [challenges, setChallenges] = useState(allChallenges);
  const [revertLabelFiltering, setRevertLabelFiltering] = useState(false);

  let query = useQuery();

  useEffect(() => {
    (async () => {
      try {
        //checking if there is query params and the page loaded once
        if (query.get("labelId") && !filtered) {
          const filteredByLabelChallenges = [];
          for (let i = 0; i < challenges.length; i++) {
            for (let label of challenges[i].Labels) {
              if (label.id === Number(query.get("labelId"))) {
                filteredByLabelChallenges.push(challenges[i]);
              }
            }
          }
          setRevertLabelFiltering(true);
          setFiltered(true);
          setChallenges(filteredByLabelChallenges);
        } else {
          setChallenges(allChallenges);
        }
      } catch (e) {}
    })();
    // eslint-disable-next-line
  }, []);

  const resetLabelFiltering = useCallback(() => {
    setRevertLabelFiltering(false);
    setChallenges(allChallenges);
  }, [revertLabelFiltering]);
  return (
    <div>
      <div className='home-page'>
        {revertLabelFiltering && (
          <Button onClick={resetLabelFiltering}>Revert label filtering</Button>
        )}
        <div className={"challenges-container"}>
          {challenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challengeId={challenge.id}
              createdAt={challenge.createdAt}
              name={challenge.name}
              description={challenge.description}
              repositoryName={challenge.repositoryName}
              labels={challenge.Labels}
              rating={challenge.Reviews[0]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
