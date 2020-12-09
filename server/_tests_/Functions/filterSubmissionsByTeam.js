module.exports = function filterSubmissionsByTeam(submissionsArray, teamIdArray, conditions = [{ paramter: 'aaa', equal: undefined }]) {

  const filteredSubmissions = [];
  submissionsArray.forEach((submission) => {
    if (!filteredSubmissions.includes(submission.id) &&
      teamIdArray.includes(submission.userId) &&
      conditions.every((condition) => submission[`${condition.parameter}`] === condition.equal)) {
      filteredSubmissions.push(submission);
    }
  });
  return filteredSubmissions.sort((a, b) => b.createdAt - a.createdAt);
};
