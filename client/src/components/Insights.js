import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Charts from "./charts/Charts";
import CircularProgress from "@material-ui/core/CircularProgress";
import ThemeApi from "../services/Theme";
import network from '../services/network'
import './statistics.css'

const useStyles = makeStyles((matches) => ({
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
    'smallChart smallChart' 30vh 
    'sideChart sideChart' 30vh
    'leftChart rightChart' 30vh
    'byReview  byReview' 30vh
    'perDay  perDay' 30vh `,  
    '@media (min-width:1000px)': {gridTemplate: `
          'header header header' 5vh
          'smallChart smallChart smallChart' 30vh 
          'rightChart sideChart sideChart' 30vh
          'leftChart sideChart sideChart' 30vh
          'byReview byReview perDay' 30vh
          'byReview byReview perDay' 30vh `
    } 
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
    fontSize: "4vw",
  },
}));

function Insights() {
  const darkMode = React.useContext(ThemeApi).darkTheme;
  const classes = useStyles();

  const getInfo = () => {
    network
      .get(`/api/v1/statistics/insights/top-challenges`)
      .then((r) => r.data)
      .then((r) => {
        setChallengesTop(r);
        setLoading(false);
      }).catch(err => console.error(err));;
    network
      .get(`/api/v1/statistics/insights/challenges-type`)
      .then((r) => r.data)
      .then((r) => {
        setChallengesType(r);
        setLoading(false);
      }).catch(err => console.error(err));;
    network
      .get(`/api/v1/statistics/insights/top-success`)
      .then((r) => r.data)
      .then((r) => {
        setChallengesSuccess(r);
        setLoading(false);
      }).catch(err => console.error(err));;
    network
      .get(`/api/v1/statistics/insights/challenges-by-reviews`)
      .then((r) => r.data)
      .then((r) => {
        setChallengeByReview(r);
        setLoading(false);
      }).catch(err => console.error(err));;
    network
      .get(`/api/v1/statistics/insights/sub-by-date`)
      .then((r) => r.data)
      .then((r) => {
        setSubByDate(r);
        setLoading(false);
      }).catch(err => console.error(err));;
    network
      .get(`/api/v1/challenges`)
      .then((r) => r.data.length)
      .then((r) => {
        setNumOfChallenges(r);
        setLoading(false);
      }).catch(err => console.error(err));;
  };

  useEffect(() => {
    getInfo();
  }, []);

  const [challengesTop, setChallengesTop] = useState(null);
  const [challengesSuccess, setChallengesSuccess] = useState(null);
  const [challengesType, setChallengesType] = useState(null);
  const [subByDate, setSubByDate] = useState(null);
  const [challengeByReview, setChallengeByReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [numberOfChallenges, setNumOfChallenges] = useState(null);

  const topChallengesData = {
    // labels: challengesTop && challengesTop.map((e) => e.Challenge.name), // array of values for x axis (strings)
    labels: ['a','b','c'], // array of values for x axis (strings)
    title: "Top Challenges (most submissions)",
    rawData: [
      {
        label: "submitions",
        backgroundColor: [
          "#e65a78",
          "#6698e8",
          "#6aa870",
          "#9e8662",
          "#b287c9",
          "#787878",
          "#afeddb",
          "#f79628",
        ],
        borderColor: "black",
        fill: false,
        data: challengesTop && [...challengesTop.map((e) => e.countSub), 0], // array of values for Y axis (numbers)
      },
    ],
  };
  const topChallengeByReview = {
    labels:['a','b','c'],
      // challengeByReview && challengeByReview.map((challenge) => challenge.Challenge.name), // array of values for x axis (strings)
    title: "Top Challenges (by review)",
    rawData: [
      {
        label: "submitions",
        backgroundColor: [
          "#e65a78",
          "#6698e8",
          "#6aa870",
          "#9e8662",
          "#b287c9",
          "#787878",
          "#afeddb",
          "#f79628",
        ],
        borderColor: "black",
        fill: false,
        data: challengeByReview && [
          ...challengeByReview.map((challenge) => challenge.ratingAVG),
          0,
        ], // array of values for Y axis (numbers)
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
          "#e65a78",
          "#6698e8",
          "#6aa870",
          "#9e8662",
          "#b287c9",
          "#787878",
          "#afeddb",
          "#f79628",
        ],
        borderColor: "black",
        fill: false,
        data: challengesType && [...challengesType.map((e) => e.countType), 0], // array of values for Y axis (numbers)
      },
    ],
  };

  const challengesSuccessData = {
    // labels: challengesSuccess && challengesSuccess.map((e) => e.Challenge.name), // array of values for x axis (strings)
    labels: ['a','b','c'], // array of values for x axis (strings)
    title: "Challenges With Most Success",
    rawData: [
      {
        label: "types",
        backgroundColor: [
          "#e65a78",
          "#6698e8",
          "#6aa870",
          "#9e8662",
          "#b287c9",
          "#787878",
          "#afeddb",
          "#f79628",
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
          "#e65a78",
          "#6698e8",
          "#6aa870",
          "#9e8662",
          "#b287c9",
          "#787878",
          "#afeddb",
          "#f79628",
        ],
        borderColor: "black",
        fill: false,
        data: subByDate && [...subByDate.map((e) => e.countByDay), 0], // array of values for Y axis (numbers)
      },
    ],
  };

  return (
    <div className={classes.main}>
      <div className={classes.grid}>
        <h1 style={{gridArea: "header"}}>Insights</h1>
        {loading ? (
          <div className={classes.root}>
            <CircularProgress />
          </div>
        ) : (
          <div
            className={darkMode ? classes.divDark : classes.divLight}
            style={{ gridArea: "byReview" }}
          >
            <Charts
              name="topByReview"
              width={"36vw"}
              height={"36vh"}
              chart={[0, 2]}
              data={topChallengeByReview}
            />
          </div>
        )}
        {loading ? (
          <div className={classes.root}>
            <CircularProgress />
          </div>
        ) : (
          <div
            id="SubmissionTotalChart"
            className={darkMode ? classes.divDark : classes.divLight}
            style={{ gridArea: "smallChart" }}
          >
            <span className={classes.span}>total challenges in the site:</span>
            <br />
            <span className={classes.span}>{numberOfChallenges}</span>
          </div>
        )}
        {loading ? (
          <div className={classes.root}>
            <CircularProgress />
          </div>
        ) : (
          <div
            id="challengesByTypeChart"
            className={darkMode ? classes.divDark : classes.divLight}
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
            className={darkMode ? classes.divDark : classes.divLight}
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
            className={darkMode ? classes.divDark : classes.divLight}
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
            className={darkMode ? classes.divDark : classes.divLight}
            style={{ gridArea: "perDay" }}
          >
            <Charts
              name="subByDate"
              width={"36vw"}
              height={"36vh"}
              chart={[0, 2]}
              data={subByDateData}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Insights;
