import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import './Admin.css';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  adminButton: {
    width: '300px',
    padding: '5px',
    margin: '10px',
  },
}));

const AdminLanding = () => {
  const classes = useStyles();

  return (
    <div className="admin-page">
      <div className="admin-landing-page">
        <h1>This is Admin page</h1>
        <Button className={classes.adminButton} variant="contained" color="primary">
          <Link to="/admin/SubmissionsByChallenges">Submissions By Challenges</Link>
        </Button>
        <Button className={classes.adminButton} variant="contained" color="secondary">
          <Link to="/admin/SubmissionsByUsers">Submissions By Users</Link>
        </Button>
        <Button className={classes.adminButton} variant="contained">
          {' '}
          <Link to="/admin/ChallengesManagement">Challenges Management</Link>
        </Button>

        <Button className={classes.adminButton} variant="contained" color="secondary">
          <Link to="/admin/UsersControl">Users Control</Link>
        </Button>
        <Button className={classes.adminButton} variant="contained" color="primary">
          <Link to="/admin/GithhubTokens">Githhub Tokens</Link>
        </Button>
      </div>
    </div>
  );
};

export default AdminLanding;
