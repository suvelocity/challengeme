import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Charts from "./charts/Charts";
import axios from 'axios';
import ThemeApi from "../services/Theme"
import '../pages/Home.css'
import CircularProgress from "@material-ui/core/CircularProgress";
import clsx from 'clsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import WorkIcon from '@material-ui/icons/Work';

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
      'headChart sideList ' 45vh 
      'bottomChart sideList' 45vh`,
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
    const [topUsers, setTopUsers] = useState(null);
    const [userSubByType, setUserSubByType] = useState(null);
    const [userUnsolvedChallenges, setUserUnsolvedChallenges] = useState([]);
    const [loading, setLoading] = useState(true);
    const darkMode = React.useContext(ThemeApi).darkTheme

      const getInfo = () => {
        axios
          .get(`/api/v1/statistics/users/unsolved-challenges`)
          .then((r) => r.data)
          .then((r) => {
            setUserUnsolvedChallenges(r);
            setLoading(false);
          });
        axios
          .get('/api/v1/statistics/users/top-users')
          .then((r) => r.data)
          .then((r) => {
            setTopUsers(r);
            setLoading(false);
          });
        axios
          .get(`/api/v1/statistics/users/sub-by-category`)
          .then((r) => r.data)
          .then((r) => {
            console.log(r);
            setUserSubByType(r);
            setLoading(false);
          });
      };
     
      useEffect(() => {
        console.log("effect");
        getInfo()
      }, [])

      const usersSubmissionType = {
        labels: userSubByType && userSubByType.map(index => index.Challenge.category), // array of values for x axis (strings)
        title: "Users top submissions by challenges type", // title for the chart
        rawData: [
          {
            label: "Amount submissions", // name of the line (one or two words)
            backgroundColor: [
              "red",
              "blue",
              "green",
              "yellow",
              "purple",
              "black",
              "pink",
              "gray",
            ],
            borderColor: "black",
            fill: false, // change the line chart
            data: userSubByType && [...userSubByType.map(index => index.Challenge.CountByCategory), 0], // array of values for Y axis (numbers)
          },
          // you can add as many object as you wand, each one will a different line with different color
        ],
      };
    
      const DataTopUsers = {
        labels: topUsers && topUsers.map(index => index.User ? index.User.userName : 'Itay'), // array of values for x axis (strings)
        title: "Top Users", // title for the chart
        rawData: [
          {
            label: "Submitions", // name of the line (one or two words)
            backgroundColor: [
              "red",
              "blue",
              "green",
              "yellow",
              "purple",
              "black",
              "pink",
              "gray",
            ],
            borderColor: "black",
            fill: false, // change the line chart
            data: topUsers && [...topUsers.map(index => index.countSub), 0],
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
          <div
          className={classes.div}
          style={{ gridArea: "sideList"}}
        >
          <List className={clsx(classes.listRoot, darkMode? classes.divDark: classes.divLight)}>
            <h3>Unsolved Challenges</h3>
            {userUnsolvedChallenges.map((challenge) => 
              <ListItem>
                <ListItemAvatar>
                <Avatar>
                <WorkIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={challenge.name} secondary={`${challenge.category} - ${challenge.repositoryName}`} />
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
              name="TopUsers"
              width={"25vw"}
              height={"25vh"}
              chart={[0, 2]}
              data={usersSubmissionType}
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
              name="topUsers"
              width={"25vw"}
              height={"25vh"}
              chart={[0, 2]}
              data={DataTopUsers}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default UserStatistics;
