require('dotenv').config();
const axios = require('axios');
const { WebhookTeam, Team, User } = require('../models');

module.exports = async function webhookSendEvents(event) {
    try {
        const userWithTeams = await User.findOne({
            where: {
                id: event.userId
            },
            include: [
                {
                    model: Team,
                    through: {},
                    attributes: ['id'],
                    include: WebhookTeam
                },
            ],
        })

        const webhookTeamEvent = userWithTeams.Teams.map(t => t.WebhookTeams[0].dataValues);

        for (let index = 0; index < webhookTeamEvent.length; index++) {
            console.log(webhookTeamEvent[index].events);
            if (webhookTeamEvent[index].events[`${event.eventName}`] === 'true') {
                try {
                    console.table({ webhookUrl: webhookTeamEvent[index].webhookUrl, event, authorizationToken: webhookTeamEvent[index].authorizationToken })
                    const response = await axios.post(webhookTeamEvent[index].webhookUrl, event, {
                        headers: {
                            'Authorization': `token ${webhookTeamEvent[index].authorizationToken}`,
                        },
                    })
                    console.log('response', response.status);
                } catch (error) {
                    console.error(error);

                }
            }
        }
    } catch (error) {
        console.error(error);
    }
};
