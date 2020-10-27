import React, { useEffect, useState } from 'react';
import "./ChallengeApproval.css";
import network from '../../services/network';

const ChallengeApproval = () => {
    const [pendingSubmissions, setPendingSubmissions] = useState();
    const fetchSubmissions = async () => {
       const {data} = await network.get(`/api/v1/challenges/pending-challenges`);
       console.log(data);
    }
    useEffect(() => {
        fetchSubmissions();
    },[])
    return (
        <div className="challenge-approval">
            
        </div>
    );
};

export default ChallengeApproval;