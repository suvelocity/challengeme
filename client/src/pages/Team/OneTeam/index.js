import React, { useState, useEffect, } from 'react';
import mixpanel from 'mixpanel-browser';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useParams, Link } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';
import NotFound from '../../NotFound';
import Cookies from 'js-cookie';
import network from '../../../services/network';


const useStyles = makeStyles(() => ({

}));

function OneTeamPage({ darkMode }) {
    const classes = useStyles();
    const { id } = useParams();
    const [isAllowed, setIsAllowed] = useState()
    const [loading, setLoading] = useState(true)



    useEffect(() => {

        (async () => {
            try {
                const { data: allowed } = await network.get(`/api/v1/teams/check-user-teams-permission/${id}`)
                setIsAllowed(allowed)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.error(error);
            }
        })()
    }, []);


    return !loading ?
        isAllowed ? (
            <div style={{ overflowY: 'auto', height: '100vh', width: '100%' }}>
                <br /><br /><br /><br />
                <h1>This Team {id} Page</h1>
                <Link to="/teams/myTeams">
                    <Button
                        className={classes.teamLandingButton}
                        style={{ minWidth: 150 }}
                        variant="contained"
                        color="default"
                    >
                        My Teams
          </Button>
                </Link>
            </div>
        ) : (
                <NotFound />
            ) : <Loading darkMode={darkMode} />
}

export default OneTeamPage;
