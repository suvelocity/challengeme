import React, { useEffect, useState } from 'react'
import network from '../services/network';
import ChallengeCard from '../components/ChallengeCard';
import { Typography } from '@material-ui/core';
import "./Home.css"



export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [challenges, setChallenges] = useState([]);
  useEffect(() => {
    (async () => {
      const { data: challengesFromServer } = await network.get('/api/v1/challenges')

      setChallenges(challengesFromServer);
    })();
  }, []);



  return (
    <div >
      <Typography variant="h5" gutterBottom>
        Challenges
      </Typography>
      <div className ={darkMode?"dark-home-page":"light-home-page"}>
      {challenges.map(challenge => (
        <ChallengeCard
          key={challenge.id}
          challengeId={challenge.id}
          createdAt={challenge.createdAt}
          name={challenge.name}
          description={challenge.description}
        />
      ))}
      </div>
     
    </div>
  )
}