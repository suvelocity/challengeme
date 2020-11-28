import React, { useState } from 'react'
import Button from "@material-ui/core/Button";
import SubmissionsByChallenges from './SubmissionsByChallenges';
import SubmissionsByUsers from './SubmissionsByUsers';

export default function Index({ teamName }) {

    const [showByChallengeOrUser, setShowByChallengeOrUser] = useState(true);

    return (
        <div className="generic-page">
            <h1>{teamName} Submissions Status</h1>
            <Button onClick={() => setShowByChallengeOrUser(prev => !prev)}>
                {showByChallengeOrUser ? 'Show By User' : 'Show By Challenge'}
            </Button>
            {showByChallengeOrUser ? <SubmissionsByChallenges /> : <SubmissionsByUsers />}
        </div>
    )
}
