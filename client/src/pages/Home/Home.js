import React, { useCallback, useEffect, useState } from 'react'
import network from '../../services/network';
import ChallengeCard from '../../components/ChallengeCard/ChallengeCard';
import "./Home.css"
import ThemeApi from "../../services/Theme"
import FilterMenu from '../../components/FilterMenu/FilterMenu';


export default function HomePage() {
  const [challenges, setChallenges] = useState([]);
  const [filters, setFilters] = useState({labels:[]});
  const darkMode = React.useContext(ThemeApi).darkTheme

  const getFilters = useCallback(
    () => {
      const filterNames = Object.keys(filters)
      const filterString = filterNames.map(name=>{
        const value = filters[name]
        let valueString = (typeof value === 'object')
        ? value.join(',')
        :value
        return `${name}=${valueString}`
      }).join('&')
      return filterString
    },
    [filters]
  ) 

  useEffect(() => {
    (async () => {
      try{
        const { data: challengesFromServer } = await network.get(
          '/api/v1/challenges?'+getFilters())
          typeof challengesFromServer ==="object"&&
          setChallenges(challengesFromServer)
      }catch(e){}
    })();  
  }, [filters]);  

  return (
    <div 
    className={darkMode && "dark"}>
      <div className ="home-page">
      <FilterMenu 
      formerSelection={filters} 
      updateFilters={setFilters} />
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