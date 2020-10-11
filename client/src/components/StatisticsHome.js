import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Charts from "./charts/Charts";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from 'axios';
import ThemeApi from "../services/Theme"
import '../pages/Home.css'
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
  grid: {
    marginTop: "4rem",
    display: "grid",
    gridGap: "20px",
    textAlign: "center",
    alignContent: "center",
    justifyContent: "center",
    padding: "10px",
    height: "inherit",
    width: "inherit",
    gridTemplate: `
      'headChart topChart' 300px 
      'bottomChart bottomChart' 300px`,
  },
  div: {
    textAlign: "center",
    alignContent: "center",
    padding: "20px",
    fontWeight: "bold",
    backgroundColor: "lightgray",
    borderRadius: "20px",
    boxShadow: "6px 6px 12px black",
  },
  main: {
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



const teamData = {
  labels: ["January", "February", "March", "April", "May"], // array of values for x axis (strings)
  title: "Top Teams", // title for the chart
  rawData: [
    {
      label: "Team1", // name of the line (one or two words)
      backgroundColor: "red", //raw color
      borderColor: "red", //use the same as background color
      fill: false, // change the line chart
      data: [2, 5, 10, 17, 25], // array of values for Y axis (numbers)
    },
    {
      label: "Team2", // name of the line (one or two words)
      backgroundColor: "green", //raw color
      borderColor: "green", //use the same as background color
      fill: false, // change the line chart
      data: [5, 8, 15, 25, 31], // array of values for Y axis (numbers)
    },
    {
      label: "Team3", // name of the line (one or two words)
      backgroundColor: "blue", //raw color
      borderColor: "blue", //use the same as background color
      fill: false, // change the line chart
      data: [3, 9, 14, 22, 29], // array of values for Y axis (numbers)
    },
    {
      label: "Team4", // name of the line (one or two words)
      backgroundColor: "yellow", //raw color
      borderColor: "yellow", //use the same as background color
      fill: false, // change the line chart
      data: [1, 6, 7, 11, 13], // array of values for Y axis (numbers)
    },
    {
      label: "Team5", // name of the line (one or two words)
      backgroundColor: "black", //raw color
      borderColor: "black", //use the same as background color
      fill: false, // change the line chart
      data: [1, 5, 10, 16, 22], // array of values for Y axis (numbers)
    },
    // you can add as many object as you wand, each one will a different line with different color
  ],
};


function StatisticsHome() {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);

  const imageStyle = { backgroundColor: "lightgray" };
  const [topChallengesData, setTopChallengesData] = useState([]);
  const [topUsersData, setTopUsersData] = useState([]);
  const [topTeamsData, setTopTeamsData] = useState([]);
  const darkMode = React.useContext(ThemeApi).darkTheme

  const challengeData = {
    labels: topChallengesData && topChallengesData.map(index => index.Challenge.name), // array of values for x axis (strings)
    title: "Top Rated Challenges", // title for the chart
    rawData: [
      {
        label: "Submitions", // name of the line (one or two words)
        backgroundColor: ['red', 'blue' , 'green' , 'yellow' , 'purple' , 'black' , 'pink' , 'gray'], //raw color
        borderColor: "cyan", //use the same as background color
        fill: false, // change the line chart
        data: topChallengesData && [...topChallengesData.map(index => index.countSub), 0], // array of values for Y axis (numbers)
      },
      // you can add as many object as you wand, each one will a different line with different color
    ],
  };
  const userData = {
    labels: topUsersData && topUsersData.map(index => index.User ? index.User.userName : 'Itay'), // array of values for x axis (strings)
    title: "Top Users", // title for the chart
    rawData: [
      {
        label: "Submitions", // name of the line (one or two words)
        backgroundColor: ['red', 'blue' , 'green' , 'yellow' , 'purple' , 'black' , 'pink' , 'gray'], //raw color
        borderColor: "cyan", //use the same as background color
        fill: false, // change the line chart
        data: topUsersData && [...topUsersData.map(index => index.countSub), 0], // array of values for Y axis (numbers)
      },
      // you can add as many object as you wand, each one will a different line with different color
    ],
  };
  const teamData = {
    labels: topTeamsData && topTeamsData.map(team => team.name), // array of values for x axis (strings)
    title: "Top Teams", // title for the chart
    rawData: [
      {
        label: "Submitions", // name of the line (one or two words)
        backgroundColor: ['red', 'blue' , 'green' , 'yellow' , 'purple' , 'black' , 'pink' , 'gray'], //raw color
        borderColor: "cyan", //use the same as background color
        fill: false, // change the line chart
        data: topTeamsData && [...topTeamsData.map(team => team["Users.Submissions.teamSuccessSubmissions"]), 0], // array of values for Y axis (numbers)
      },
      // you can add as many object as you wand, each one will a different line with different color
    ],
  };


  useEffect(() => {
   getChallengesData();
   getTeamsData();
   getUsersData();
  }, []);

  const getChallengesData = async () => {
    const { data: challengeInfo } = await axios.get('/api/v1/statistics/insights/top-challenges');
    setTopChallengesData(challengeInfo);
    setLoading(false);
  };
  const getTeamsData = async () => {
    const { data: teamsInfo } = await axios.get('/api/v1/statistics/teams/top');
    setTopTeamsData(teamsInfo)
    setLoading(false);
  };
  const getUsersData = async () => {
    const { data: usersInfo } = await axios.get('/api/v1/statistics/users/top-users');
    setTopUsersData(usersInfo)
    setLoading(false);
    // console.log(usersInfo[0].User.userName)
  };
  
  return (
    // <div className ={darkMode?"dark-home-page":"light-home-page"}>
    <div className={clsx(classes.main, darkMode?"dark-home-page":"light-home-page")}>
      <div className={classes.grid}>
        {loading ? (
          <div className={classes.root}>
            <CircularProgress />
          </div>
        ) : (
          <div
            id="firstChart"
            className={classes.div}
            style={{ gridArea: "headChart", ...imageStyle }}
          >
            <Charts
              name="TopTeams"
              width={"400px"}
              height={"2000px"}
              chart={[0, 2]}
              data={challengeData}
            />
          </div>
        )}
        {loading ? (
          <div className={classes.root}>
            <CircularProgress />
          </div>
        ) : (
          <div
            className={classes.div}
            style={{ gridArea: "topChart", ...imageStyle }}
          >
            <Charts
              name="TopUsers"
              width={"450px"}
              height={"70px"}
              chart={[0, 2]}
              data={userData}
            />
          </div>
        )}
        {loading ? (
          <div className={classes.root}>
            <CircularProgress />
          </div>
        ) : (
          <div
            className={classes.div}
            style={{ gridArea: "bottomChart", ...imageStyle }}
          >
            <Charts
              name="topTeams"
              width={"450px"}
              height={"70px"}
              chart={[0, 1]}
              data={teamData}
            />
          </div>
        )}
      </div>
    {/* </div> */}
    </div>
  );
}

export default StatisticsHome;
