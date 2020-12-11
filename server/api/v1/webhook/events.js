const eventsWebhookRouter = require('express').Router();
const axios = require('axios');
const { WebhookTeamEvent, Team } = require('../../../models');

/* 
request look like this :
header : {
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp // webhook token
}
body : {
    "teamId": "77d2ccb6-e6e2-4e85-92b2-73bf7c642adb",
    "webhookUrl": "http://localhost:8090/api/v1/webhook",
    "events": {"SubmittedChallenge": "true"},
    "authorizationToken": "1234567abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
}
*/

// register to events webhook
eventsWebhookRouter.post('/registration', async (req, res) => {
    const { teamId, webhookUrl, events, authorizationToken } = req.body
    try {
        const teamExternalId = await Team.findOne({
            where: {
                externalId: teamId
            }
        })
        // console.log(Object.assign(teamExternalId));
        if (teamExternalId) {
            try {

                const response = await axios.post(webhookUrl, { message: 'test webhookUrl' }, {
                    headers: {
                        'Authorization': `token ${authorizationToken}`,
                    }
                })
                if (response) {
                    const destructedRegistrationTeamWebhook = {
                        teamId: teamId,
                        teamInsideId: teamExternalId.id,
                        webhookUrl: webhookUrl,
                        events: events,
                        authorizationToken
                    };
                    await WebhookTeamEvent.create(destructedRegistrationTeamWebhook);
                    res.sendStatus(201);
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

module.exports = eventsWebhookRouter;
