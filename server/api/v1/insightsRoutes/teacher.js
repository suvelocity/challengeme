const insightTeacherRouter = require('express').Router();
const { Op } = require('sequelize');
const sequelize = require('sequelize');
const { checkTeacherPermission, checkTeamPermission } = require('../../../middleware/checkTeamPermission');
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
                    attributes: [],
                },
            },
        ],
    });

    // returns array with users ids
    const usersId = currentTeamUsers.Users.map((value) => value.id);

    return [usersId];
}
//===================Not in use=========================================//

// returns the teams submissions status(total amount, pending, success, fail)
insightTeacherRouter.get('/team-submissions/:teamId', checkTeamPermission, checkTeacherPermission, async (req, res) => {
    try {
        const loggedUser = req.user ? req.user.id : 1;

        const teamUsersId = await getTeamUsersIds(loggedUser);

        // returns submissions count for each state
        const submissionsStatus = await Submission.findAll({
            attributes: [
                'state',
                [sequelize.fn('COUNT', sequelize.col('id')), 'teamSubmissions'],
            ],
            where: {
                userId: teamUsersId[0],
            },
            group: ['state'],
        });

        const success = submissionsStatus.find((element) => element.state === 'SUCCESS');
        const fail = submissionsStatus.find((element) => element.state === 'FAIL');
        const pending = submissionsStatus.find((element) => element.state === 'PENDING');

        const teamSubmissionsStatus = {
            all: submissionsStatus.reduce((count, element) => count + element.dataValues.teamSubmissions, 0),
            fail: fail ? fail.dataValues.teamSubmissions : 0,
            success: success ? success.dataValues.teamSubmissions : 0,
            pending: pending ? pending.dataValues.teamSubmissions : 0,
        };
        res.json(teamSubmissionsStatus);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Cannot process request' });
    }
});

//=======================================================================//


// returns the top challenges, with the most successful submissions in the team
insightTeacherRouter.get('/success-challenge/:teamId', checkTeamPermission, checkTeacherPermission, async (req, res) => {
    try {
        const loggedUser = req.user.userId
        const { teamId } = req.params
        const teamUsersIds = await getTeamUsersIds(loggedUser, teamId);

        // returns the count of all the successes per challenge for the team
        const successfulTeamChallenges = await Submission.findAll({
            group: ['challengeId'],
            attributes: [
                [sequelize.fn('COUNT', 'challengeId'), 'challengeSuccesses'],
                'challengeId',
            ],
            where: {
                state: 'SUCCESS',
                userId: teamUsersIds[0],
            },
            include: [
                {
                    model: Challenge,
                    attributes: ['name'],
                },
            ],
            order: [[sequelize.fn('COUNT', 'challengeId'), 'DESC']],
        });

        res.json(successfulTeamChallenges.slice(0, 5));
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Cannot process request' });
    }
});

// returns last week team submissions count
insightTeacherRouter.get('/last-week-submissions/:teamId', checkTeamPermission, checkTeacherPermission, async (req, res) => {
    try {
        const loggedUser = req.user.userId
        const { teamId } = req.params
        const teamUsersIds = await getTeamUsersIds(loggedUser, teamId);

        // return the teams successful submissions from the last week by day

        const sevenDays = 7 * 24 * 60 * 60 * 1000;

        const lastWeekTeamSubmissions = await Submission.findAll({
            raw: true,
            group: [sequelize.fn('DAY', sequelize.col('Submission.created_at'))],
            attributes: [
                [sequelize.fn('COUNT', 'id'), 'dateSubmissions'],
                'createdAt',
            ],
            where: {
                created_at: {
                    [Op.gte]: new Date(Date.now() - sevenDays),
                },
                userId: teamUsersIds[0],
            },
            order: [
                [sequelize.fn('DAY', sequelize.col('Submission.created_at')), 'desc'],
            ],
        });
        res.json(lastWeekTeamSubmissions);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Cannot process request' });
    }
});

// returns all the team submissions per challenge
insightTeacherRouter.get('/challenges-submissions/:teamId', checkTeamPermission, checkTeacherPermission, async (req, res) => {
    try {
        const { teamId } = req.params
        const usersId = await getTeamUsersIds(teamId)
        const topChallenges = await Submission.findAll({
            attributes: {
                include: [
                    [sequelize.fn('COUNT', sequelize.col('challenge_id')), 'countSub'],
                ],
            },
            include: {
                model: Challenge,
                attributes: ['id', 'name'],
            },
            group: ['challenge_id'],
            order: [[sequelize.fn('COUNT', sequelize.col('challenge_id')), 'DESC']],
        });

        const users = await Challenge.findAll({
            include: {
                model: Submission,
                attributes: ['id', 'userId', 'createdAt', 'state', 'solutionRepository'],
                include: {
                    model: User,
                    where: {
                        id: usersId
                    },
                    attributes: ['userName'],
                },
            },
        });

        res.json([topChallenges, users]);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Cannot process request' });
    }
});

// returns all the team submissions per user
insightTeacherRouter.get('/users-submissions/:teamId', checkTeamPermission, checkTeacherPermission, async (req, res) => {
    try {
        const { teamId } = req.params
        const usersId = await getTeamUsersIds(teamId)
        const topUsers = await User.findAll({
            attributes: ['userName', 'phoneNumber', 'firstName', 'lastName', 'email'],
            where: {
                id: usersId
            },
            include: {
                model: Submission,
                include: { model: Challenge },
            },
        });
        res.json(topUsers);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Cannot process request' });
    }
});

// returns all the users in the team with ordered submissions by date
insightTeacherRouter.get('/top-user/:teamId', checkTeamPermission, checkTeacherPermission, async (req, res) => {
    try {
        const loggedUser = req.user.userId;
        const { teamId } = req.params
        const teamUsersIds = await getTeamUsersIds(loggedUser, teamId);

        // returns top 5 users and their successful submissions
        const teamUsersTopSuccess = await User.findAll({
            where: {
                id: teamUsersIds[0],
            },
            attributes: ['id', 'userName'],
            include: [
                {
                    model: Submission,
                    where: {
                        state: ['SUCCESS', 'FAIL']
                    }
                },
            ],
            order: [[Submission, 'createdAt', 'DESC']]
        });
        res.json(teamUsersTopSuccess);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Cannot process request' });
    }
});

module.exports = insightTeacherRouter;
