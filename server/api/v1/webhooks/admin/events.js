const eventsAdminWebhookRouter = require('express').Router();
const { Op } = require('sequelize');
const { WebhookEvent } = require('../../../../models');

// get all webhook events on our system
eventsAdminWebhookRouter.get('/', async (req, res) => {
  let query = req.query.id ? { where: { id: req.query.id } } : {};
  query = req.query.name ? { where: { name: { [Op.like]: `%${req.query.name}%` } } } : query;
  try {
    const allWebhookEvents = await WebhookEvent.findAll(query);
    return res.json(allWebhookEvents);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Cannot process request' });
  }
});

// add webhook event
eventsAdminWebhookRouter.post('/', async (req, res) => {
  const { name } = req.body;
  try {
    await WebhookEvent.create({ name });
    return res.sendStatus(201);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Cannot process request' });
  }
});

// update webhook event
eventsAdminWebhookRouter.patch('/:id', async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  try {
    await WebhookEvent.update({ name }, {
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

// delete webhook event
eventsAdminWebhookRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await WebhookEvent.destroy({
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

module.exports = eventsAdminWebhookRouter;
