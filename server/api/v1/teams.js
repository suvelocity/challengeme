const teamRouter = require('express').Router();
const { Op } = require('sequelize');
const checkAdmin = require('../../middleware/checkAdmin');
const { checkTeamPermission, checkTeacherPermission } = require('../../middleware/checkTeamPermission');
const { User, Team, UserTeam } = require('../../models');

// get team name
teamRouter.get('/team-name/:teamId', checkTeacherPermission, async (req, res) => {
  const { teamId } = req.params;
  const teamName = await Team.findOne({
    where: {
      id: teamId,
    },
    attributes: ['name'],
  });
  return res.json({ name: teamName.name });
});

// check if user is a part of a team
teamRouter.get('/team-page/:teamId', checkTeamPermission, async (req, res) => {
  const { teamId } = req.params;
  try {
    const teamUsers = await Team.findOne({
      where: {
        id: teamId,
      },
      attributes: [
        'id', 'name', 'createdAt', 'updatedAt',
      ],
      include: [
        {
          model: User,
          attributes: ['id', 'userName', 'phoneNumber', 'email'],
          through: {
            attributes: ['permission'],
          },
        },
      ],
    });
    return res.json(teamUsers);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Cannot process request' });
  }
});

// get all teams for the user that logged in with all members
teamRouter.get('/all-teams-by-user', async (req, res) => {
  const { userId } = req.user;
  try {
    const userTeam = await User.findOne({
      attributes: [],
      where: {
        id: userId,
      },
      include: [
        {
          model: Team,
          attributes: ['id', 'name'],
          through: {
            attributes: ['permission'],
          },
        },
      ],

    });
    return res.status(200).json(userTeam);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Cannot process request' });
  }
});

//= ============================= Teacher Routes ======================================

// get all the users of the teachers team
teamRouter.get('/teacher-area/:teamId', checkTeacherPermission, async (req, res) => {
  const { teamId } = req.params;
  try {
    const teamUsers = await Team.findOne({
      where: {
        id: teamId,
      },
      attributes: [
        'id', 'name', 'createdAt', 'updatedAt',
      ],
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName', 'userName', 'phoneNumber'],
          through: {
            attributes: ['permission'],
            where: {
              [Op.not]: [
                { userId: req.user.userId },
              ],
            },
          },
        },
      ],
    });
    return res.json(teamUsers);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Cannot process request' });
  }
});

// add users to team
teamRouter.post('/add-users/:teamId', checkTeacherPermission, async (req, res) => {
  try {
    const { newUsers } = req.body;
    await Promise.all(newUsers.map(async (user) => (
      UserTeam.restore({
        where: {
          userId: user.value,
          teamId: req.params.teamId,
        },
      })
    )));
    return res.status(201).json({ message: 'Team Users Created' });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Cannot process request' });
  }
});

// change permission
teamRouter.patch('/teacher-permission/:teamId', checkTeacherPermission, async (req, res) => {
  const { userId } = req.body;
  const { teamId } = req.params;
  try {
    const updatedUser = await UserTeam.update({ permission: 'teacher' }, {
      where: {
        teamId,
        userId,
      },
    });
    return res.json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Cannot process request' });
  }
});

// delete user from team
teamRouter.delete('/remove-user/:teamId', checkTeacherPermission, async (req, res) => {
  const { userId } = req.query;
  const { teamId } = req.params;
  try {
    await UserTeam.destroy({
      where: {
        [Op.and]: [
          { userId },
          { teamId },
        ],
      },
    });
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Cannot process request' });
  }
});

// get team information
teamRouter.get('/single-team/:teamId', checkTeacherPermission, async (req, res) => {
  try {
    const userTeam = await Team.findAll({
      where: {
        id: req.params.teamId,
      },
      attributes: [
        'id', 'name', 'createdAt', 'updatedAt',
      ],
      include: [
        {
          model: User,
          attributes: ['id', 'userName'],
          through: {
            attributes: [],
          },
        },
      ],
    });
    return res.json(userTeam);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Cannot process request' });
  }
});

//= ============================= Admin Routes ======================================

// get all teams
teamRouter.get('/all-teams', checkAdmin, async (req, res) => {
  try {
    const userTeam = await Team.findAll({
      attributes: [
        'id', 'name', 'createdAt', 'updatedAt', 'externalId',
      ],
      include: [
        {
          model: User,
          attributes: ['id', 'userName'],
          through: {
            attributes: ['permission'],
          },
        },
      ],
    });
    return res.json(userTeam);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Cannot process request' });
  }
});

// create new team
teamRouter.post('/create-team', checkAdmin, async (req, res) => {
  try {
    await Team.create({ name: req.body.name });
    return res.status(201).json({ message: `Team ${req.body.name} Created` });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Cannot process request' });
  }
});

// add users to team
teamRouter.post('/admin-add-users/:teamId', checkAdmin, async (req, res) => {
  try {
    const { newUsers } = req.body;
    await Promise.all(newUsers.map(async (user) => (
      UserTeam.create({
        userId: user.value,
        teamId: req.params.teamId,
      })
    )));
    return res.status(201).json({ message: 'Team Users Created' });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Cannot process request' });
  }
});

// change permission
teamRouter.patch('/permission/:teamId', checkAdmin, async (req, res) => {
  const { permission, userId } = req.body;
  const { teamId } = req.params;
  try {
    const updatedUser = await UserTeam.update({ permission }, {
      where: {
        teamId,
        userId,
      },
    });
    return res.json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Cannot process request' });
  }
});

// delete team
teamRouter.delete('/remove-team/:id', checkAdmin, async (req, res) => {
  try {
    await Team.destroy({
      where: {
        id: req.params.id,
      },
    });
    await UserTeam.destroy({
      where: {
        team_id: req.params.id,
      },
    });
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Cannot process request' });
  }
});

module.exports = teamRouter;
