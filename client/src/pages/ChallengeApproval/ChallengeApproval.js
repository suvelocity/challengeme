import React, { useEffect, useState } from 'react';
import "./ChallengeApproval.css";
import network from '../../services/network';

const ChallengeApproval = () => {
    const [pendingSubmissions, setPendingSubmissions] = useState();
    const [challenges, setChallenges] = useState();
    const fetchSubmissions = async () => {
        const { data } = await network.get(`/api/v1/challenges/pending-challenges`);
        setChallenges(data);
    }
    useEffect(() => {
        fetchSubmissions();
    }, [])

    const changeChallengeState = async (event, challengeId) => {
        console.log(event.target.innerText);
        const newState = event.target.innerText === 'Approve'? 'approved' : 'denied';
        const { data } = await network.patch(`
        /api/v1/challenges/state-update/${challengeId}
        `, {state: newState});
        console.log(data);
    }


    return (
        <div className="challenge-approval" style={{ paddingTop: '100px' }}>
            {challenges ? challenges.map(challenge => {
                return (
                    <div  >
                        <h1>{challenge.name}</h1>
                        <div>{challenge.id}</div>
                        <div>{challenge.Author.userName}</div>
                        <div>{challenge.Labels ? challenge.Labels.map((label) => <div>{label.name}</div>) : <h2>Labels Not Found</h2>}</div>
                        <div>{challenge.authorId}</div>
                        <div>{challenge.boilerPlate}</div>
                        <div>{challenge.description}</div>
                        <div>{challenge.state}</div>
                        <div>{challenge.repositoryName}</div>
                        <div>{challenge.type}</div>
                        <div>{challenge.createdAt}</div>
                        <div>{challenge.updatedAt}</div>
                        <button onClick={(event) => changeChallengeState(event,challenge.id)} >
                            Approve
                        </button>
                        <button onClick={(event)=> changeChallengeState(event, challenge.id)}>
                            Denie
                        </button>
                    </div>
                )
            }) : <h1>Not Found</h1>}
        </div>
    );
};

export default ChallengeApproval;
