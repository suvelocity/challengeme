require('dotenv').config();
const axios = require('axios');
const { WebhookTeamEvent, Team, User } = require('../models');

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
                    attributes: ["externalId"],
                },
            ],
        })
        const teamsIds = userWithTeams.Teams.map(team => {
            return team.externalId
        }).filter(a => !!a)

        const webhookTeamEvent = await WebhookTeamEvent.findAll({
            where: {
                teamId: teamsIds
            }
        })

        webhookTeamEvent.forEach(async (webhook) => {
            console.log(webhook.events);
            if (webhook.events[`${event.eventName}`] === 'true') {
                try {
                    const { data: body } = await axios.post(webhook.webhookUrl, event, {
                        headers: {
                            'Authorization': `token ${webhook.authorizationToken}`,
                        },
                    })
                    console.log(body);
                } catch (error) {
                    console.error(error);
                }
            }
        })
    } catch (error) {
        console.error(error);
    }
};
