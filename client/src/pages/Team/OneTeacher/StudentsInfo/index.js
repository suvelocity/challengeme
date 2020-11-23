import React, { useState } from 'react'
import Button from "@material-ui/core/Button";
import SubmissionsByChallenges from './SubmissionsByChallenges';
import SubmissionsByUsers from './SubmissionsByUsers';

export default function Index() {

    const [state, setState] = useState(true);
    return (
        <div>
            <h1>Students Info</h1>
            <Button onClick={() => setState(prev => !prev)}>
                change State
            </Button>
            {state ? <SubmissionsByChallenges /> : <SubmissionsByUsers />}
        </div>
    )
}
