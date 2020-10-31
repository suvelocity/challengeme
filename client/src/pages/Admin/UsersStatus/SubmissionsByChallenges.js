import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import network from "../../../services/network";
import Loading from "../../../components/Loading/Loading";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import "../Admin.css";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <StyledTableRow className={classes.root}>
        <>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </>
        <StyledTableCell component="th" scope="row">
          {row.ChallengeName}
        </StyledTableCell>
        <StyledTableCell align="left">{row.countSub}</StyledTableCell>
        <StyledTableCell align="left">
          {new Date(row.createdAt).toString().substring(0, 24)}
        </StyledTableCell>
      </StyledTableRow>
      <StyledTableRow>
        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                More Details
                            </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Submission Id</StyledTableCell>
                    <StyledTableCell align="left">Solution Repository</StyledTableCell>
                    <StyledTableCell align="left">User Name</StyledTableCell>
                    <StyledTableCell align="left">Created At</StyledTableCell>
                    <StyledTableCell align="left">State</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.Submissions &&
                    row.Submissions.map((userBySubmission) => (
                      <StyledTableRow key={userBySubmission.id}>
                        <StyledTableCell component="th" scope="row">
                          {userBySubmission.id}
                        </StyledTableCell>
                        <StyledTableCell>
                          {" "}
                          {userBySubmission.userName}{" "}
                        </StyledTableCell>
                        <StyledTableCell>
                          {' '}
                          {userBySubmission.solutionRepository}
                          {' '}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {new Date(userBySubmission.createdAt)
                            .toString()
                            .substring(0, 24)}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <div
                            style={
                              userBySubmission.state === "SUCCESS"
                                ? { color: "green" }
                                : userBySubmission.state === "FAIL"
                                  ? { color: "red" }
                                  : { color: "black" }
                            }
                          >
                            {userBySubmission.state}
                          </div>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
    </React.Fragment>
  );
}

const SubmissionsByChallenges = () => {
  const [challengesSumbissions, setChallengesSumbissions] = useState([]);
  const [usersPerChallenge, setUsersPerChallenge] = useState([]);

  const getChallengesSumbissions = async () => {
    const { data: challengesSumbissionsFromServer } = await network.get(
      "/api/v1/statistics/insights/challenges-sumbissions"
    );
    console.log(challengesSumbissionsFromServer);
    setChallengesSumbissions(challengesSumbissionsFromServer[0]);
    setUsersPerChallenge(challengesSumbissionsFromServer[1]);
  };

  useEffect(() => {
    getChallengesSumbissions();
  }, []);

  const combainChallengesSubmissionsVsUsers =
    challengesSumbissions.length > 0
      ? challengesSumbissions.map((challenge) => {
        return {
          ChallengeName: challenge.Challenge.name,
          countSub: challenge.countSub,
          createdAt: challenge.createdAt,
          Submissions: usersPerChallenge
            .map((userChallenge) => {
              if (challenge.Challenge.id === userChallenge.id) {
                return userChallenge.Submissions.map((userBySubmission) => {
                  return {
                    id: userBySubmission.id,
                    solutionRepository: userBySubmission.solutionRepository,
                    userName: userBySubmission.User.userName,
                    createdAt: userBySubmission.createdAt,
                    state: userBySubmission.state,
                  };
                });
              } else {
                return null;
              }
            })
            .filter((element) => !!element)[0],
        };
      })
      : [];

  return (
    <div className="admin-page">
      <div className="align-and-margin-top">
        <h1>This is All The Challenges By Users Page</h1>
        <Button variant="contained" color="secondary">
          <Link to="/admin">
            <h2>Admin Router</h2>
          </Link>
        </Button>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <StyledTableCell />
                <StyledTableCell>Challenge Name</StyledTableCell>
                <StyledTableCell align="left">Sumbissions Count</StyledTableCell>
                <StyledTableCell align="left">Created At</StyledTableCell>
              </TableRow>
            </TableHead>
            {combainChallengesSubmissionsVsUsers.length > 0 ? (
              combainChallengesSubmissionsVsUsers.map((challenge) => (
                <Row
                  key={challenge.ChallengeName + challenge.createdAt}
                  row={challenge}
                />
              ))
            ) : (
                <Loading />
              )}
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default SubmissionsByChallenges;
