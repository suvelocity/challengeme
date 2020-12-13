const adminWebhookRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { WebhookAccessKey, WebhookEvents, WebhookTeamError } = require('../../../models');

// get all access keys on our system
adminWebhookRouter.get('/access-key', async (req, res) => {
    const id = req.query.id ? { where: { id: req.query.id } } : {};
    try {
        const allAccessKeys = await WebhookAccessKey.findAll(id);
        res.json(allAccessKeys);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Cannot process request' });
    }
});

// add access key
adminWebhookRouter.post('/access-key', async (req, res) => {
    const { key, entityName, email } = req.body
    try {
        const destructedAccessKey = {
            key: key,
            entityName,
            email
        };
        await WebhookAccessKey.create(destructedAccessKey);
        res.sendStatus(201);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Cannot process request' });
    }
});

// update access key status
adminWebhookRouter.patch('/access-key/:id', async (req, res) => {
    const { key, entityName, email } = req.body
    const { id } = req.params;
    try {
        const destructedAccessKey = {
            key: key,
            entityName,
            email
        };
        await WebhookAccessKey.update(destructedAccessKey, {
            where: {
                id
            },
        });
        const allAccessKeys = await WebhookAccessKey.findAll({});
        res.json(allAccessKeys);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Cannot process request' });
    }
});

// delete access key
adminWebhookRouter.delete('/access-key/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await WebhookAccessKey.destroy({
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

// get all webhook events on our system
adminWebhookRouter.get('/webhook-event', async (req, res) => {
    const id = req.query.id ? { where: { id: req.query.id } } : {};
    try {
        const allWebhookEvents = await WebhookEvents.findAll(id);
        res.json(allWebhookEvents);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Cannot process request' });
    }
});

// add webhook event
adminWebhookRouter.post('/webhook-event', async (req, res) => {
    const { name } = req.body
    try {
        await WebhookEvents.create({ name });
        res.sendStatus(201);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Cannot process request' });
    }
});

// update webhook event
adminWebhookRouter.patch('/webhook-event/:id', async (req, res) => {
    const { name } = req.body
    const { id } = req.params;
    try {
        await WebhookEvents.update({ name }, {
            where: {
                id
            },
        });
        const allAccessKeys = await WebhookAccessKey.findAll({});
        res.json(allAccessKeys);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Cannot process request' });
    }
});

// delete webhook event
adminWebhookRouter.delete('/webhook-event/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await WebhookEvents.destroy({
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

// get all webhook team errors on our system
adminWebhookRouter.get('/webhook-team-error', async (req, res) => {
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
adminWebhookRouter.delete('/webhook-team-error/:id', async (req, res) => {
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


module.exports = adminWebhookRouter;
