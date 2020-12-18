const { Team } = require('../models');

module.exports = async function checkTeamOwnerPermission(req, res, next) {
  const { externalId } = req.params;
  try {
    const teamExists = await Team.findOne({
      where: {
        externalId,
      },
    });
    if (!teamExists) return res.status(404).json({ message: `There is no such team with ${externalId} team id` });
    req.team = teamExists;

    const isTeamBelongsToOwner = await Team.findOne({
      where: {
        externalId,
        creator: req.entity.id,
      },
    });

    if (!isTeamBelongsToOwner) return res.status(401).json({ message: `You don't have permission for team ${externalId}` });

    next();
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Cannot process request' });
  }
};
