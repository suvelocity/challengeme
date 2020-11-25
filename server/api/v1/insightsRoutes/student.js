const insightStudentRouter = require('express').Router();
const checkAdmin = require('../../../middleware/checkAdmin');
const { checkTeamPermission } = require('../../../middleware/checkTeamPermission');
const sequelize = require('sequelize');
const { Op } = require('sequelize');
const { Submission, Challenge, User, Team } = require('../../../models');

async function getTeamUsersIds(teamId) {

  // get team users
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
            permission: 'student'
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

const filterLastSubmissionPerChallenge = (submissionsOrderedByDate) => {
  const filteredAlready = [];
  let success = 0;
  let fail = 0;
  submissionsOrderedByDate.forEach((submission) => {
    if (filteredAlready.some(filteredSubmission =>
      filteredSubmission.userId === submission.userId &&
      filteredSubmission.challengeId === submission.challengeId)) {
    } else {
      filteredAlready.push({ userId: submission.userId, challengeId: submission.challengeId });
      if (submission.state === 'SUCCESS') {
        success++
      } else {
        fail++
      }
    }
  })
  return { success, fail }
}

// returns the 5 users with the most successful submissions
insightStudentRouter.get('/top-user/:teamId', checkTeamPermission, async (req, res) => {
  try {
    const { teamId } = req.params
    const teamUsersIds = await getTeamUsersIds(teamId);

    // returns top 5 users and their successful submissions
    const teamUsersTopSuccess = await User.findAll({
      where: {
        id: teamUsersIds,
      },
      attributes: ['id', 'userName'],
      include: [
        {
          model: Submission,
          where: {
            state: ['SUCCESS']
          }
        },
      ],
      order: [[Submission, 'createdAt', 'DESC']]

    });

    let formattedMembers = teamUsersTopSuccess.map((member) => {
      const { success } = filterLastSubmissionPerChallenge(member.Submissions);
      const { userName } = member;
      return ({ success, userName })
    })

    formattedMember = formattedMembers.sort((a, b) => {
      return b.success - a.success
    })

    res.json(formattedMember.splice(0, 5));
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Cannot process request' });
  }
});

insightStudentRouter.use(checkAdmin, (req, res, next) => {
  next()
})

//===========Not in use==========================================//

// returns the amount of successful and failed submissions from all submissions
insightStudentRouter.get('/user-success', async (req, res) => {
  try {
    const loggedUser = req.user ? req.user.id : 1;
    const subBySuccess = await Submission.findAll({
      group: ['state'],
      attributes: [
        'id',
        'state',
        'createdAt',
        [sequelize.fn('COUNT', sequelize.col('user_id')), 'CountByUserID'],
      ],
      // include: [
      //   {
      //     model: User,
      //     attributes: ["id", "userName"],
      //   },
      // ],
      where: {
        [Op.and]: [
          { userId: loggedUser },
          { [Op.or]: [{ state: 'SUCCESS' }, { state: 'FAIL' }] },
        ],
      },
    });
    res.json([subBySuccess, req.user.userName]);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Cannot process request' });
  }
});

// returns the submissions per day from the last 5 days
insightStudentRouter.get('/sub-by-date', async (req, res) => {
  try {
    const loggedUser = req.user ? req.user.id : 1;
    const fiveDays = 5 * 24 * 60 * 60 * 1000;
    const subByDate = await Submission.findAll({
      group: [sequelize.fn('DAY', sequelize.col('created_at'))],
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('id')), 'CountSubByDate'],
        'createdAt',
      ],
      where: {
        created_at: {
          [Op.gte]: new Date(Date.now() - fiveDays),
        },
        userId: loggedUser,
      },
    });

    res.json(subByDate);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Cannot process request' });
  }
});

// returns the count of submissions with the same challenge type
insightStudentRouter.get('/sub-by-type', async (req, res) => {
  try {
    const loggedUser = req.user ? req.user.id : 1;
    const subByType = await Submission.findAll({
      include: [
        {
          model: Challenge,
          attributes: [
            'id',
            'type',
            'name',
            [sequelize.fn('COUNT', sequelize.col('type')), 'CountByType'],
          ],
        },
      ],
      group: ['type'],
      where: {
        userId: loggedUser,
      },
    });
    res.json(subByType);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Cannot process request' });
  }
});

// returns the count of unsolved challenges
insightStudentRouter.get('/unsolved-challenges', async (req, res) => {
  try {
    const loggedUser = req.user ? req.user.id : 3;
    // gets user submissions grouped by challenge id
    const userSubmissions = await Submission.findAll({
      group: ['challenge_id'],
      attributes: ['challenge_id'],
      where: {
        userId: loggedUser,
      },
    });

    // returns an array of the challenges id that has been submitted
    const submittedChallenges = userSubmissions.map((challenge) => challenge.challenge_id);

    // gets all the challenges that the user didn't submit
    const unsolvedChallenges = await Challenge.findAll({
      attributes: ['name', 'type', 'repositoryName'],
      where: {
        id: { [Op.notIn]: submittedChallenges },
      },
    });

    res.json(unsolvedChallenges);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Cannot process request' });
  }
});

//===============================================================//

module.exports = insightStudentRouter;