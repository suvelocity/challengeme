import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { useParams, Link } from 'react-router-dom';
import Loading from '../../../../components/Loading';
import NotFound from '../../../NotFound';
import network from '../../../../services/network';
import SecondHeader from '../../../../components/Header/SecondHeader';



function OneTeamPage({ darkMode }) {
  const { id } = useParams();
  const [teamMembers, setTeamMembers] = useState();
  const [loading, setLoading] = useState(true);

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
  }, [id]);

  const paths = [
    { name: "Team Information", URL: `/teams/${id}` },
    { name: "Team Tasks", URL: `/teams/tasks/${id}` }
  ];

  return !loading
    ? teamMembers ? (
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
        </h1>
        {permission === 'teacher'
          && (
            <Link to={`/teams/teacher/${id}`}>
              <Button
                variant="contained"
                color="default"
              >
                Teacher Area
              </Button>
            </Link>
          )}
        <h2>My Team Friends:</h2>
        <ul>
          {teamMembers.Users.map((user) => <li>{user.userName}</li>)}
        </ul>

      </div>
    ) : (
        <NotFound />
      ) : <Loading darkMode={darkMode} />;
}

export default OneTeamPage;
