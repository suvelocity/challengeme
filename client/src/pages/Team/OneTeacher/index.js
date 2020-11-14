import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useParams, Link } from 'react-router-dom';
import Loading from '../../../components/Loading';
import NotFound from '../../NotFound';
import network from '../../../services/network';

const useStyles = makeStyles(() => ({

}));

function OneTeamPage({ darkMode }) {
    const classes = useStyles();
    const { id } = useParams();
    const [teamMembers, setTeamMembers] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const { data: members } = await network.get(`/api/v1/teams/team-page/${id}`);
                setTeamMembers(members[0]);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error(error);
            }
        })();
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
                    {teamMembers.Users.map((user) => <li>{user.userName}</li>)}
                </ul>

            </div>
        ) : (
                <NotFound />
            ) : <Loading darkMode={darkMode} />;
}

export default OneTeamPage;
