import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import network from '../../../../services/network';
import Loading from '../../../../components/Loading';
import NotFound from '../../../NotFound';
import SecondHeader from '../../../../components/Header/SecondHeader';
import ChallengeCard from '../../../../components/ChallengeCard';

function TeamTasks({ darkMode }) {

    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [allAssignments, setAllAssignments] = useState()

    const getAllAssignments = async () => {
        try {
            const { data: assignments } = await network.get(`/api/v1/assignments/${id}`)
            setAllAssignments(assignments)
            setLoading(false)
        } catch (error) {
            console.error(error);
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllAssignments();
        // eslint-disable-next-line
    }, [id]);

    const paths = [
        { name: "Team Information", URL: `/teams/${id}` },
        { name: "Team Tasks", URL: `/teams/tasks/${id}` }
    ];

    return !loading
        ? allAssignments ? (
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
                {allAssignments ? (
                    allAssignments.map((challenge) => (
                        <div style={{ display: 'flex' }}>
                            <ChallengeCard
                                key={challenge.Challenge.id}
                                challengeId={challenge.Challenge.id}
                                name={challenge.Challenge.name}
                                description={challenge.Challenge.description}
                                repositoryName={challenge.Challenge.repositoryName}
                                labels={challenge.Challenge.Labels}
                                rating={challenge.Challenge.averageRaiting}
                                submissions={challenge.Challenge.submissionsCount}
                                createdAt={challenge.Challenge.createdAt}
                            />
                        </div>
                    ))) : <h1>Not Found</h1>}
            </div>
        ) : (
                <NotFound />
            ) : <Loading darkMode={darkMode} />;
}

export default TeamTasks;
