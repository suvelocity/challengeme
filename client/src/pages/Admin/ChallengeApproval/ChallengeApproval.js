import React, { useEffect, useState, useContext } from 'react';
import "./ChallengeApproval.css";
import network from '../../../services/network';
import { Link } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";
import AllChallenges from '../../../context/AllChallengesContext';

const ChallengeApproval = () => {
    const [challenges, setChallenges] = useState();
    const [challengesStates, setChallengesStates] = useState([]);
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

    useEffect(() => {
        fetchSubmissions();
        return () => refreshChallenges()
        // eslint-disable-next-line
    }, [])

    const changeChallengeState = async (event, challengeId, index) => {
        const newState = event.target.innerText === 'Approve' ? 'approved' : 'denied';
        const cloneStateArray = [...challengesStates]
        cloneStateArray[index] = newState
        setChallengesStates(cloneStateArray)
        await network.patch(`
        /api/v1/challenges/state-update/${challengeId}
        `, { state: newState });
    }


    return (
        <div className="admin" style={{ marginTop: '100px' }}>
            <Link to='/admin' >
                admin router
            </Link>
            {challenges ? challenges.map((challenge, index) => {
                return (
                    <div key={challenge.name + challenge.id} >
                        <h1>Name: {challenge.name}</h1>
                        <div>Id :{challenge.id}</div>
                        <div>Author :{challenge.Author.userName}</div>
                        <div>Author Id: {challenge.authorId}</div>
                        <div>Labels: {challenge.Labels ? challenge.Labels.map((label) => {
                            return <li key={label.name} >{label.name}</li>
                        }) : <h2>Labels Not Found</h2>}</div>
                        <div>Boiler Plate: {challenge.boilerPlate}</div>
                        <div>Repository Name: {challenge.repositoryName}</div>
                        <div>Description: {challenge.description}</div>
                        <div>State: {challengesStates[index]}</div>
                        <div>Type: {challenge.type}</div>
                        <div>Created At: {challenge.createdAt}</div>
                        <div>Updated At: {challenge.updatedAt}</div>
                        <button onClick={(event) => changeChallengeState(event, challenge.id, index)} >
                            Approve
                        </button>
                        <button onClick={(event) => changeChallengeState(event, challenge.id, index)}>
                            Denie
                        </button>
                    </div>
                )
            }) : <Loading />}
        </div>
    );
};

export default ChallengeApproval;
