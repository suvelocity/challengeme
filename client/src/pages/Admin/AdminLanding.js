import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonGroup } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const AdminLanding = () => (
  <div style={{ paddingTop: '50px', textAlign: 'center' }}>
    <h1>This is Admin page</h1>
    <ButtonGroup>

      <Button variant="contained" color="primary">
        <Link to="/admin/SubmissionsByChallenges">
          Submissions By Challenges
        </Link>
      </Button>
      <Button variant="contained" color="secondary">
        <Link to="/admin/SubmissionsByUsers">
          Submissions By Users
        </Link>
      </Button>
      <Button variant="contained">
        {' '}
        <Link to="/admin/ChallengesManagement">
          Challenges Management
        </Link>
      </Button>

      <Button variant="contained" color="secondary">
        <Link to="/admin/UsersControl">
          Users Control
        </Link>
      </Button>
      <Button variant="contained" color="primary">
        <Link to="/admin/GithhubTokens">
          Githhub Tokens
        </Link>
      </Button>
    </ButtonGroup>
  </div>
);

export default AdminLanding;
