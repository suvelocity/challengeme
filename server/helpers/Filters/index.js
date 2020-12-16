const { User, Team } = require('../../models');

async function getTeamUsersIds(teamId) {
  const currentTeamUsers = await Team.findOne({
    where: {
      id: teamId,
    },
    attributes: ['name'],
    include: [
      {
        model: User,
        attributes: ['id'],
        through: {
          where: {
            permission: 'student',
          },
          attributes: [],
        },
      },
    ],
  });
  // returns array with users ids
  const usersId = currentTeamUsers.Users.map((value) => value.id);
  return usersId;
}

function filterLastSubmissionPerChallenge(submissionsOrderedByDate) {
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

function stringInObjectArray(array, string, property = 'userName', property2) {
  if (Array.isArray(array)) {
    return array.some((element) => {
      if (property2) {
        return element[property][property2] === string;
      }
      return element[property] === string;
    });
  }
  return false;
}

module.exports = {
  getTeamUsersIds, filterLastSubmissionPerChallenge, countGroupArray, stringInObjectArray,
};
