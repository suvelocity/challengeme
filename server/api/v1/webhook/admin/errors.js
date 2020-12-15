const teamErrorAdminWebhookRouter = require('express').Router();
const { WebhookTeamError } = require('../../../../models');

// get all webhook team errors on our system
teamErrorAdminWebhookRouter.get('/', async (req, res) => {
    const id = req.query.id ? { where: { id: req.query.id } } : {};
    try {
        const allWebhookTeamErrors = await WebhookTeamError.findAll(id);
        res.json(allWebhookTeamErrors);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Cannot process request' });
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
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Cannot process request' });
    }
});


module.exports = teamErrorAdminWebhookRouter;
