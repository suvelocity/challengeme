const eventsWebhookRouter = require('express').Router();
const axios = require('axios');
const { Op } = require('sequelize');
const { WebhookTeamEvent, Team } = require('../../../models');

/* 
request look like this :
header : {
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp // webhook token
}
body : {
    "teamId": "77d2ccb6-e6e2-4e85-92b2-73bf7c642adb",
    "webhookUrl": "http://localhost:8090/api/v1/webhook",
    "events": {"submittedChallenge": "true"},
    "authorizationToken": "1234567abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
}
*/

// register to events webhook
eventsWebhookRouter.post('/registration', async (req, res) => {
    const { teamId, webhookUrl, events, authorizationToken } = req.body
    try {
        const teamInsideId = await Team.findOne({
            where: {
                externalId: teamId
            }
        })
        if (teamInsideId) {
            try {
                const response = await axios.post(webhookUrl, { message: 'test webhookUrl' }, {
                    headers: {
                        'Authorization': `token ${authorizationToken}`,
                    }
                })
                if (response.statusText === 'OK') {
                    const alreadyRegistered = await WebhookTeamEvent.findOne({
                        where: {
                            teamId,
                            webhookUrl
                        }
                    })
                    if (alreadyRegistered) {
                        await WebhookTeamEvent.update({
                            events: {
                                ...alreadyRegistered.events,
                                ...events
                            }
                        },
                            {
                                where: {
                                    teamId,
                                    webhookUrl
                                },
                            },
                        )
                    } else {
                        const destructedRegistrationTeamWebhook = {
                            teamId: teamId,
                            teamInsideId: teamInsideId.id,
                            webhookUrl: webhookUrl,
                            events: events,
                            authorizationToken
                        };
                        await WebhookTeamEvent.create(destructedRegistrationTeamWebhook);
                    }
                    res.sendStatus(201);
                } else {
                    return res.status(400).json({ message: `webhookUrl ${webhookUrl} have a bad response` })
                }
            } catch (error) {
                console.error(error.message);
                return res.status(400).json({ message: `webhookUrl ${webhookUrl} have a bad response` })
            }
        } else {
            res.status(400).json({ message: 'There is no such team with this team id' });
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
    "webhookUrl": "http://localhost:8090/api/v1/webhook",
    "authorizationToken": "1234567abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" // new one
}
 */

// update authorization token
eventsWebhookRouter.patch('/authorization', async (req, res) => {
    const { webhookUrl, authorizationToken } = req.body
    try {
        const isWebhookExist = await WebhookTeamEvent.update({
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
request look like this :
header : {
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp // webhook token
}
body : {
    "teamId": "77d2ccb6-e6e2-4e85-92b2-73bf7c642adb",
    "webhookUrl": "http://localhost:8090/api/v1/webhook",
      "events": {"StartedChallenge": "true", "submittedChallenge": "true"},
    "authorizationToken": "1234567abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
}
*/

// update authorization token
eventsWebhookRouter.delete('/logout', async (req, res) => {
    const { teamId, events, webhookUrl } = req.body
    try {

        const isWebhookExist = await WebhookTeamEvent.findOne({
            where: {
                teamId,
                webhookUrl,
                // events: {
                //     [Op.contains]: [{
                //         ...events
                //     }]
                // }
            }
        })
        if (isWebhookExist) {
            const existEvents = { ...isWebhookExist.events }
            Object.keys(events).forEach((eve => {
                delete existEvents[eve]
            }))
            if (Object.keys(isWebhookExist.events).length === Object.keys(existEvents).length) {
                return res.status(400).json({ message: 'You are not register with this events' })
            } else {
                await WebhookTeamEvent.update({
                    events: existEvents
                },
                    {
                        where: {
                            teamId,
                            webhookUrl
                        },
                    },
                )
            }
            return res.json({ message: `Logout from ${Object.keys(events)} Events Success` })
        } else {
            return res.status(400).json({ message: 'You are not register with this team or webhookUrl' })
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ message: 'Cannot process request' });
    }
});


module.exports = eventsWebhookRouter;
