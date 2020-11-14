import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useParams, Link } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';
import NotFound from '../../NotFound';
import TeacherArea from './TeacherArea';
import network from '../../../services/network';

const useStyles = makeStyles(() => ({

}));

function OneTeamPage({ darkMode }) {
  const classes = useStyles();
  const { id } = useParams();
  const [teamMembers, setTeamMembers] = useState();
  const [loading, setLoading] = useState(true);
  const [showTeacherPage, setShowTeacherPage] = useState(false);

  const [permission, setPermission] = useState();

  useEffect(() => {
    (async () => {
      try {
        const { data: members } = await network.get(`/api/v1/teams/team-page/${id}`);
        setTeamMembers(members[0]);
        setPermission(members[1].permission);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    })();
  }, []);

  return !loading
    ? teamMembers ? (
      <div style={{ overflowY: 'auto', height: '100vh', width: '100%' }}>
        <br />
        <br />
        <br />
        <br />
        <h1>
          This Team
          {id}
          {' '}
          Page
        </h1>
        {permission === 'teacher'
          && (
            <Button
              variant="contained"
              color="default"
              onClick={() => setShowTeacherPage((prev) => !prev)}
            >
              {!showTeacherPage ? 'Teacher Area' : 'User Area'}
            </Button>
          )}
        {showTeacherPage ? <TeacherArea teamId={id} />

          : (
            <ul>
              {teamMembers.Users.map((user) => <li>{user.userName}</li>)}
            </ul>
          )}
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
      ) : <Loading darkMode={darkMode} />;
}

export default OneTeamPage;
