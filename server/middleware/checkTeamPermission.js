const { User, Team } = require("../models");

module.exports = async function checkTeamPermission(req, res, next) {
    const { teamId } = req.params;
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
                    attributes: ['id', 'name'],
                    where: {
                        id: teamId,
                    },
                    through: {
                        attributes: [],
                    },
                },
            ],
        });

        if (userTeam) {
            next();
        } else {
            res.sendStatus(401)
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Cannot process request' });
    }
};
