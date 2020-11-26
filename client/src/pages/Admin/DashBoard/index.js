import React, { lazy } from 'react';

const SuccessSubmissionsPerUsers = lazy(() => import("./Charts/SuccessSubmissionsPerUsers"));
const LastWeekSubmissions = lazy(() => import("./Charts/LastWeekSubmissions"));
const SuccessPerChallenge = lazy(() => import("./Charts/SuccessPerChallenge"));
const TeamTotalSubmission = lazy(() => import("./Charts/TeamTotalSubmission"));

function DashBoard({ darkMode }) {

    return (
        <div >
            <h1>This DashBoard Admin Page</h1>
            <TeamTotalSubmission darkMode={darkMode} />
            <SuccessPerChallenge darkMode={darkMode} />
            <SuccessSubmissionsPerUsers darkMode={darkMode} />
            <LastWeekSubmissions darkMode={darkMode} />
        </div>
    )
}

export default DashBoard;
