import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import network from '../../../services/network';
import './MyTeams.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 575,
    maxWidth: 775,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  description: {
    marginBottom: 12,
  },
});

function TeamCard({ team }) {
  const classes = useStyles();

  const linkPath = team.UserTeam.permission === 'teacher' ? `/teams/teacher/${team.id}` : `/teams/${team.id}`

  return (
    <Link to={linkPath}>
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            this is my team
        </Typography>
          <Typography variant="h5" component="h2">
            {team.name}
          </Typography>
          <Typography className={classes.description} color="textSecondary">
            description
        </Typography>
          {team.UserTeam.permission === 'teacher' &&
            <Typography className={classes.description} color="textSecondary">
              As Teacher
          </Typography>}
        </CardContent>
      </Card>
    </Link>
  );
}

function MyTeams() {
  const [teamData, setTeamData] = useState();
  const Location = useHistory();
  const fetchUserTeam = async () => {
    try {
      const { data: userTeam } = await network.get(
        '/api/v1/teams/all-teams-by-user',
      );
      setTeamData(userTeam.Teams);
      console.log(userTeam.Teams);
      if (userTeam.Teams.length === 1) {
        Location.push(`/teams/${userTeam.Teams[0].id}`)
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchUserTeam();
  }, []);

  return (
    <div className="my-teams">
      <h1 className="my-teams-title">Teams Area</h1>
      <div className="my-teams-container">
        {teamData
          && teamData.map((team) => <TeamCard team={team} />)}
      </div>
    </div>
  );
}

export default MyTeams;
