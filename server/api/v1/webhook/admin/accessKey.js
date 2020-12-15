const accessKeyAdminWebhookRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: generateId } = require('uuid');
const { Op } = require('sequelize');
const { WebhookAccessKey } = require('../../../../models');

// get all access keys on our system
accessKeyAdminWebhookRouter.get('/', async (req, res) => {
    let query = req.query.id ? { where: { id: req.query.id } } : {};
    query = req.query.name ? { where: { entityName: { [Op.like]: `%${req.query.name}%` } } } : query;
    try {
        const allAccessKeys = await WebhookAccessKey.findAll(query);
        const hashedAccessKeys = await Promise.all(allAccessKeys.map(async (key) => {
            const hashedToken = await bcrypt.hashSync(key.key, 10);
            const tokenKey = {
                token: hashedToken,
                name: key.entityName,
                id: key.id
            }
            key.key = jwt.sign(tokenKey, process.env.WEBHOOK_SECRET);
            return key
        }))
        res.json(hashedAccessKeys);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Cannot process request' });
    }
});

// add access key
accessKeyAdminWebhookRouter.post('/', async (req, res) => {
    const { entityName, email } = req.body
    try {
        const key = generateId()
        const newKey = await WebhookAccessKey.create({ key, entityName, email });
        const hashedToken = await bcrypt.hashSync(key, 10);
        const tokenKey = {
            token: hashedToken,
            name: entityName,
            id: newKey.id
        }
        const accessKeyToken = jwt.sign(tokenKey, process.env.WEBHOOK_SECRET);
        res.status(201).json({ key: accessKeyToken });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Cannot process request' });
    }
});

// update access key status
accessKeyAdminWebhookRouter.patch('/:id', async (req, res) => {
    const { key, entityName, email } = req.body
    const { id } = req.params;
    try {
        const destructedAccessKey = {
            key,
            entityName,
            email
        };
        await WebhookAccessKey.update(destructedAccessKey, {
            where: {
                id
            },
        });
        const hashedToken = await bcrypt.hashSync(key, 10);
        const tokenKey = {
            token: hashedToken,
            name: entityName,
            id: newKey.id
        }
        const accessKeyToken = jwt.sign(tokenKey, process.env.WEBHOOK_SECRET);
        res.json(accessKeyToken);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Cannot process request' });
    }
});

// delete access key
accessKeyAdminWebhookRouter.delete('/:id', async (req, res) => {
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

module.exports = accessKeyAdminWebhookRouter;
