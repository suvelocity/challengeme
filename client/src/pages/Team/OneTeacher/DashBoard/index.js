import React,{ lazy} from 'react';
import { useParams } from 'react-router-dom';

const SuccessSubmissionsPerUsers = lazy(() => import("./Charts/SuccessSubmissionsPerUsers"));
const LastWeekSubmissions = lazy(() => import("./Charts/LastWeekSubmissions"));
const SuccessPerChallenge = lazy(() => import("./Charts/SuccessPerChallenge"));

function DashBoard({ darkMode }) {
    const { id } = useParams();

    return (
        <div >
            <br /><br /><br /><br />
            <h1>This DashBoard Teacher For Team{' '}{id}{' '}Page</h1>
            <SuccessPerChallenge darkMode={darkMode} />
            <SuccessSubmissionsPerUsers darkMode={darkMode} />
            <LastWeekSubmissions darkMode={darkMode} />
        </div>
    )
}

export default DashBoard;
