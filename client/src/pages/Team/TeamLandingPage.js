import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TeamLandingPage.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import mixpanel from 'mixpanel-browser';
import Cookies from 'js-cookie';

const useStyles = makeStyles(() => ({
  teamLandingButton: {
    margin: '15px',
  },
}));
const TeamLandingPage = () => {
  const classes = useStyles();

  useEffect(() => {
    const user = Cookies.get('userName');
    mixpanel.track('User On Team Area', { User: `${user}` });
  }, []);

  return (
    <div className="team-landing-page">
      <h1>This is Your Team Area</h1>
      <div className="buttons-team-landing-page">
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
    </div>
  );
};

export default TeamLandingPage;
