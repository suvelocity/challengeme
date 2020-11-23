import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import network from '../../../../services/network';
import Loading from '../../../../components/Loading';
import NotFound from '../../../NotFound';
import SecondHeader from '../../../../components/Header/SecondHeader';

function TeamTasks({ darkMode }) {
    const { id } = useParams();
    const [teamTasks, setTeamTasks] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                // const { data: tasks } = await network.get(`/api/v1/teams/team-tasks/${id}`);
                setTeamTasks([{ name: 'david' }]);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error(error);
            }
        })();
    }, [id]);

    const paths = [
        { name: "Team Information", URL: `/teams/${id}` },
        { name: "Team Tasks", URL: `/teams/tasks/${id}` }
    ];

    return !loading
        ? teamTasks ? (
            <div style={{ overflowY: 'auto', height: '100vh', width: '100%' }}>
                <SecondHeader paths={paths} darkMode={darkMode} />
                <br />
                <br />
                <br />
                <br />
                <h1>
                    This Team
          {id}
                    {' '}
          Page
                  Tasks
        </h1>
            </div>
        ) : (
                <NotFound />
            ) : <Loading darkMode={darkMode} />;
}

export default TeamTasks;
