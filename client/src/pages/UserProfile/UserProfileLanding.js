import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './UserProfileLanding.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import mixpanel from 'mixpanel-browser';
import Cookies from 'js-cookie';

const useStyles = makeStyles(() => ({
  userProfileButton: {
    margin: '15px',
  },
}));
const UserProfileLanding = () => {
  const classes = useStyles();

  useEffect(() => {
    const user = Cookies.get('userName');
    mixpanel.track('User On Profile Area', { User: `${user}` });
  }, []);

  return (
    <div className="user-profile-landing">
      <h1>This is Your Profile Area</h1>
      <div className="buttons-user-profile-landing">
        <Link to="/profile/MyChallenges">
          <Button
            className={classes.userProfileButton}
            style={{ minWidth: 150 }}
            variant="contained"
            color="default"
          >
            My Challenges
          </Button>
        </Link>
        <Link to="/profile/info">
          <Button
            className={classes.infoButton}
            style={{ minWidth: 150 }}
            variant="contained"
            color="default"
          >
            Profile Info
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default UserProfileLanding;
