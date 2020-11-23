import React, { lazy } from 'react';

const SuccessSubmissionsPerUsers = lazy(() => import("./Charts/SuccessSubmissionsPerUsers"));
const LastWeekSubmissions = lazy(() => import("./Charts/LastWeekSubmissions"));
const SuccessPerChallenge = lazy(() => import("./Charts/SuccessPerChallenge"));

function DashBoard({ darkMode }) {

    return (
        <div >
            <h1>This DashBoard Admin Page</h1>
            <SuccessPerChallenge darkMode={darkMode} />
            <SuccessSubmissionsPerUsers darkMode={darkMode} />
            <LastWeekSubmissions darkMode={darkMode} />
        </div>
    )
}

export default DashBoard;
