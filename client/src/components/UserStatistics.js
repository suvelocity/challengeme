import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Charts from "./charts/Charts";
import ThemeApi from "../services/Theme"
import CircularProgress from "@material-ui/core/CircularProgress";
import clsx from 'clsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import WorkIcon from '@material-ui/icons/Work';
import network from '../services/network'
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
    'header header' 5vh
    'sideList sideList' 45vh
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



function UserStatistics() {
    const classes = useStyles();
    const [topUsers, setTopUsers] = useState([[],{User: {userName: "user"}}]);
    const [userSubByType, setUserSubByType] = useState(null);
    const [userSubByDate, setUserSubByDate] = useState(null);
    const [userUnsolvedChallenges, setUserUnsolvedChallenges] = useState([]);
    const [loading, setLoading] = useState(true);
    const darkMode = React.useContext(ThemeApi).darkTheme

      const getInfo = () => {
        network
          .get(`/api/v1/statistics/users/unsolved-challenges`)
          .then((r) => r.data)
          .then((r) => {
            setUserUnsolvedChallenges(r);
            setLoading(false);
          }).catch(err => console.error(err));
        network
          .get('/api/v1/statistics/users/user-success')
          .then((r) => r.data)
          .then((r) => {
            setTopUsers(r);
            setLoading(false);
          }).catch(err => console.error(err));;
        network
          .get(`/api/v1/statistics/users/sub-by-type`)
          .then((r) => r.data)
          .then((r) => {
            setUserSubByType(r);
            setLoading(false);
          }).catch(err => console.error(err));;
          network
          .get(`/api/v1/statistics/users/sub-by-date`)
          .then((r) => r.data)
          .then((r) => {
              setUserSubByDate(r);
            
            setLoading(false);
          }).catch(err => console.error(err));;
      };
     
      useEffect(() => {
        getInfo()
      }, [])
      if (userSubByDate){

        console.log(userSubByDate);
      }

      const usersSubmissionByDate = {
        labels: userSubByDate && userSubByDate.map(index => index.createdAt.split('T')[0]), // array of values for x axis (strings)
        title: "Your Submissions by the last 5 days", // title for the chart
        rawData: [
          {
            label: "Date of submission", // name of the line (one or two words)
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
            data: userSubByDate && [...userSubByDate.map(index => index.CountSubByDate), 0], // array of values for Y axis (numbers)
          },
          // you can add as many object as you wand, each one will a different line with different color
        ],
      };

      const usersSubmissionType = {
        labels: userSubByType && userSubByType.map(index => index.Challenge.type), // array of values for x axis (strings)
        title: "Your top submissions by challenges type", // title for the chart
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
            data: userSubByType && [...userSubByType.map(index => index.Challenge.CountByType), 0], // array of values for Y axis (numbers)
          },
          // you can add as many object as you wand, each one will a different line with different color
        ],
      };
    // console.log(topUsers)
      const DataTopUsers = {
        labels: ['Success', 'Fail'], // array of values for x axis (strings)
        title:`Your submissions`, // title for the chart
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
            data: Array.isArray(topUsers) && [...topUsers.map(index => index.CountByUserID), 0],
          },
        ],
      };

    return (
      <div className={clsx(classes.main, darkMode?"dark-home-page":"light-home-page")}>
      <div className={classes.grid}>
      {loading ? (
         <div className={classes.root}>
         <CircularProgress />
       </div>
     ) : (
      <h1 style={{gridArea: "header"}}>{`${topUsers[1]} Statistics`}</h1>
     )}
        {loading ? (
          <div className={classes.root}>
            <CircularProgress />
          </div>
        ) : (
          <div
          className={classes.div}
          style={{ gridArea: "sideList"}}
        >
          <List className={clsx(classes.listRoot, darkMode? classes.divDark: classes.divLight)} id="topUsersByTeam">
            <h3>Your Unsolved Challenges</h3>
            {userUnsolvedChallenges.map((challenge) => 
              <ListItem>
                <ListItemAvatar>
                <Avatar>
                <WorkIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={challenge.name} secondary={`${challenge.type} - ${challenge.repositoryName}`} />
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
            style={{ gridArea: "headChart"}}
          >
            <Charts
              name="UserSubmissionsByDate"
              width={"25vw"}
              height={"25vh"}
              chart={[0, 1, 2]}
              data={usersSubmissionByDate}
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
            style={{ gridArea: "bottomChart"}}
          >
            <Charts
              name="topUsersBySuccess"
              width={"25vw"}
              height={"25vh"}
              chart={[0, 2]}
              data={DataTopUsers}
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
              name="UserTopSubmissionsByType"
              width={"25vw"}
              height={"25vh"}
              chart={[0, 2]}
              data={usersSubmissionType}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default UserStatistics;
