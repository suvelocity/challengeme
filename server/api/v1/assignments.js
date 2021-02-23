const assignmentsRouter = require('express').Router();
const { checkTeacherPermission, checkTeamPermission } = require('../../middleware/checkTeamPermission');
const {
  Assignment, Challenge, Label, Team, User,
} = require('../../models');

// get assignments with challenge per team
assignmentsRouter.get('/:teamId', checkTeamPermission, async (req, res) => {
  const { teamId } = req.params;
  try {
    let assignments = await Assignment.findAll({
      where: { teamId },
      attributes: [],
      include: [
        {
          model: Challenge,
          include: [{
            model: Label,
          },
          {
            model: User,
            as: 'Author',
            attributes: ['userName'],
          },
          ],
        },
        {
          model: Team,
          attributes: ['name'],
        },

      ],

    });

    if (assignments.length === 0) {
      const teamName = await Team.findOne({
        where: {
          id: teamId,
        },
      });
      assignments = [{
        Team: { name: teamName.name },
      }];
    }
    return res.json(assignments);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Cannot process request' });
  }
});

//= ============================= Teacher Routes ======================================

// add assignments to team
assignmentsRouter.post('/:teamId', checkTeacherPermission, async (req, res) => {
  const { teamId } = req.params;
  const { challenges } = req.body;
  try {
    await Assignment.bulkCreate(challenges.map((challenge) => ({
      challengeId: challenge.value,
      teamId,
    })));
    return res.status(201).json({ message: 'Uploaded new assignment!' });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Cannot process request' });
  }
});

// delete assignments to team
assignmentsRouter.delete('/:teamId', checkTeacherPermission, async (req, res) => {
  const { teamId } = req.params;
  const { challengeId } = req.query;
  try {
    await Assignment.destroy({
      where: {
        teamId,
        challengeId,
      },
    });
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Cannot process request' });
  }
});

module.exports = assignmentsRouter;
