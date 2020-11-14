import React, { useState, useEffect, lazy } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useParams, Link } from 'react-router-dom';
import Loading from '../../../components/Loading';
import NotFound from '../../NotFound';
import network from '../../../services/network';

const TeamControl = lazy(() => import("./TeamControl"));
const SuccessSubmissions = lazy(() => import("./Charts/SuccessSubmissions"));


const useStyles = makeStyles(() => ({

}));

function OneTeamPage({ darkMode }) {
    const classes = useStyles();
    const { id } = useParams();
    const [teamMembers, setTeamMembers] = useState();
    const [loading, setLoading] = useState(true);

    const getDataOnTeam = async () => {
        try {
            const { data: members } = await network.get(`/api/v1/insights/teams/top-user/${id}`);
            console.log(members);
            setTeamMembers(members[0])
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    }

    useEffect(() => {
        getDataOnTeam()
    }, [id]);

    return !loading
        ? teamMembers ? (
            <div style={{ overflowY: 'auto', height: '100vh', width: '100%' }}>
                <br />
                <br />
                <br />
                <br />
                <h1>
                    This Teacher Area For Team
          {id}
                    {' '}
          Page
        </h1>
                <Link to="/teams">
                    <Button
                        className={classes.teamLandingButton}
                        style={{ minWidth: 150 }}
                        variant="contained"
                        color="default"
                    >
                        My Teams
          </Button>
                </Link>
                <Link to={`/teams/${id}`} >
                    <Button
                        variant="contained"
                        color="default"
                    >
                        Team Area
              </Button>
                </Link>
                <ul>
                    {teamMembers.map((user) => <li>{user.userName}</li>)}
                </ul>
                <TeamControl teamId={id} />
                <SuccessSubmissions members={teamMembers} />
            </div>
        ) : (
                <NotFound />
            ) : <Loading darkMode={darkMode} />;
}

export default OneTeamPage;
