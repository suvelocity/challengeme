const teamsAdminWebhookRouter = require('express').Router();
const { WebhookTeam, WebhookEvent, WebhookEventTeam } = require('../../../../models');

// get all webhook teams on our system
teamsAdminWebhookRouter.get('/', async (req, res) => {
  const where = req.query.id ? { id: req.query.id } : {};
  try {
    const allWebhookTeams = await WebhookTeam.findAll({
      where,
      include: {
        model: WebhookEvent,
        through: {
          attributes: [],
        },
      },
    });
    return res.json(allWebhookTeams);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Cannot process request' });
  }
});

// add webhook team
teamsAdminWebhookRouter.post('/', async (req, res) => {
  const {
    teamId, webhookUrl, authorizationToken, events,
  } = req.body;
  try {
    const eventsIds = await WebhookEvent.findAll({
      where: {
        name: events,
      },
    });

    const newWebhookTeam = await WebhookTeam.create({ teamId, webhookUrl, authorizationToken });
    const teamEvents = events.map((event) => ({
      webhookId: newWebhookTeam.id,
      eventId: eventsIds.find((eventName) => event === eventName.name).id,
    }));

    await WebhookEventTeam.bulkCreate(teamEvents);
    return res.sendStatus(201);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Cannot process request' });
  }
});

// update webhook team
teamsAdminWebhookRouter.patch('/:id', async (req, res) => {
  const { webhookUrl, authorizationToken } = req.body;
  const { id } = req.params;
  try {
    await WebhookTeam.update({ webhookUrl, authorizationToken }, {
      where: {
        id,
      },
    });
    return res.json({ message: 'Update Success' });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Cannot process request' });
  }
});

// delete webhook team
teamsAdminWebhookRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await WebhookTeam.destroy({
      where: {
        id,
      },
      cascade: true,
    });
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Cannot process request' });
  }
});

module.exports = teamsAdminWebhookRouter;
