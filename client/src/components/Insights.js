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
      'headChart headChart smallChart' 30vh 
      'headChart headChart sideChart' 30vh
      'leftChart rightChart sideChart' 30vh
      'byReview byReview perDay' 30vh
      'byReview byReview perDay' 30vh `,
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
      .get(`/api/v1/statistics/insights/challenges-category`)
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
    axios
      .get(`/api/v1/statistics/insights/challenges-by-reviews`)
      .then((r) => r.data)
      .then((r) => {
        setChallengeByReview(r);
        setLoading(false);
      });
    axios
      .get(`/api/v1/statistics/insights/sub-by-date`)
      .then((r) => r.data)
      .then((r) => {
        setSubByDate(r);
        setLoading(false);
      });
  };

useEffect(() => {
  getInfo()
}, [])

  const [challengesTop, setChallengesTop] = useState(null);
  const [challengesSuccess, setChallengesSuccess] = useState(null);
  const [challengesType, setChallengesType] = useState(null);
  const [subByDate, setSubByDate] = useState(null);
  const [challengeByReview, setChallengeByReview] = useState(null);
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
    title: "Top Challenges (most submissions)",
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
  const topChallengeByReview = {
    labels: challengeByReview && challengeByReview.map((challenge) => challenge.Challenge.name), // array of values for x axis (strings)
    title: "Top Challenges (by review)",
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
        data: challengeByReview && [...challengeByReview.map((challenge) => challenge.ratingAVG), 0], // array of values for Y axis (numbers)
      },
    ],
  };

  const challengesTypeData = {
    labels: challengesType && challengesType.map((e) => e.category), // array of values for x axis (strings)
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
        data: challengesType && [...challengesType.map((e) => e.countCategory), 0], // array of values for Y axis (numbers)
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

  const subByDateData = {
    labels: subByDate && subByDate.map((e) => e.createdAt.split("T")[0]), // array of values for x axis (strings)
    title: "Submissions per day",
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
        data: subByDate && [
          ...subByDate.map((e) => e.countByDay),
          0,
        ], // array of values for Y axis (numbers)
      },
    ],
  };

  console.log(subByDate);

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
          <div className={classes.div} style={{ gridArea: "byReview" }}>
            <Charts name="topByReview" width={"36vw"} height={"36vh"} chart={[0, 1]} data={topChallengeByReview} />
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
            name="challengesByTypeChart"
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
            name="challengesMostSubChart"
              width={"17vw"}
              height={"13vw"}
              chart={[2]}
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
            name="challengesMostSuccessChart"
              width={"13vw"}
              height={"16vh"}
              chart={[2]}
              data={challengesTypeData}
            />
          </div>
        )}
        {loading ? (
          <div className={classes.root}>
            <CircularProgress />
          </div>
        ) : (
          <div
            id="subByDate"
            className={classes.div}
            style={{ gridArea: "perDay" }}
          >
            <Charts
            name="subByDate"
              width={"36vw"}
              height={"36vh"}
              chart={[0,1]}
              data={subByDateData}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Insights;
