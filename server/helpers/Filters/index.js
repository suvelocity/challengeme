const getTeamUsersIds = require('./getTeamUsersIds');
const filterLastSubmissionPerChallenge = require('./filterLastSubmissionPerChallenge');

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
};

function userNameInArray(array, userName) {
  if (Array.isArray(array)) {
    return array.some(user => user.userName === userName)
  } return false
}

module.exports = {
  getTeamUsersIds, filterLastSubmissionPerChallenge, countGroupArray, userNameInArray
};
