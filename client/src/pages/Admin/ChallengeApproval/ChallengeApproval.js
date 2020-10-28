import React, { useEffect, useState } from 'react';
import "./ChallengeApproval.css";
import network from '../../../services/network';
import { Link } from "react-router-dom";

const ChallengeApproval = () => {
    const [challenges, setChallenges] = useState();
    const fetchSubmissions = async () => {
        const { data } = await network.get(`/api/v1/challenges/pending-challenges`);
        setChallenges(data);
    }
    useEffect(() => {
        fetchSubmissions();
    }, [])

    const changeChallengeState = async (event, challengeId) => {
        const newState = event.target.innerText === 'Approve' ? 'approved' : 'denied';
        const { data } = await network.patch(`
        /api/v1/challenges/state-update/${challengeId}
        `, { state: newState });
        console.log(data);
    }


    return (
        <div className="admin" style={{ marginTop: '100px' }}>
            <Link to='/admin' >
                admin router
            </Link>
            {challenges ? challenges.map((challenge) => {
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
                        <div>State: {challenge.state}</div>
                        <div>Type: {challenge.type}</div>
                        <div>Created At: {challenge.createdAt}</div>
                        <div>Updated At: {challenge.updatedAt}</div>
                        <button onClick={(event) => changeChallengeState(event, challenge.id)} >
                            Approve
                        </button>
                        <button onClick={(event) => changeChallengeState(event, challenge.id)}>
                            Denie
                        </button>
                    </div>
                )
            }) : <h1>Not Found</h1>}
        </div>
    );
};

export default ChallengeApproval;
