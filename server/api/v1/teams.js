const { Router } = require('express');
const checkAdmin = require('../../middleware/checkAdmin');
const { Op } = require("sequelize");
const { User, Team, UserTeam } = require('../../models');

const router = Router();

// get all teams for the user that logged in with all members
router.get('/all-teams-by-user', async (req, res) => {
  const { userId } = req.user
  try {
    const userTeam = await User.findOne({
      attributes: [],
      where: {
        id: userId,
      },
      include: [
        {
          model: Team,
          attributes: ['name'],
          through: {
            attributes: [],
          },
          include: [
            {
              model: User,
              attributes: ['userName'],
              through: {
                attributes: ['permission'],
              },
            },
          ],
        },
      ],

    });
    res.status(200).json(userTeam)
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Cannot process request' });
  }
});

// create new team
router.post('/create-team', async (req, res) => {
  try {
    await Team.create({ name: req.body.name })
    res.status(201).json({ message: `Team ${req.body.name} Created` })
  }
  catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Cannot process request' });
  }
});

// add users to team
router.post('/add-users', async (req, res) => {
  try {
    const { newUsers } = req.body
    console.log(newUsers);
    const newTeam = UserTeam.bulkCreate(
      newUsers.map((user) => ({
        userId: user.value,
        teamId: req.body.teamId,
      }))
    )
    res.status(201).json({ message: `Team Users Created` })
  }
  catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Cannot process request' });
  }
});

// delete team
router.delete('/remove-team/:id', async (req, res) => {
  try {
    await Team.destroy({
      where: {
        id: req.params.id
      }
    });
    await UserTeam.destroy({
      where: {
        team_id: req.params.id
      }
    });
    res.sendStatus(204)
  }
  catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Cannot process request' });
  }
});

// delete user from team
router.delete('/remove-user', async (req, res) => {
  const { userId, teamId } = req.query

  try {
    await UserTeam.destroy({
      where: {
        [Op.and]: [
          { userId: userId },
          { teamId: teamId }
        ]
      },
    });
    res.sendStatus(204)
  }
  catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Cannot process request' });
  }
});

//= ============================= Admin Routes ======================================

// get all teams
router.get('/all-teams', checkAdmin, async (req, res) => {
  try {
    const userTeam = await Team.findAll({
      attributes: [
        'id', 'name', 'createdAt', 'updatedAt'
      ],
      include: [
        {
          model: User,
          attributes: ['id', 'userName', 'permission'],
          through: {
            attributes: [],
          },
        },
      ],
    });
    res.json(userTeam)
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Cannot process request' });
  }
});

router.get('/single-team/:id', checkAdmin, async (req, res) => {
  try {
    const userTeam = await Team.findAll({
      where: {
        id: req.params.id
      },
      attributes: [
        'id', 'name', 'createdAt', 'updatedAt'
      ],
      include: [
        {
          model: User,
          attributes: ['id', 'userName', 'permission'],
          through: {
            attributes: [],
          },
        },
      ],
    });
    res.json(userTeam)
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Cannot process request' });
  }
});


module.exports = router;
