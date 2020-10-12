import React, { useEffect, useState, useContext } from 'react'
import network from '../services/network';
import ChallengeCard from '../components/ChallengeCard';
import "./Home.css"
import ThemeApi from "../services/Theme"
import Cookies from "js-cookie";
import { useHistory } from 'react-router-dom';
import { Logged } from '../context/LoggedInContext';

export default function HomePage() {
  const [challenges, setChallenges] = useState([]);
  const darkMode = React.useContext(ThemeApi).darkTheme

  const [challengeToApply, setChallengeToApply] = useState();
  const [expandedChallenge, setExpandedChallenge] = useState();
  const value = useContext(Logged);
  const location = useHistory();
  
  useEffect(() => {
    (async () => {
      const { data: challengesFromServer } = await network.get('/api/v1/challenges')

      setChallenges(challengesFromServer);
    })();
  }, []);


  return (
    <div >
      <div className ={darkMode?"dark-home-page":"light-home-page"}>
      {challenges.map((challenge) => (
        <ChallengeCard
          key={challenge.id}
          challengeId={challenge.id}
          createdAt={challenge.createdAt}
          name={challenge.name}
          description={challenge.description}
          repositoryName = {challenge.repositoryName}
        />
      ))}
      </div>
     
    </div>
  )
}