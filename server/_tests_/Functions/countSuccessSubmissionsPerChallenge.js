module.exports = function countSuccessSubmissionsPerChallenge(submissionsOrderedByDate, challengesArray) {
  const filteredChallenges = [];
  challengesArray.forEach((challenge) => {
    const filteredAlready = [];
    let challengeSuccesses = 0;
    submissionsOrderedByDate.forEach((submission) => {
      if (challenge.id === submission.challengeId) {
        if (
          filteredAlready.some(
            (filteredSubmission) =>
              filteredSubmission.userId === submission.userId
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
  })
  const ordered = filteredChallenges.filter((challenge) => challenge.challengeSuccesses > 0)
    .sort((a, b) => b.challengeSuccesses - a.challengeSuccesses);
  return ordered;
};
