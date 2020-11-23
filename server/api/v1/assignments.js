const assignmentsRouter = require('express').Router();
const { checkTeacherPermission, checkTeamPermission } = require('../../middleware/checkTeamPermission')
const { Assignment, Challenge, Label } = require('../../models');

// get assignments with challenge per team
assignmentsRouter.get('/:teamId', checkTeamPermission, async (req, res) => {
    try {
        const assignments = await Assignment.findAll({
            where: { teamId: req.params.teamId },
            attributes: [],
            include: {
                model: Challenge,
                include: {
                    model: Label
                },
            },
        });
        res.json(assignments);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Cannot process request' });
    }
});

//============================== Teacher Routes ======================================

// add assignments to team
assignmentsRouter.post('/:teamId', checkTeamPermission, checkTeacherPermission, async (req, res) => {
    const { teamId } = req.params;
    const { challenges } = req.body;
    try {
        await Assignment.bulkCreate(challenges.map((challenge) => ({
            challengeId: challenge.value,
            teamId,
        })));
        res.status(201).json({ message: 'Uploaded new assignment!' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Cannot process request' });
    }
});


// delete assignments to team
assignmentsRouter.delete('/:teamId', checkTeamPermission, checkTeacherPermission, async (req, res) => {
    const { teamId } = req.params;
    const { challengeId } = req.query;
    try {
        await Assignment.destroy({
            where: {
                teamId,
                challengeId
            }
        });
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Cannot process request' });
    }
});


module.exports = assignmentsRouter;
