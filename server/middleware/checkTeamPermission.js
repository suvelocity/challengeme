const { User, Team,UserTeam } = require("../models");


async function checkTeamPermission(req, res, next) {
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

async function checkTeacherPermission(req, res, next) {
    const { teamId } = req.params;
    const { userId } = req.user
    try {
        const userTeam = await User.findOne({
            attributes: ['id'],
            where: {
                id: userId,
            },
            include: [
                {
                    model: Team,
                    attributes: ['id'],
                    where: {
                        id: teamId,
                    },
                    through: {
                        attributes: ['permission'],
                    },
                },
            ],
        });
        // console.log(userTeam.dataValues.Teams[0].dataValues.UserTeam)

        if (userTeam.dataValues.Teams[0].dataValues.UserTeam.dataValues.permission === 'teacher') {
            next();
        } else {
            res.sendStatus(401)
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Cannot process request' });
    }
};

module.exports  = {
    checkTeacherPermission, checkTeamPermission
}