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



  const logOut = async () => {
    try {
      const { data: response } = await network.post('/api/v1/auth/logout', { token: Cookies.get("refreshToken") })
      location.push('/login');
      value.setLogged(false);
      Cookies.remove("refreshToken")
      Cookies.remove("accessToken")
    } catch (error) {
      console.error(error)
    }
  }



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