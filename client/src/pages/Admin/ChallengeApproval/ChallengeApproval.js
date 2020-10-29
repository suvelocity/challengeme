import React, { useEffect, useState, useContext } from 'react';
import "./ChallengeApproval.css";
import network from '../../../services/network';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Loading from "../../../components/Loading/Loading";
import AllChallenges from '../../../context/AllChallengesContext';
import AdminChallengeCard from '../../../components/AdminChallengeCard/AdminChallengeCard';

const ChallengeApproval = () => {
    const [challenges, setChallenges] = useState();
    const [challengesStates, setChallengesStates] = useState([]);
    const [pendingArray, setPendingArray] = useState([]);
    const [approvedArray, setApprovedArray] = useState([]);
    const [deniedArray, setDeniedArray] = useState([]);
    const value = useContext(AllChallenges);

    const fetchSubmissions = async () => {
        const { data } = await network.get(`/api/v1/challenges/pending-challenges`);
        setChallenges(data);
        setChallengesStates(data.map((challenge) => {
            return challenge.state
        }))
    }

    const refreshChallenges = async () => {
        const { data: challengesFromServer } = await network.get('/api/v1/challenges')
        value.setChallenges(challengesFromServer);
    }

    const changeChallengeState = async (event, challengeId, index) => {
        console.log(event.target.innerText)
        const newState = event.target.innerText === 'APPROVE' ? 'approved' : 'denied';
        const cloneStateArray = [...challengesStates]
        cloneStateArray[index] = newState
        setChallengesStates(cloneStateArray)
        await network.patch(`
        /api/v1/challenges/state-update/${challengeId}
        `, { state: newState });
    }

    useEffect(() => {
        let pending = []
        let approved = []
        let denied = []
        challenges && challenges.forEach((challenge, index) => {
            let card = <AdminChallengeCard
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
                index={index} />

            switch (challengesStates[index]) {
                case 'pending':
                    pending.push(card)
                    break;
                case 'approved':
                    approved.push(card)
                    break;
                case 'denied':
                    denied.push(card)
                    break;
                default:
                    break;
            }
        })
        setPendingArray(pending)
        setApprovedArray(approved)
        setDeniedArray(denied)
        // eslint-disable-next-line
    }, [challenges, challengesStates])

    useEffect(() => {
        fetchSubmissions();
        return () => refreshChallenges()
        // eslint-disable-next-line
    }, [])

    return (
        <div className="admin" style={{ marginTop: '50px', textAlign: 'center' }}>
            <Button variant="contained" color="secondary">
                <Link to='/admin' ><h2>Admin Router</h2></Link>
            </Button>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h2>Pending Challenges:</h2>
                    {pendingArray ? pendingArray : <Loading />}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h2>Aprooved Challenges:</h2>
                    {approvedArray ? approvedArray : <Loading />}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h2>Denied Challenges:</h2>
                    {deniedArray ? deniedArray : <Loading />}
                </div>
            </div>
        </div>
    );
};

export default ChallengeApproval;
