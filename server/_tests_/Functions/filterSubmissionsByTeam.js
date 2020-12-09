module.exports = function filterSubmissionsByTeam(
  submissionsArray,
  teamIdArray,
  conditions = [{ paramter: "aaa", equal: undefined }]
) {
  const filteredSubmissions = [];
  const filteredSubmissionsId = [];
  submissionsArray.forEach((submission) => {
    if (
      !filteredSubmissionsId.includes(submission.id) &&
      teamIdArray.includes(submission.userId) &&
      conditions.every((condition) => {
        return submission[`${condition.paramter}`] === condition.equal;
      })
    ) {
      filteredSubmissions.push(submission);
      filteredSubmissionsId.push(submission.id);
    }
  });
  return filteredSubmissions.sort((a, b) => b.createdAt - a.createdAt);
};
