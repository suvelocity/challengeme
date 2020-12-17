require('dotenv').config();
const axios = require('axios');
const {
  WebhookTeam, WebhookEvent, WebhookTeamError, Team, UserTeam,
} = require('../models');

module.exports = async function webhookSendEvents(event) {
  try {
    const userWithTeams = await UserTeam.findAll({
      where: {
        userId: event.userId,
        permission: 'student',
      },
      include: [{
        model: Team,
        attributes: ['id', 'name'],
        include: {
          model: WebhookTeam,
          include: {
            model: WebhookEvent,
            through: {},
            where: {
              name: event.eventName,
            },
          },
        },
      }],
    });

    const webhooks = [];
    userWithTeams.forEach((team) => {
      if (team.Team.WebhookTeams.length > 0) {
        team.Team.WebhookTeams.forEach((hook) => {
          const jsonHook = hook.toJSON();
          jsonHook.team = team.Team.name;
          webhooks.push(jsonHook);
        });
      }
    });

    for (let index = 0; index < webhooks.length; index++) {
      try {
        console.table([{ team: webhooks[index].team, webhookUrl: webhooks[index].webhookUrl, authorizationToken: webhooks[index].authorizationToken }]);
        event.team = webhooks[index].team;
        delete event.userId;
        await axios.post(webhooks[index].webhookUrl, event, {
          headers: {
            Authorization: `token ${webhooks[index].authorizationToken}`,
          },
        });
      } catch (error) {
        const errorToDb = {
          webhookId: webhooks[index].id,
          message: error.message,
          data: error,
        };
        if (error.response) {
          console.error(error.response.status, error.message);
          errorToDb.statusCode = error.response.status;
        } else {
          console.error(500, error.message);
          errorToDb.statusCode = 500;
        }
        await WebhookTeamError.create(errorToDb);
      }
    }
  } catch (error) {
    console.error(error);
  }
};
