const generateToken = require("./generateToken");
const countSuccessAndFailSubmissionsPerChallenge = require("./countSuccessAndFailSubmissionsPerChallenge");
const countSuccessSubmissionsPerChallenge = require("./countSuccessSubmissionsPerChallenge");
const filterUsersByTeam = require("./filterUsersByTeam");
const filterSubmissionsByTeam = require("./filterSubmissionsByTeam");
const countGroupArray = require("./countGroupArray");
const filterLastSubmissionsForTeacherRoute = require("./filterLastSubmissionsForTeacherRoute");

function combineSubmissionToChallenge(
  challengeArray,
  submissionsArray,
  onlyLast = "false"
) {
  return challengeArray
    .map((challenge) => {
      challenge.Submissions = [];
      submissionsArray.forEach((submission) => {
        if (challenge.id === submission.challengeId) {
          challenge.Submissions.push(submission);
        }
      });
      challenge.Submissions.sort((a, b) => b.createdAt - a.createdAt);
      if (eval(onlyLast)) {
        const myFilteredArray = [];
        const myFilteredArrayUsers = [];
        challenge.Submissions.forEach((submission) => {
          if (myFilteredArrayUsers.includes(submission.userId)) {
          } else {
            myFilteredArrayUsers.push(submission.userId);
            myFilteredArray.push(submission);
          }
          challenge.Submissions = myFilteredArray;
        });
      }
      return challenge;
    })
    .filter((challenge) => challenge.Submissions.length > 0)
    .sort((a, b) => b.Submissions.length - a.Submissions.length);
}

function combineSubmissionToUserWithChallenge(
  usersArray,
  submissionsArray,
  challengesArray,
  onlyLast = "false"
) {
  return usersArray
    .map((user) => {
      user.Submissions = [];
      submissionsArray.forEach((submission) => {
        if (submission.userId === user.id) {
          submission.Challenge = challengesArray.find(
            (challenge) => challenge.id === submission.challengeId
          );
          user.Submissions.push(submission);
        }
      });
      if (eval(onlyLast)) {
        const myFilteredArray = [];
        const myFilteredArrayUsers = [];
        user.Submissions.forEach((submission) => {
          if (myFilteredArrayUsers.includes(submission.challengeId)) {
          } else {
            myFilteredArrayUsers.push(submission.challengeId);
            myFilteredArray.push(submission);
          }
        });
        user.Submissions = myFilteredArray;
      }
      user.Submissions.sort((a, b) => b.createdAt - a.createdAt);
      return user;
    })
    .sort((a, b) => b.Submissions[0].createdAt - a.Submissions[0].createdAt);
}

function filteredArrayByIds(array, idsArray) {
  return array.filter((user) => idsArray.includes(user.id));
}

module.exports = {
  generateToken,
  countSuccessAndFailSubmissionsPerChallenge,
  countSuccessSubmissionsPerChallenge,
  filterUsersByTeam,
  filterSubmissionsByTeam,
  countGroupArray,
  filterLastSubmissionsForTeacherRoute,
  combineSubmissionToChallenge,
  combineSubmissionToUserWithChallenge,
  filteredArrayByIds,
};
