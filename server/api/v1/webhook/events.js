const eventsWebhookRouter = require('express').Router();
const axios = require('axios');
const { Op } = require('sequelize');
const db = require('../../../models');
const { WebhookTeam, WebhookEventTeam, WebhookEvent, Team } = require('../../../models');

/* 
request look like this :
header : {
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp // webhook token
}
body : {
    "teamId": "77d2ccb6-e6e2-4e85-92b2-73bf7c642adb",
    "webhookUrl": "http://localhost:8090/api/v1/webhook",
    "events":  ["submittedChallenge", "startedChallenge"],
    "authorizationToken": "1234567abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
}
*/
// register to events webhook
eventsWebhookRouter.post('/registration', async (req, res) => {
    const { teamId, webhookUrl, events, authorizationToken } = req.body
    eventsRegistration(res, teamId, webhookUrl, events, authorizationToken)
});

/*
 header : {
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp // webhook token
}
body : {
    "webhookUrl": "http://localhost:8090/api/v1/webhook",
    "authorizationToken": "1234567abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" // new one
}
 */

// update authorization token
eventsWebhookRouter.patch('/authorization', async (req, res) => {
    const { webhookUrl, authorizationToken } = req.body
    try {
        const isWebhookExist = await WebhookTeam.update({
            authorizationToken,
        },
            {
                where: {
                    webhookUrl
                },
            })
        if (isWebhookExist[0] > 0) {
            res.json({ message: 'Update Authorization Token Success' })
        } else {
            res.status(400).json({ message: 'Update Authorization Token Fail' })
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ message: 'Cannot process request' });
    }
});

/*
 header : {
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp // webhook token
}
body : {
    "webhookUrl": "http://localhost:8090/api/v1/webhook", // new one
}
 */

// update webhookUrl
eventsWebhookRouter.patch('/url', async (req, res) => {
    const { webhookUrl } = req.body
    try {
        const isWebhookExist = await WebhookTeam.update({
            webhookUrl
        },
            {
                where: {
                    webhookUrl
                },
            })
        if (isWebhookExist[0] > 0) {
            res.json({ message: 'Update Url Success' })
        } else {
            res.status(400).json({ message: 'Update Url Fail' })
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ message: 'Cannot process request' });
    }
});

/* 
request look like this :
header : {
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp // webhook token
}
body : {
    "teamId": "77d2ccb6-e6e2-4e85-92b2-73bf7c642adb",
    "webhookUrl": "http://localhost:8090/api/v1/webhook",
    "events": ["submittedChallenge", "startedChallenge"]
}
*/

// update authorization token
eventsWebhookRouter.delete('/logout', async (req, res) => {
    const { teamId, events, webhookUrl } = req.body
    try {
        const isWebhookExist = await Team.findOne({
            where: {
                externalId: teamId,
            },
            include: [
                {
                    model: WebhookTeam,
                    where: {
                        webhookUrl
                    },
                    include: [
                        {
                            model: WebhookEventTeam,
                        }
                    ]
                }
            ]
        })
        if (!isWebhookExist) {
            return res.status(400).json({ message: 'You are not register with this team to this webhookUrl' })
        } else if (!isWebhookExist.WebhookTeams[0].WebhookEventTeams[0]) {
            return res.status(400).json({ message: 'You are not register with this events to this webhookUrl' })
        } else {
            await WebhookEventTeam.destroy({
                where: {
                    eventId: isWebhookExist.WebhookTeams[0].WebhookEventTeams.map(ev => ev.toJSON().eventId),
                    webhookId: isWebhookExist.WebhookTeams[0].toJSON().id
                },
            })
            return res.json({ message: `Logout from ${events} Events Success` })
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ message: 'Cannot process request' });
    }
});



async function eventsRegistration(res, teamId, webhookUrl, events, authorizationToken) {
    try {
        const teamInsideId = await Team.findOne({
            where: {
                externalId: teamId
            },
            include: [{
                model: WebhookTeam,
                where: {
                    webhookUrl
                },
                required: false
            }]
        })
        if (!teamInsideId) return res.status(400).json({ message: 'There is no such team with this team id' });
        const alreadyRegisteredId = teamInsideId.WebhookTeams[0] ? teamInsideId.WebhookTeams[0].id : null;
        const eventsFromDb = await WebhookEvent.findAll({
            where: {
                name: events
            },
            include: [{
                model: WebhookEventTeam,
                where: {
                    webhookId: alreadyRegisteredId
                },
                required: false
            }]
        })

        if (eventsFromDb.length === 0) return res.status(400).json({ message: 'There is no such events' });
        if (events.length !== eventsFromDb.length) {
            const notExistEvents = events.filter(event => !eventsFromDb.some(dbEvent => event === dbEvent.name))
            return res.status(400).json({ message: `There is no such events as ${notExistEvents}` });
        }

        let webhookEventTeamToCreate = []
        if (alreadyRegisteredId) {
            const alreadySignEvents = eventsFromDb.map(e => e.toJSON()).filter(x => !!x.WebhookEventTeams[0])
            if (alreadySignEvents.length > 0) {
                const ifManyEvents = (alreadySignEvents.length > 1) ? 's' : '';
                return res.status(400)
                    .json({
                        message: `You already registered with ${alreadySignEvents.map(event => event.name)} event${ifManyEvents}`
                    });
            }
            webhookEventTeamToCreate = eventsFromDb.map(event => {
                return { webhookId: alreadyRegisteredId, eventId: event.id }
            })
        } else {
            const webhooksCreated = await WebhookTeam.create({
                teamId: teamInsideId.id,
                webhookUrl,
                authorizationToken
            });
            webhookEventTeamToCreate = eventsFromDb.map(event => {
                return { webhookId: webhooksCreated.id, eventId: event.id }
            })
        }
        await WebhookEventTeam.bulkCreate(webhookEventTeamToCreate)
        res.sendStatus(201);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json({ message: 'Cannot process request' });
    }
}


module.exports = eventsWebhookRouter;
module.exports.eventsRegistration = eventsRegistration