import React, { useEffect, useState } from 'react'
import network from '../services/network';
import ChallengeCard from '../components/ChallengeCard';
import "./Home.css"
import ThemeApi from "../services/Theme"



export default function HomePage() {
  const [challenges, setChallenges] = useState([]);
  const darkMode = React.useContext(ThemeApi).darkTheme

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
          labels = {challenge.Labels}
        />
      ))}
      </div>
     
    </div>
  )
}