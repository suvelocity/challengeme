import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
    minWidth: 275,
    maxWidth: 375,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function TeamCard({ team }) {
  const classes = useStyles();
  return (
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
        <Typography className={classes.pos} color="textSecondary">
          what do i print here
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/teams/${team.id}`}>
          <Button size="small">Go To Team Page</Button>
        </Link>
      </CardActions>
    </Card>
  );
}

function MyTeams() {
  const [teamData, setTeamData] = useState();

  const fetchUserTeam = async () => {
    try {
      const { data: userTeam } = await network.get(
        '/api/v1/teams/all-teams-by-user',
      );
      setTeamData(userTeam.Teams);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserTeam();
  }, []);

  return (
    <div className="my-teams">
      <h1 className="my-teams-title">This is My Teams</h1>
      <div className="my-teams-container">
        {teamData
          && teamData.map((team) => <TeamCard team={team} />)}
      </div>
    </div>
  );
}

export default MyTeams;
