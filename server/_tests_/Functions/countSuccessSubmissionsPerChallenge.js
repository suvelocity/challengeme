module.exports = function countSuccessSubmissionsPerChallenge(submissionsOrderedByDate, challengeArray) {
    const filteredChallenges = [];
    challengeArray.forEach(challenge => {
        const filteredAlready = [];
        let challengeSuccesses = 0;
        submissionsOrderedByDate.forEach((submission) => {
            if (challenge.id === submission.challengeId) {
                if (filteredAlready.some(filteredSubmission =>
                    filteredSubmission.challengeId === submission.challengeId)) {
                } else {
                    filteredAlready.push({ challengeId: submission.challengeId });
                    challengeSuccesses++
                }
                filteredChallenges.push({ challengeSuccesses, name: challenge.name })
            }
        })
    })
    return filteredChallenges;
}