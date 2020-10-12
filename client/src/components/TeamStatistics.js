import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Charts from "./charts/Charts";
import CircularProgress from "@material-ui/core/CircularProgress";
import network from '../services/network'
import ThemeApi from "../services/Theme"
import clsx from 'clsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import WorkIcon from '@material-ui/icons/Work';
import './statistics.css'

const useStyles = makeStyles((theme) => ({
  listRoot: {
    width: '100%',
    height: '100%',
    maxWidth: 360,
  },
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
  grid: {
    display: "grid",
    gridGap: "40px",
    textAlign: "center",
    alignContent: "center",
    justifyContent: "center",
    padding: "10px",
    height: "inherit",
    width: "inherit",
    gridTemplate: `
    'header header ' 5vh
      'sideList sideList ' 45vh 
      'headChart headChart' 45vh
      'bottomChart bottomChart' 45vh
      'bottomRightChart bottomRightChart' 45vh`,
      '@media (min-width:1000px)' : {
        gridTemplate: `
        'header header ' 5vh
        'headChart sideList ' 45vh 
        'bottomChart bottomRightChart' 45vh`,
      },
  },
  divLight: {
    textAlign: "center",
    alignContent: "center",
    padding: "20px",
    fontWeight: "bold",
    backgroundImage: "radial-gradient(circle, #9C8249, #F5D690)",
    boxShadow: "15px 15px 0px #AD8C40",
  },
  divDark: {
    textAlign: "center",
    alignContent: "center",
    padding: "20px",
    fontWeight: "bold",
    backgroundImage: "radial-gradient(circle, #DCE5E8, #53676E)",
    boxShadow: "15px 15px 0px #696969",
  },
  main: {
    marginTop: "4rem",
    display: "grid",
    padding: "10px",
    alignContent: "center",
    justifyItems: "center",
    alignItems: "center",
    gridTemplateColumns: "auto",
    width: "100%",
  },
  span: {
    fontSize: "30px",
  },
}));


function TeamStatistics() {
  const classes = useStyles();
  const [topTeams, setTopTeams] = useState(null);
  const [teamsTopUser, setTeamsTopUser] = useState([]);
  const [successChallenges, setSuccessChallenges] = useState([]);
  const [teamsLastWeekSub, setTeamsLastWeekSub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [teamName, setTeamName] = useState()
  const darkMode = React.useContext(ThemeApi).darkTheme

  const getInfo = () => {
    network
      .get(`/api/v1/statistics/teams/top-user`)
      .then((r) => r.data)
      .then((r) => {
        setTeamsTopUser(r[0]);
        setTeamName(r[1])
        setLoading(false);
      }).catch(err => console.error(err));;
    network
      .get('/api/v1/statistics/teams/last-week-submissions')
      .then((r) => r.data)
      .then((r) => {
        setTeamsLastWeekSub(r);
        setLoading(false);
      }).catch(err => console.error(err));;
    network
      .get(`/api/v1/statistics/teams/team-submissions`)
      .then((r) => r.data)
      .then((r) => {
        setTopTeams(r);
        setLoading(false);
      }).catch(err => console.error(err));;
      network
      .get(`/api/v1/statistics/teams/success-challenge`)
      .then((r) => r.data)
      .then((r) => {
        console.log(r);
        setSuccessChallenges(r);
        setLoading(false);
      }).catch(err => console.error(err));;
  };

  useEffect(() => {
    getInfo()
}, [])

  const lastWeekTeamsSubmissions = {
    labels: teamsLastWeekSub && teamsLastWeekSub.map(index => index.createdAt.split('T')[0]), // array of values for x axis (strings)
    title: "Teams last week submissions", // title for the chart
    rawData: [
      {
        label: "Amount submissions", // name of the line (one or two words)
        backgroundColor: [
          "#e65a78",
          "#6698e8",
          "#6aa870",
          "#9e8662",
          "#b287c9",
          "#787878",
          "#afeddb",
          "#f79628"
        ],
        borderColor: "black",
        fill: false, // change the line chart
        data: teamsLastWeekSub && [...teamsLastWeekSub.map(index => index.dateSubmissions), 0], // array of values for Y axis (numbers)
      },
      // you can add as many object as you wand, each one will a different line with different color
    ],
  };

  const teamData = {
    labels: ['Success', 'Fail', 'Pending'], // array of values for x axis (strings)
    title: topTeams && `Status from total ${topTeams.all} submissions`, // title for the chart
    rawData: [
      {
        label: "Submitions", // name of the line (one or two words)
        backgroundColor: [
          "#e65a78",
          "#6698e8",
          "#6aa870",
          "#9e8662",
          "#b287c9",
          "#787878",
          "#afeddb",
          "#f79628"
        ],
        borderColor: "black",
        fill: false, // change the line chart
        data: topTeams && [ topTeams.success, topTeams.fail, topTeams.pending, 0], // array of values for Y axis (numbers)
      },
      // you can add as many object as you wand, each one will a different line with different color
    ],
  };

  const successChallengesOfTheTeam = {
    labels: successChallenges && [...successChallenges.map(index => index.Challenge.name)], // array of values for x axis (strings)
    title: 'Top success challenges of the team', // title for the chart
    rawData: [
      {
        label: "Submitions", // name of the line (one or two words)
        backgroundColor: [
          "#e65a78",
          "#6698e8",
          "#6aa870",
          "#9e8662",
          "#b287c9",
          "#787878",
          "#afeddb",
          "#f79628"
        ],
        borderColor: "black",
        fill: false, // change the line chart
        data: successChallenges && [...successChallenges.map(index => index.challengeSuccesses), 0], // array of values for Y axis (numbers)
      },
      // you can add as many object as you wand, each one will a different line with different color
    ],
  };

  return (
    <div className={clsx(classes.main, darkMode?"dark-home-page":"light-home-page")}>
    <div className={classes.grid}>
    {loading ? 
    <div className={classes.root}>
      <CircularProgress />
    </div>
    : <h1 style={{gridArea: "header"}}>{`${teamName} Statistics`}</h1>
    }
      {loading ? (
        <div className={classes.root}>
          <CircularProgress />
        </div>
      ) : (
        <div
          id="firstChart"
          className={darkMode ? classes.divDark: classes.divLight}
          style={{ gridArea: "headChart"}}
        >
          <Charts
            name="lastWeekSubOfTeam"
            width={"25vw"}
            height={"25vh"}
            chart={[0, 1, 2]}
            data={lastWeekTeamsSubmissions}
          />
        </div>
      )}
      {loading ? (
        <div className={classes.root}>
          <CircularProgress />
        </div>
      ) : (
        <div
        id="firstChart"
        className={classes.div}
        style={{ gridArea: "sideList"}}
      >
        <List className={clsx(classes.listRoot, darkMode? classes.divDark: classes.divLight)}>
            <h3>Top Users by team</h3>
            {teamsTopUser.map((user) => 
              <ListItem>
                <ListItemAvatar>
                <Avatar>
                <WorkIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={`${user.firstName} - ${user.lastName}`} secondary={`Number of success: ${user["Submissions.userSuccessSubmission"]}`} />
              </ListItem>
            )}
          </List>
          </div>
      )}
      {loading ? (
        <div className={classes.root}>
          <CircularProgress />
        </div>
      ) : (
        <div
          className={darkMode ? classes.divDark: classes.divLight}
          style={{ gridArea: "bottomChart"}}
        >
          <Charts
            name="TopOfTheTeams"
            width={"25vw"}
            height={"25vh"}
            chart={[0, 2]}
            data={teamData}
          />
        </div>
      )}
      {loading ? (
        <div className={classes.root}>
          <CircularProgress />
        </div>
      ) : (
        <div
          className={darkMode ? classes.divDark: classes.divLight}
          style={{ gridArea: "bottomRightChart"}}
        >
          <Charts
            name="TopSuccessChallenges"
            width={"25vw"}
            height={"25vh"}
            chart={[0, 2]}
            data={successChallengesOfTheTeam}
          />
        </div>
      )}
    </div>
  </div>
);
}


export default TeamStatistics;
