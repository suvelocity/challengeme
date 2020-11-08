import React, { useEffect, useState, useContext } from 'react';
import './ChallengeApproval.css';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import network from '../../../services/network';
import Loading from '../../../components/Loading/Loading';
import AllChallenges from '../../../context/AllChallengesContext';
import AdminChallengeCard from '../../../components/AdminChallengeCard/AdminChallengeCard';

const ChallengeApproval = () => {
  const [challenges, setChallenges] = useState();
  const [challengesStates, setChallengesStates] = useState([]);
  const [pendingChallenges, setPendingChallenges] = useState([]);
  const [approvedChallenges, setApprovedChallenges] = useState([]);
  const [deniedChallenges, setDeniedChallenges] = useState([]);
  const allChallengesContext = useContext(AllChallenges);

  const getAllSubmissions = async () => {
    try {
      const { data } = await network.get('/api/v1/challenges/pending-challenges');
      setChallenges(data);
      setChallengesStates(data.map((challenge) => challenge.state));
    } catch (error) {
      console.error(error);
    }
  };

  const refreshChallenges = async () => {
    try {
      const { data: challengesFromServer } = await network.get('/api/v1/challenges');
      allChallengesContext.setChallenges(challengesFromServer);
    } catch (error) {
      console.error(error);
    }
  };

  const changeChallengeState = async (event, challengeId, index) => {
    try {
      console.log(event.target.innerText);
      const newState = event.target.innerText === 'APPROVE' ? 'approved' : 'denied';
      const cloneStateArray = [...challengesStates];
      cloneStateArray[index] = newState;
      setChallengesStates(cloneStateArray);
      await network.patch(`
      /api/v1/challenges/state-update/${challengeId}
      `, { state: newState });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const pendingList = [];
    const approvedList = [];
    const deniedList = [];
    challenges && challenges.forEach((challenge, index) => {
      const challengeCard = (
        <AdminChallengeCard
          key={challenge.id}
          challengeId={challenge.id}
          name={challenge.name}
          description={challengesStates[index]}
          repositoryName={challenge.repositoryName}
          labels={challenge.Labels}
          rating={challenge.averageRaiting}
          submissions={challenge.submissionsCount}
          createdAt={challenge.createdAt}
          authorName={challenge.Author.userName}
          changeChallengeState={changeChallengeState}
          index={index}
        />
      );

      switch (challengesStates[index]) {
        case 'pending':
          pendingList.push(challengeCard);
          break;
        case 'approved':
          approvedList.push(challengeCard);
          break;
        case 'denied':
          deniedList.push(challengeCard);
          break;
        default:
          break;
      }
    });
    setPendingChallenges(pendingList);
    setApprovedChallenges(approvedList);
    setDeniedChallenges(deniedList);
    // eslint-disable-next-line
  }, [challenges, challengesStates])

  useEffect(() => {
    getAllSubmissions();
    return () => refreshChallenges();
    // eslint-disable-next-line
  }, [])

  return (
    <div className="admin" style={{ marginTop: '50px', textAlign: 'center' }}>
      <Button variant="contained" color="secondary">
        <Link to="/admin"><h2>Admin Router</h2></Link>
      </Button>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h2>Pending Challenges:</h2>
          {pendingChallenges || <Loading />}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h2>Aprooved Challenges:</h2>
          {approvedChallenges || <Loading />}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h2>Denied Challenges:</h2>
          {deniedChallenges || <Loading />}
        </div>
      </div>
    </div>
  );
};

export default ChallengeApproval;
