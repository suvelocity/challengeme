import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Charts from "./charts/Charts";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
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


function TeamStatistics() {
  const classes = useStyles();
  const imageStyle = { backgroundColor: "lightgray" };
  const [topTeams, setTopTeams] = useState(null);
  const [teamsTopUser, setTeamsTopUser] = useState(null);
  const [teamsLastWeekSub, setTeamsLastWeekSub] = useState(null);
  const [loading, setLoading] = useState(true);
  const darkMode = React.useContext(ThemeApi).darkTheme

  const getInfo = () => {
    axios
      .get(`/api/v1/statistics/teams/top-user`)
      .then((r) => r.data)
      .then((r) => {
        console.log(r["Submissions.userSuccessSubmission"]);
        setTeamsTopUser(r);
        setLoading(false);
      });
    axios
      .get('/api/v1/statistics/teams/last-week-submissions')
      .then((r) => r.data)
      .then((r) => {
        setTeamsLastWeekSub(r);
        setLoading(false);
      });
    axios
      .get(`/api/v1/statistics/teams/top`)
      .then((r) => r.data)
      .then((r) => {
        console.log(r);
        setTopTeams(r);
        setLoading(false);
      });
  };

  useEffect(() => {
    console.log("effect");
    getInfo()
  }, [])

  const lastWeekTeamsSubmissions = {
    labels: teamsLastWeekSub && teamsLastWeekSub.map(index => index), // array of values for x axis (strings)
    title: "Users top submissions by challenges type", // title for the chart
    rawData: [
      {
        label: "Amount submissions", // name of the line (one or two words)
        backgroundColor: "green", //raw color
        borderColor: "green", //use the same as background color
        fill: false, // change the line chart
        data: teamsLastWeekSub && [...teamsLastWeekSub.map(index => index), 0], // array of values for Y axis (numbers)
      },
      // you can add as many object as you wand, each one will a different line with different color
    ],
  };

  const teamData = {
    labels: topTeams && topTeams.map(team => team.name), // array of values for x axis (strings)
    title: "Top Teams", // title for the chart
    rawData: [
      {
        label: "Submitions", // name of the line (one or two words)
        backgroundColor: ['red', 'blue' , 'green' , 'yellow' , 'purple' , 'black' , 'pink' , 'gray'], //raw color
        borderColor: "cyan", //use the same as background color
        fill: false, // change the line chart
        data: topTeams && [...topTeams.map(team => team["Users.Submissions.teamSuccessSubmissions"]), 0], // array of values for Y axis (numbers)
      },
      // you can add as many object as you wand, each one will a different line with different color
    ],
  };
  const topUserInTeam = {
    labels: teamsTopUser && teamsTopUser.map((index) => index.firstName + " " + index.lastName), // array of values for x axis (strings)
    title: "Top User in the team",
    rawData: [
      {
        label: "success submissions",
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
        fill: false,
        data: teamsTopUser && [...teamsTopUser.map((index) => index["Submissions.userSuccessSubmission"]), 0], // array of values for Y axis (numbers)
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
          id="firstChart"
          className={classes.div}
          style={{ gridArea: "headChart"}}
        >
          <Charts
            name="lastWeekSubOfTeam"
            width={"400px"}
            height={"200px"}
            chart={[0, 2]}
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
          className={classes.div}
          style={{ gridArea: "topChart"}}
        >
          <Charts
            name="TopUserOfTheTeam"
            width={"450px"}
            height={"70px"}
            chart={[0, 2]}
            data={topUserInTeam}
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
          style={{ gridArea: "bottomChart"}}
        >
          <Charts
            name="TopOfTheTeams"
            width={"450px"}
            height={"70px"}
            chart={[0, 2]}
            data={teamData}
          />
        </div>
      )}
    </div>
  {/* </div> */}
  </div>
);
}


export default TeamStatistics;
