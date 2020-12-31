const teamErrorAdminWebhookRouter = require('express').Router();
const {
  WebhookTeamError, WebhookTeam, Team, WebhookAccessKey,
} = require('../../../../models');

// get all webhook team errors on our system
teamErrorAdminWebhookRouter.get('/', async (req, res) => {
  const where = req.query.id ? { id: req.query.id } : {};
  try {
    const allWebhookTeamErrors = await WebhookTeamError.findAll({
      where,
      order: [['createdAt', 'DESC']],
      include: {
        model: WebhookTeam,
        attributes: ['teamId'],
        include: {
          model: Team,
          attributes: ['name', 'creator'],
          include: {
            model: WebhookAccessKey,
            attributes: ['entityName'],
          },
        },
      },
    });
    return res.json(allWebhookTeamErrors);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Cannot process request' });
  }
});

// delete webhook team error
teamErrorAdminWebhookRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await WebhookTeamError.destroy({
      where: {
        id,
      },
    });
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Cannot process request' });
  }
});

module.exports = teamErrorAdminWebhookRouter;
