import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Charts from "./charts/Charts";
import axios from 'axios';
import ThemeApi from "../services/Theme"
import '../pages/Home.css'
import CircularProgress from "@material-ui/core/CircularProgress";
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



function UserStatistics() {
    const classes = useStyles();
    const imageStyle = { backgroundColor: "lightgray" };
    const [topUsersSuccess, setTopUserssuccess] = useState(null);
    const [topUsers, setTopUsers] = useState(null);
    const [userSubByType, setUserSubByType] = useState(null);
    const [userUnsolvedChallenges, setUserUnsolvedChallenges] = useState(null);
    const [loading, setLoading] = useState(true);
    const darkMode = React.useContext(ThemeApi).darkTheme

      const getInfo = () => {
        // axios
        //   .get(`/api/v1/statistics/users/user-success`)
        //   .then((r) => r.data)
        //   .then((r) => {
        //     setTopUserssuccess(r);
        //     setLoading(false);
        //   });
        axios
          .get('/api/v1/statistics/users/top-users')
          .then((r) => r.data)
          .then((r) => {
            setTopUsers(r);
            setLoading(false);
          });
        axios
          .get(`/api/v1/statistics/users/sub-by-type`)
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
        labels: userSubByType && userSubByType.map(index => index.Challenge.type), // array of values for x axis (strings)
        title: "Users top submissions by challenges type", // title for the chart
        rawData: [
          {
            label: "Amount submissions", // name of the line (one or two words)
            backgroundColor: "green", //raw color
            borderColor: "green", //use the same as background color
            fill: false, // change the line chart
            data: userSubByType && [...userSubByType.map(index => index.Challenge.CountByType), 0], // array of values for Y axis (numbers)
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
            backgroundColor: ['red', 'blue' , 'green' , 'yellow' , 'purple' , 'black' , 'pink' , 'gray'], //raw color
            borderColor: "cyan", //use the same as background color
            fill: false, // change the line chart
            data: topUsers && [...topUsers.map(index => index.countSub), 0], // array of values for Y axis (numbers)
          },
          // you can add as many object as you wand, each one will a different line with different color
        ],
      };
      // const topChallengeByReview = {
      //   labels: challengeByReview && challengeByReview.map((challenge) => challenge.Challenge.name), // array of values for x axis (strings)
      //   title: "Top Challenges (by review)",
      //   rawData: [
      //     {
      //       label: "submitions",
      //       backgroundColor: [
      //         "red",
      //         "blue",
      //         "green",
      //         "yellow",
      //         "purple",
      //         "black",
      //         "pink",
      //         "gray",
      //       ],
      //       borderColor: "black",
      //       fill: false,
      //       data: challengeByReview && [...challengeByReview.map((challenge) => challenge.ratingAVG), 0], // array of values for Y axis (numbers)
      //     },
      //   ],
      // };
    
      // const challengesTypeData = {
      //   labels: challengesType && challengesType.map((e) => e.category), // array of values for x axis (strings)
      //   title: "Challenges by Type",
      //   rawData: [
      //     {
      //       label: "types",
      //       backgroundColor: [
      //         "red",
      //         "blue",
      //         "green",
      //         "yellow",
      //         "purple",
      //         "black",
      //         "pink",
      //         "gray",
      //       ],
      //       borderColor: "black",
      //       fill: false,
      //       data: challengesType && [...challengesType.map((e) => e.countCategory), 0], // array of values for Y axis (numbers)
      //     },
      //   ],
      // };

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
            style={{ gridArea: "headChart", ...imageStyle }}
          >
            <Charts
              name="topChallenges"
              width={"400px"}
              height={"200px"}
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
            className={classes.div}
            style={{ gridArea: "topChart", ...imageStyle }}
          >
            <Charts
              name="TopUsers"
              width={"450px"}
              height={"70px"}
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
            className={classes.div}
            style={{ gridArea: "bottomChart", ...imageStyle }}
          >
            <Charts
              name="topUsers"
              width={"450px"}
              height={"70px"}
              chart={[0, 2]}
              data={DataTopUsers}
            />
          </div>
        )}
      </div>
    {/* </div> */}
    </div>
  );
}

export default UserStatistics;
