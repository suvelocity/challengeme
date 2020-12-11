const adminWebhookRouter = require('express').Router();
const { WebhookAccessKey } = require('../../../models');

// get all access keys on our system
adminWebhookRouter.get('/', async (req, res) => {
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
adminWebhookRouter.post('/', async (req, res) => {
    const { hashKey, entityName } = req.body
    try {
        const destructedAccessKey = {
            hashKey,
            entityName
        };
        await WebhookAccessKey.create(destructedAccessKey);
        res.sendStatus(201);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Cannot process request' });
    }
});

// update access key status
adminWebhookRouter.patch('/:id', async (req, res) => {
    const { hashKey, entityName } = req.body
    const { id } = req.params;
    try {
        const destructedAccessKey = {
            hashKey,
            entityName
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
adminWebhookRouter.delete('/:id', async (req, res) => {
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


module.exports = adminWebhookRouter;
