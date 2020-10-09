import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Charts from "./charts/Charts";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
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
      'headChart headChart smallChart' 22vh 
      'headChart headChart sideChart' 22vh
      'leftChart rightChart sideChart' 22vh / 18vw 18vw 40vw;`,
  },
  div: {
    textAlign: "center",
    alignContent: "center",
    padding: "20px",
    fontWeight: "bold",
    backgroundImage: "radial-gradient(circle, lightgray, #85DCB0)",
    boxShadow: "15px 15px 0px #379683",
  },
  main: {
    display: "grid",
    padding: "10px",
    alignContent: "center",
    justifyItems: "center",
    alignItems: "center",
    gridTemplateColumns: "auto",
    width: "100%",
    backgroundColor: "#41B3A3",
  },
  span: {
    fontSize: "30px",
  },
}));

function Insights() {
  const classes = useStyles();

  const getInfo = () => {
    axios
      .get(`/api/v1/statistics/insights/top-challenges`)
      .then((r) => r.data)
      .then((r) => {
        setChallengesTop(r);
        setLoading(false);
      });
    axios
      .get(`/api/v1/statistics/insights/challenges-type`)
      .then((r) => r.data)
      .then((r) => {
        setChallengesType(r);
        setLoading(false);
      });
    axios
      .get(`/api/v1/statistics/insights/top-success`)
      .then((r) => r.data)
      .then((r) => {
        setChallengesSuccess(r);
        setLoading(false);
      });
  };

useEffect(() => {
  getInfo()
}, [])

  const [challengesTop, setChallengesTop] = useState(null);
  const [challengesSuccess, setChallengesSuccess] = useState(null);
  const [challengesType, setChallengesType] = useState(null);
  const [loading, setLoading] = useState(true);

  const data = {
    labels: ["January", "February", "March", "April", "May"], // array of values for x axis (strings)
    title: "test", // title for the chart
    rawData: [
      //   {
      //     label: 'data1',// name of the line (one or two words)
      //     backgroundColor: 'red',//raw color
      //     borderColor: 'red',//use the same as background color
      //     fill: false, // change the line chart
      //     data: [65, 59, 80, 81, 56], // array of values for Y axis (numbers)
      //   },
      {
        label: "data1", // name of the line (one or two words)
        backgroundColor: "green", //raw color
        borderColor: "green", //use the same as background color
        fill: false, // change the line chart
        data: [44, 50, 86, 61, 56], // array of values for Y axis (numbers)
      },
      // you can add as many object as you wand, each one will a different line with different color
    ],
  };

  const topChallengesData = {
    labels: challengesTop && challengesTop.map((e) => e.Challenge.name), // array of values for x axis (strings)
    title: "Top Challenges (most submitions)",
    rawData: [
      {
        label: "submitions",
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
        data: challengesTop && [...challengesTop.map((e) => e.countSub), 0], // array of values for Y axis (numbers)
      },
    ],
  };

  const challengesTypeData = {
    labels: challengesType && challengesType.map((e) => e.type), // array of values for x axis (strings)
    title: "Challenges by Type",
    rawData: [
      {
        label: "types",
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
        data: challengesType && [...challengesType.map((e) => e.countType), 0], // array of values for Y axis (numbers)
      },
    ],
  };

  const challengesSuccessData = {
    labels: challengesSuccess && challengesSuccess.map((e) => e.Challenge.name), // array of values for x axis (strings)
    title: "Challenges With Most Success",
    rawData: [
      {
        label: "types",
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
        data: challengesSuccess && [
          ...challengesSuccess.map((e) => e.countSub),
          0,
        ], // array of values for Y axis (numbers)
      },
    ],
  };

  return (
    <div className={classes.main}>
      <div className={classes.grid}>
        {loading ? (
          <div className={classes.root}>
            <CircularProgress />
          </div>
        ) : (
          <div className={classes.div} style={{ gridArea: "headChart" }}>
            <Charts width={"36vw"} height={"36vh"} chart={[0, 1]} data={data} />
          </div>
        )}
        {loading ? (
          <div className={classes.root}>
            <CircularProgress />
          </div>
        ) : (
          <div
            id="SubmissionTotalChart"
            className={classes.div}
            style={{ gridArea: "smallChart" }}
          >
            total submition number
            <br />
            <span className={classes.span}>1349</span>
          </div>
        )}
        {loading ? (
          <div className={classes.root}>
            <CircularProgress />
          </div>
        ) : (
          <div
            id="challengesByTypeChart"
            className={classes.div}
            style={{ gridArea: "sideChart" }}
          >
            <Charts
              width={"38vw"}
              height={"38vh"}
              chart={[0, 2]}
              data={challengesSuccessData}
            />
          </div>
        )}
        {loading ? (
          <div className={classes.root}>
            <CircularProgress />
          </div>
        ) : (
          <div
            id="challengesMostSubChart"
            className={classes.div}
            style={{ gridArea: "leftChart" }}
          >
            <Charts
              width={"13vw"}
              height={"13vw"}
              chart={[0, 2]}
              data={topChallengesData}
            />
          </div>
        )}
        {loading ? (
          <div className={classes.root}>
            <CircularProgress />
          </div>
        ) : (
          <div
            id="challengesMostSuccessChart"
            className={classes.div}
            style={{ gridArea: "rightChart" }}
          >
            <Charts
              width={"13vw"}
              height={"13vh"}
              chart={[0, 2]}
              data={challengesTypeData}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Insights;
