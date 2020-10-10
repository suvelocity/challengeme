import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Charts from "./charts/Charts";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
  grid: {
    display: "grid",
    gridGap: "20px",
    textAlign: "center",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "lightblue",
    padding: "10px",
    height: "inherit",
    width: "inherit",
    gridTemplate: `
      'headChart topChart' 300px`,
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
  const [loading, setLoading] = useState(true);

  const imageStyle = { backgroundColor: "lightgray" };
  const [topUserData, setTopUserData] = useState([]);
  const [lastWeakSubmissions, setLastWeakSubmissions] = useState([]);

  // const teamData = {
  //   labels: topTeamsData && topTeamsData.map(team => team.name), // array of values for x axis (strings)
  //   title: "Top Teams", // title for the chart
  //   rawData: [
  //     {
  //       label: "Submitions", // name of the line (one or two words)
  //       backgroundColor: ['red', 'blue' , 'green' , 'yellow' , 'purple' , 'black' , 'pink' , 'gray'], //raw color
  //       borderColor: "cyan", //use the same as background color
  //       fill: false, // change the line chart
  //       data: topTeamsData && [...topTeamsData.map(team => team["Users.Submissions.teamSuccessSubmissions"]), 0], // array of values for Y axis (numbers)
  //     },
  //     // you can add as many object as you wand, each one will a different line with different color
  //   ],
  // };

  useEffect(() => {
    fetchTopUserData();
    fetchLastWeakData();
  }, []);

  const fetchTopUserData = async () => {
    const { data } = await axios.get("/api/v1/statistics/teams/top-user");
    setTopUserData(data);
    setLoading(false);
  }
    // console.log(usersInfo[0].User.userName)
    const fetchLastWeakData = async () => {

    const { data } = await axios.get("/api/v1/statistics/teams/last-week-submissions");
    console.log(data);
    setLastWeakSubmissions(data);
    setLoading(false);
    // console.log(usersInfo[0].User.userName)
  };

  console.log(lastWeakSubmissions);

  return (
    <div className={classes.main}>
      <div className={classes.grid}>
        {/* {loading ? (
          <div className={classes.root}>
            <CircularProgress />
          </div>
        ) : (
          <div
            className={classes.div}
            style={{ gridArea: "bottomChart", ...imageStyle }}
          >
            <Charts
              width={"450px"}
              height={"70px"}
              chart={[0, 1]}
              data={teamData}
            />
          </div>
        )} */}
        {loading ? (
          <div className={classes.root}>
            <CircularProgress />
          </div>
        ) : (
          <div
            id="SubmissionTotalChart"
            className={classes.div}
            style={{ gridArea: "headChart" }}
          >
            Team Leader
            <br />
            <span
              className={classes.span}
            >{`${topUserData[0]["firstName"]} ${topUserData[0]["lastName"]}  ${topUserData[0]["Submissions.userSuccessSubmission"]}`}</span>
          </div>
        )}
        {/* {loading ? (
          <div className={classes.root}>
            <CircularProgress />
          </div>
        ) : (
          <div
            id="SubmissionTotalChart"
            className={classes.div}
            style={{ gridArea: "headChart" }}
          >
            Last Weak Submissions
            <br />
            <span
              className={classes.span}
            >{lastWeakSubmissions[0]["teamSubmissions"]}</span>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default TeamStatistics;
