require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const moment = require('moment');

function generateToken(currentUser) {
  const infoForCookie = {
    userId: currentUser.id,
    userName: currentUser.userName,
  };
  return jwt.sign(infoForCookie, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '900s',
  });
}

async function generateWebhookToken(entity) {
  const hashedToken = await bcrypt.hashSync(entity.key, 10);
  const tokenKey = {
    token: hashedToken,
    name: entity.entityName,
    id: entity.id,
  };
  return jwt.sign(tokenKey, process.env.WEBHOOK_SECRET);
}

function countSuccessAndFailSubmissionsPerChallenge(submissionsOrderedByDate) {
  const filteredAlready = [];
  let success = 0;
  let fail = 0;
  submissionsOrderedByDate.forEach((submission) => {
    if (filteredAlready.some((filteredSubmission) => filteredSubmission.userId === submission.userId
      && filteredSubmission.challengeId === submission.challengeId)) {
    } else {
      filteredAlready.push({ userId: submission.userId, challengeId: submission.challengeId });
      if (submission.state === 'SUCCESS') {
        success++;
      } else {
        fail++;
      }
    }
  });
  return { success, fail };
}

function countSuccessSubmissionsPerChallenge(submissionsOrderedByDate, challengesArray) {
  const filteredChallenges = [];
  challengesArray.forEach((challenge) => {
    const filteredAlready = [];
    let challengeSuccesses = 0;
    submissionsOrderedByDate.forEach((submission) => {
      if (challenge.id === submission.challengeId) {
        if (
          filteredAlready.some(
            (filteredSubmission) => filteredSubmission.userId === submission.userId,
          )
        ) {
        } else {
          filteredAlready.push({
            challengeId: submission.challengeId,
            userId: submission.userId,
          });
          challengeSuccesses++;
        }
      }
    });
    filteredChallenges.push({ challengeSuccesses, name: challenge.name });
  });
  const ordered = filteredChallenges.filter((challenge) => challenge.challengeSuccesses > 0)
    .sort((a, b) => b.challengeSuccesses - a.challengeSuccesses);
  return ordered;
}

function filterUsersByTeam(team, userTeamArray) {
  return userTeamArray.map((userTeam) => {
    if (userTeam.teamId === team.id && userTeam.permission === 'student') {
      return userTeam.userId;
    }
  }).filter((a) => !(!a));
}

function filterSubmissionsByTeam(
  submissionsArray,
  teamIdArray,
  conditions = [{ paramter: 'aaa', equal: undefined }],
) {
  const filteredSubmissions = [];
  const filteredSubmissionsId = [];
  submissionsArray.forEach((submission) => {
    if (
      !filteredSubmissionsId.includes(submission.id)
      && teamIdArray.includes(submission.userId)
      && conditions.every((condition) => submission[`${condition.paramter}`] === condition.equal)
    ) {
      filteredSubmissions.push(submission);
      filteredSubmissionsId.push(submission.id);
    }
  });
  return filteredSubmissions.sort((a, b) => b.createdAt - a.createdAt);
}

function countGroupArray(array, count, groupParameter) {
  const groupedCountArray = [];
  const alreadyInsideArray = [];
  array.forEach((element) => {
    if (alreadyInsideArray.includes(element[groupParameter])) {
      groupedCountArray.forEach((groupedElement) => {
        if (groupedElement[groupParameter] === element[groupParameter]) {
          groupedElement[count] = groupedElement[count] + 1;
        }
      });
    } else {
      alreadyInsideArray.push(element[groupParameter]);
      element[count] = 1;
      groupedCountArray.push(element);
    }
  });
  return groupedCountArray;
}

function filterLastSubmissionsForTeacherRoute(team, challengeIdArray, submissionsArray, userTeamArray) {
  const teamUsersId = filterUsersByTeam(team, userTeamArray);
  const totalSubmissionsShouldBe = teamUsersId.length * challengeIdArray.length;

  const totalSubmissionsOrderedByDate = submissionsArray.map((submission) => {
    if (teamUsersId.includes(submission.userId) && challengeIdArray.includes(submission.challengeId)) {
      return submission;
    }
  }).filter((a) => !(!a)).sort((a, b) => b.createdAt - a.createdAt);

  const filteredSubmissions = countSuccessAndFailSubmissionsPerChallenge(totalSubmissionsOrderedByDate);
  const notYetSubmitted = (teamUsersId.length * totalSubmissionsShouldBe) - (filteredSubmissions.success + filteredSubmissions.fail);
  filteredSubmissions.notYet = notYetSubmitted || 0;
  return filteredSubmissions;
}

function combineSubmissionToChallenge(challengeArray, submissionsArray, onlyLast = 'false') {
  return challengeArray
    .map((challenge) => {
      challenge.Submissions = [];
      submissionsArray.forEach((submission) => {
        if (challenge.id === submission.challengeId) {
          challenge.Submissions.push(submission);
        }
      });
      challenge.Submissions.sort((a, b) => b.createdAt - a.createdAt);
      if (onlyLast === 'true') {
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

function combineSubmissionToUserWithChallenge(usersArray, submissionsArray, challengesArray, onlyLast = 'false') {
  return usersArray.map((user) => {
    user.Submissions = [];
    submissionsArray.forEach((submission) => {
      if (submission.userId === user.id) {
        submission.Challenge = challengesArray.find((challenge) => challenge.id === submission.challengeId);
        user.Submissions.push(submission);
      }
    });
    if (onlyLast === 'true') {
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
  }).sort((a, b) => {
    if (b.Submissions[0] && a.Submissions[0]) {
      return b.Submissions[0].createdAt - a.Submissions[0].createdAt;
    }
  });
}

function filteredArrayByIds(array, idsArray) {
  return array.filter((user) => idsArray.includes(user.id));
}

function filterLastSubmissionsForAdminRoute(challengeIdArray, submissionsArray, usersArray) {
  const totalSubmissionsShouldBe = usersArray.length * challengeIdArray.length;

  const totalSubmissionsOrderedByDate = submissionsArray
    .map((submission) => {
      if (challengeIdArray.includes(submission.challengeId)) {
        return submission;
      }
    })
    .filter((a) => !!a)
    .sort((a, b) => b.createdAt - a.createdAt);

  const filteredSubmissions = countSuccessAndFailSubmissionsPerChallenge(
    totalSubmissionsOrderedByDate,
  );
  const notYetSubmitted = totalSubmissionsShouldBe
    - (filteredSubmissions.success + filteredSubmissions.fail);
  filteredSubmissions.notYet = notYetSubmitted || 0;
  return filteredSubmissions;
}

function countSuccessSubmissionsWithUserName(usersWithSubmissions) {
  return usersWithSubmissions.map((member) => {
    const filteredSubmissions = [];
    let success = 0;
    let fail = 0;
    member.Submissions = member.Submissions.sort(
      (a, b) => b.createdAt - a.createdAt,
    );
    member.Submissions.forEach((submission) => {
      if (filteredSubmissions.includes(submission.challengeId)) {
      } else {
        filteredSubmissions.push(submission.challengeId);
        if (submission.state === 'SUCCESS') {
          success++;
        } else if (submission.state === 'FAIL') {
          fail++;
        }
      }
    });
    return {
      success,
      fail,
      userName: member.userName,
    };
  });
}

function formatCreatedAtToMoment(submissions) {
  return submissions.map((submission) => {
    let momentDate = moment(submission.createdAt).fromNow();
    momentDate = momentDate.includes('hour')
      ? 'today'
      : momentDate.includes('minutes')
        ? 'today'
        : momentDate.includes('seconds')
          ? 'today'
          : momentDate;
    return { dateSubmissions: 1, createdAt: momentDate };
  });
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
  filterLastSubmissionsForAdminRoute,
  countSuccessSubmissionsWithUserName,
  formatCreatedAtToMoment,
  generateWebhookToken,
};
