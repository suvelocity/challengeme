import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import Loading from "../../../../components/Loading";
import network from "../../../../services/network";
import "../../../Admin/Admin.css";

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
  const { row, last } = props;
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
        <StyledTableCell align="left">
          {last ? row.Submissions.length : row.countSub}
        </StyledTableCell>
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
                    <StyledTableCell align="left">User Name</StyledTableCell>
                    <StyledTableCell align="left">Solution Repository</StyledTableCell>
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
                        <StyledTableCell> {userBySubmission.userName} </StyledTableCell>
                        <StyledTableCell> {userBySubmission.solutionRepository} </StyledTableCell>
                        <StyledTableCell align="left">
                          {new Date(userBySubmission.createdAt).toString().substring(0, 24)}
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
  const [
    combainChallengesSubmissionsVsUsersData,
    setCombainChallengesSubmissionsVsUsersData,
  ] = useState([]);
  const [
    combainChallengesSubmissionsVsUsersDataLast,
    setCombainChallengesSubmissionsVsUsersDataLast,
  ] = useState([]);
  const [dataPresent, setDataPresent] = useState([]);
  const [last, setLast] = useState(false);
  const { id } = useParams();


  const getChallengesSubmissions = async () => {
    const { data: challengesSubmissionsFromServer } = await network.get(
      `/api/v1/insights/teacher/challenges-submissions/${id}`
    );
    const combainChallengesSubmissionsVsUsers =
      challengesSubmissionsFromServer[0].length > 0
        ? challengesSubmissionsFromServer[0].map((challenge) => ({
          ChallengeName: challenge.Challenge.name,
          countSub: challenge.countSub,
          createdAt: challenge.createdAt,
          Submissions: challengesSubmissionsFromServer[1]
            .map((userChallenge) => {
              if (challenge.Challenge.id === userChallenge.id) {
                return userChallenge.Submissions.map((userBySubmission) => ({
                  id: userBySubmission.id,
                  solutionRepository: userBySubmission.solutionRepository,
                  userName: userBySubmission.User.userName,
                  createdAt: userBySubmission.createdAt,
                  state: userBySubmission.state,
                })).sort(
                  (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
              }
              return null;
            })
            .filter((element) => !!element)[0],
        }))
        : [];
    setCombainChallengesSubmissionsVsUsersData(combainChallengesSubmissionsVsUsers);
    setDataPresent(combainChallengesSubmissionsVsUsers);
    const combainChallengesSubmissionsVsUsersLast =
      challengesSubmissionsFromServer[0].length > 0
        ? challengesSubmissionsFromServer[0].map((challenge) => ({
          ChallengeName: challenge.Challenge.name,
          countSub: challenge.countSub,
          createdAt: challenge.createdAt,
          Submissions: challengesSubmissionsFromServer[1]
            .map((userChallenge) => {
              if (challenge.Challenge.id === userChallenge.id) {
                const myFilteredArray = [];
                const myFilteredArrayUsers = [];
                userChallenge.Submissions.map((userBySubmission) => ({
                  id: userBySubmission.id,
                  solutionRepository: userBySubmission.solutionRepository,
                  userName: userBySubmission.User.userName,
                  createdAt: userBySubmission.createdAt,
                  state: userBySubmission.state,
                }))
                  .sort(
                    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                  )
                  .forEach((user) => {
                    if (myFilteredArrayUsers.includes(user.userName)) {
                    } else {
                      myFilteredArrayUsers.push(user.userName);
                      myFilteredArray.push(user);
                    }
                  });
                return myFilteredArray;
              }
              return null;
            })
            .filter((element) => !!element)[0],
        }))
        : [];
    setCombainChallengesSubmissionsVsUsersDataLast(combainChallengesSubmissionsVsUsersLast);
  };

  useEffect(() => {
    getChallengesSubmissions();
    // eslint-disable-next-line
  }, []);

  const filteredLast = () => {
    if (last) {
      setDataPresent(combainChallengesSubmissionsVsUsersData);
    } else {
      setDataPresent(combainChallengesSubmissionsVsUsersDataLast);
    }
    setLast((prev) => !prev);
  };

  return (
    <div className="generic-page">
      <div className="align">
        <h1>This is All The Submissions By Challenges Page</h1>

        <Button onClick={filteredLast}>{last ? "Show All" : "Show Only Last"}</Button>

        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <StyledTableCell />
                <StyledTableCell>Challenge Name</StyledTableCell>
                <StyledTableCell align="left">Submissions Count</StyledTableCell>
                <StyledTableCell align="left">Created At</StyledTableCell>
              </TableRow>
            </TableHead>
            {dataPresent.length > 0 ? (
              dataPresent.map((challenge) => (
                <Row
                  key={challenge.ChallengeName + challenge.createdAt}
                  row={challenge}
                  last={last}
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
