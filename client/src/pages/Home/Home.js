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
  const allChallenges = useContext(AllChallenges).challenges;
  const [challenges, setChallenges] = useState(allChallenges);
  const [revertLabelFiltering, setRevertLabelFiltering] = useState(false);
  const [previousQuery, setPreviousQuery] = useState("");

  let query = useQuery();

  useEffect(() => {
    (async () => {
      try {
        //checking if there is query params and the page loaded once
        if (query.get("labelId") && query.get("labelId") !== previousQuery) {
          const filteredByLabelChallenges = [];
          for (let i = 0; i < challenges.length; i++) {
            for (let label of challenges[i].Labels) {
              if (label.id === Number(query.get("labelId"))) {
                filteredByLabelChallenges.push(challenges[i]);
              }
            }
          }
          setRevertLabelFiltering(true);
          setChallenges(filteredByLabelChallenges);
          setPreviousQuery(query.get("labelId"));
        } else {
          setChallenges(allChallenges);
        }
      } catch (e) {}
    })();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    (() => {
      if (query.get("labels") && query.get("labels") !== previousQuery) {
        const filteredByLabelChallenges = [];
        const searchedLabels = query.get("labels").split(",");
        const labelsToMatch = searchedLabels.length;
        for (let i = 0; i < challenges.length; i++) {
          let labelsMatched = 0;
          for (let label of challenges[i].Labels) {
            for (let labelToCheck of searchedLabels) {
              if (label.id === Number(labelToCheck)) {
                labelsMatched += 1;
              }
            }
          }
          if (labelsMatched === labelsToMatch) {
            filteredByLabelChallenges.push(challenges[i]);
          }
        }
        setPreviousQuery(query.get("labels"));
        setRevertLabelFiltering(true);
        setChallenges(filteredByLabelChallenges);
      }
    })();
    // eslint-disable-next-line
  }, [query]);

  const resetLabelFiltering = useCallback(() => {
    setRevertLabelFiltering(false);
    setChallenges(allChallenges);
    // eslint-disable-next-line
  }, []);
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
              rating={
                typeof challenge.Reviews[0] === "object"
                  ? challenge.Reviews[0]
                  : null
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
