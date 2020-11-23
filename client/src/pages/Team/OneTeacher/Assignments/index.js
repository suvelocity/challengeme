import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import network from '../../../../services/network';
import ChallengeCard from '../../../../components/ChallengeCard';
import AddAssignment from '../../../../components/Modals/AddAssignment';

function Assignments({ darkMode }) {
    const { id } = useParams();

    const [allAssignments, setAllAssignments] = useState()
    const [openNewAssignmentModal, setOpenNewAssignmentModal] = useState(false);

    const getAllAssignments = async () => {
        try {
            const { data: assignments } = await network.get(`/api/v1/assignments/${id}`)
            setAllAssignments(assignments)
        } catch (error) {
            console.error(error);
        }
    }

    const removeAssignment = async (challengeId) => {
        try {
            await network.delete(`/api/v1/assignments/${id}?challengeId=${challengeId}`)
            getAllAssignments()
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getAllAssignments();
        // eslint-disable-next-line
    }, [])

    return (
        <div >
            <br /><br /><br /><br />
            <AddAssignment
                open={openNewAssignmentModal}
                setOpen={setOpenNewAssignmentModal}
                getAllAssignments={getAllAssignments}
                teamId={id}
            />
            <h1>This Assignments Teacher For Team{' '}{id}{' '}Page</h1>
            <Button onClick={() => setOpenNewAssignmentModal(true)} >
                Add New Assignment
            </Button>
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
                        <Button onClick={() => removeAssignment(challenge.Challenge.id)} >
                            Remove Assignment
            </Button>
                    </div>
                ))) : <h1>Not Found</h1>}
        </div>
    )
}

export default Assignments;
