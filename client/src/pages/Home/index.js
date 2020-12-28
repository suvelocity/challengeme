import React, { useEffect, useState, useContext } from 'react';
import mixpanel from 'mixpanel-browser';
import Cookies from 'js-cookie';
import ChallengeCard from '../../components/ChallengeCard';
import './Home.css';
import AllChallenges from '../../context/AllChallengesContext';
import FilteredLabels from '../../context/FilteredLabelsContext';
import temporaryImage from "../../images/Rectangle139.png";
import ChooseLabels from '../../components/Choosers/ChooseLabels';
import Button from '@material-ui/core/Button';
import {
 useLocation,
  } from 'react-router-dom';

export default function Home() {
  const allChallenges = useContext(AllChallenges).challenges;
  const filteredLabels = useContext(FilteredLabels);
  const [challengesFiltered, setChallengesFiltered] = useState(allChallenges);
  const [labels, setLabels] = useState([]);
  const [chooseLabels, setChooseLabels] = useState([]);
  const currentLocation = useLocation();

  useEffect(() => {
    if (currentLocation.pathname !== '/challenges') {
      setLabels([]);
    } else {
      const newFilter = chooseLabels.filter(
        (label) => label.value === (filteredLabels ? filteredLabels.filteredLabels[0] : null),
      );
      setLabels(newFilter);
    }
    // eslint-disable-next-line
  }, [currentLocation]);

  useEffect(() => {
    (async () => {
      try {
        if (filteredLabels.filteredLabels.length > 0) {
          const filteredByLabelChallenges = [];
          allChallenges.forEach((challenge) => {
            if (filteredLabels.filteredLabels.every((labelChallenge) => challenge.Labels.map((label) => label.id).includes(labelChallenge))) {
              if (!filteredByLabelChallenges.includes(challenge)) {
                filteredByLabelChallenges.push(challenge);
              }
            }
          });
          setChallengesFiltered(filteredByLabelChallenges);
        } else {
          setChallengesFiltered(allChallenges);
        }
      } catch (error) {
      }
    })();
    // eslint-disable-next-line
  }, [filteredLabels]);

  useEffect(() => {
    const user = Cookies.get('userName');
    mixpanel.track('User On Home Page', { User: `${user}` });
    return () => filteredLabels.setFilteredLabels([]);
    // eslint-disable-next-line
  }, [])

  return (
      <div className="home-page">
        <div
            className="All-Challenge-Image-Container"
        >
        <div className="All-Challenge-Title-Container">
            <h1>Explore Your Kind Of challenge</h1>
        </div>
        </div>
        <div style={{display:'flex',gap:10}}>
        <div style={{ minWidth: '150px', width: 'fit-content' }}>
              <ChooseLabels
                labels={labels}
                chooseLabels={chooseLabels}
                setChooseLabels={setChooseLabels}
                // darkMode={darkMode}
                setLabels={setLabels}
              />
          </div>
          <Button
              onClick={() => {
                filteredLabels.setFilteredLabels(labels ? labels.map((label) => label.value) : []);
              }}
              variant="contained"
            //   className={darkMode ? classes.filterButtonDark : classes.filterButton}
            >
              filter
            </Button></div>
        <div className="challenges-container">
          {challengesFiltered.length > 0 ? (
            challengesFiltered.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                challengeId={challenge.id}
                name={challenge.name}
                description={challenge.description}
                repositoryName={challenge.repositoryName}
                labels={challenge.Labels}
                rating={challenge.averageRaiting}
                submissions={challenge.submissionsCount}
                createdAt={challenge.createdAt}
                authorName={challenge.Author.userName}
              />
            ))) : <h1>Not Found</h1>}
        </div>
    </div>
  );
}
