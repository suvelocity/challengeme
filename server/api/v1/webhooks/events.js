const eventsWebhookRouter = require('express').Router();
const { Op } = require('sequelize');
const {
  WebhookTeam, WebhookEventTeam, WebhookEvent, Team,
} = require('../../../models');
const {
  webhookEventsValidation,
  webhookAuthorizationChangeValidation,
  webhookUrlChangeValidation,
  webhookEventsLogoutValidation,
} = require('../../../helpers/validator');
const checkTeamOwnerPermission = require('../../../middleware/checkTeamOwner');
const Filters = require('../../../helpers/Filters');

// get all webhook events on our system
eventsWebhookRouter.get('/all', async (req, res) => {
  const name = req.query.name ? { where: { name: { [Op.like]: `%${req.query.name}%` } } } : {};
  try {
    const allWebhookEvents = await WebhookEvent.findAll(name);
    const eventsName = allWebhookEvents.map((event) => event.name);
    return res.json(eventsName);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Cannot process request' });
  }
});

// get all webhook events this team are signed to, on our system
eventsWebhookRouter.get('/registered/:externalId', checkTeamOwnerPermission, async (req, res) => {
  try {
    const registered = await WebhookTeam.findAll({
      where: {
        teamId: req.team.id,
      },
      include: [{
        model: WebhookEvent,
        through: {
          attributes: [],
        },
      }],
    });
    const orderRegistered = registered.map((webhook) => {
      if (webhook.WebhookEvents.length > 0) {
        const cleanResponse = {
          teamId: req.team.externalId,
          teamName: req.team.name,
          webhookUrl: webhook.webhookUrl,
          authorizationToken: webhook.authorizationToken,
          events: webhook.WebhookEvents.map((event) => event.name),
        };
        return cleanResponse;
      }
      return null;
    }).filter((x) => !!x);
    if (orderRegistered.length === 0) return res.status(200).json({ message: 'This team are not registered on any event on our system' });
    return res.json(orderRegistered);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Cannot process request' });
  }
});

/*
request look like this :
header : {
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp // webhook token
}
params : e9db316f-4b2b-4f40-a096-5ee443007a00 // team id
body : {
    "webhookUrl": "http://localhost:8090/api/v1/webhook",
    "events":  ["submittedChallenge", "startedChallenge"],
    "authorizationToken": "1234567abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
}
*/
// register to events webhook
eventsWebhookRouter.post('/registration/:externalId', checkTeamOwnerPermission, async (req, res) => {
  const { externalId } = req.params;
  req.body.externalId = externalId;
  // Joi validation
  const { error } = webhookEventsValidation(req.body);
  if (error) {
    console.error(error.message);
    return res.status(400).json({ success: false, message: error.message });
  }

  const { webhookUrl, events, authorizationToken } = req.body;
  const eventsRegistrationResponse = await eventsRegistrationFunc({
    externalId, webhookUrl, events, authorizationToken,
  });
  return res.status(eventsRegistrationResponse.status).json(eventsRegistrationResponse.response);
});

/*
 header : {
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp // webhook token
}
params : e9db316f-4b2b-4f40-a096-5ee443007a00 // team id
body : {
    "webhookUrl": "http://localhost:8090/api/v1/webhook",
    "authorizationToken": "1234567abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" // new one
}
 */

// update authorization token
eventsWebhookRouter.patch('/authorization/:externalId', checkTeamOwnerPermission, async (req, res) => {
  const { externalId } = req.params;
  req.body.externalId = externalId;
  // Joi validation
  const { error } = webhookAuthorizationChangeValidation(req.body);
  if (error) {
    console.error(error.message);
    return res.status(400).json({ success: false, message: error.message });
  }

  const teamData = req.team;

  const { webhookUrl, authorizationToken } = req.body;
  try {
    const isWebhookExist = await WebhookTeam.update({
      authorizationToken,
    },
    {
      where: {
        webhookUrl,
        teamId: teamData.id,
      },
    });
    if (isWebhookExist[0] > 0) {
      return res.json({ message: 'Update Authorization Token Success' });
    }
    return res.status(404).json({ message: `Update Authorization Token Fail, There is no webhook url '${webhookUrl}' fot this team` });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ message: 'Cannot process request' });
  }
});

/*
 header : {
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp // webhook token
}
params : e9db316f-4b2b-4f40-a096-5ee443007a00 // team id
body : {
    "oldWebhookUrl": "http://localhost:8090/api/v1/webhook",
    "newWebhookUrl": "http://localhost:8090/api/v1/webhook", // new one
}
 */

// update webhookUrl
eventsWebhookRouter.patch('/url/:externalId', checkTeamOwnerPermission, async (req, res) => {
  const { externalId } = req.params;
  req.body.externalId = externalId;
  // Joi validation
  const { error } = webhookUrlChangeValidation(req.body);
  if (error) {
    console.error(error.message);
    return res.status(400).json({ success: false, message: error.message });
  }

  const { oldWebhookUrl, newWebhookUrl } = req.body;
  const teamData = req.team;
  try {
    const isWebhookExist = await WebhookTeam.update({
      webhookUrl: newWebhookUrl,
    },
    {
      where: {
        teamId: teamData.id,
        webhookUrl: oldWebhookUrl,
      },
    });
    if (isWebhookExist[0] > 0) {
      return res.json({ message: 'Update Url Success' });
    }
    return res.status(404).json({ message: `Update url Fail, There is no webhook url '${oldWebhookUrl}' fot this team` });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ message: 'Cannot process request' });
  }
});

/*
request look like this :
header : {
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp // webhook token
}
params : e9db316f-4b2b-4f40-a096-5ee443007a00 // team id
body : {
    "webhookUrl": "http://localhost:8090/api/v1/webhook",
    "events": ["submittedChallenge", "startedChallenge"]
}
*/

// update authorization token
eventsWebhookRouter.delete('/logout/:externalId', checkTeamOwnerPermission, async (req, res) => {
  const { externalId } = req.params;
  req.body.externalId = externalId;
  // Joi validation
  const { error } = webhookEventsLogoutValidation(req.body);
  if (error) {
    console.error(error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
  const { events, webhookUrl } = req.body;
  const teamData = req.team;
  try {
    const isWebhookExist = await WebhookTeam.findOne({
      where: {
        teamId: teamData.id,
        webhookUrl,
      },
      include: [{
        model: WebhookEventTeam,
        include: [{
          model: WebhookEvent,
          where: {
            name: events,
          },
        }],
      }],
    });
    if (!isWebhookExist) {
      return res.status(406).json({ message: `You are not registered to this events: '${events}' with the specified webhookUrl` });
    }
    const whatEventsAreNotExist = (event) => Filters.stringInObjectArray(isWebhookExist.WebhookEventTeams, event, 'WebhookEvent', 'name');
    if (!events.every(whatEventsAreNotExist)) {
      const missingEvents = events.filter((event) => !whatEventsAreNotExist(event));
      return res.status(406).json({ message: `You are not registered to this events: '${missingEvents}' with the specified webhookUrl` });
    }
    await WebhookEventTeam.destroy({
      where: {
        eventId: isWebhookExist.WebhookEventTeams.map((ev) => ev.toJSON().eventId),
        webhookId: isWebhookExist.toJSON().id,
      },
    });
    return res.json({ message: `Logout from ${events} Events Success` });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ message: 'Cannot process request' });
  }
});

async function eventsRegistrationFunc({
  externalId, webhookUrl, events, authorizationToken,
}) {
  try {
    const teamInsideId = await Team.findOne({
      where: {
        externalId,
      },
      include: [{
        model: WebhookTeam,
        where: {
          webhookUrl,
        },
        required: false,
      }],
    });
    if (!teamInsideId) return { status: 404, response: { message: `There is no such team with ${externalId} team id` } };
    const alreadyRegisteredId = teamInsideId.WebhookTeams[0] ? teamInsideId.WebhookTeams[0].id : null;
    const eventsFromDb = await WebhookEvent.findAll({
      where: {
        name: events,
      },
      include: [{
        model: WebhookEventTeam,
        where: {
          webhookId: alreadyRegisteredId,
        },
        required: false,
      }],
    });

    if (eventsFromDb.length === 0) return { status: 404, response: { message: 'There is no such events' } };
    if (events.length !== eventsFromDb.length) {
      const notExistEvents = events.filter((event) => !eventsFromDb.some((dbEvent) => event === dbEvent.name));
      return { status: 404, response: { message: `There is no such events as ${notExistEvents}` } };
    }

    let webhookEventTeamToCreate = [];
    if (alreadyRegisteredId) {
      const alreadySignEvents = eventsFromDb.map((e) => e.toJSON()).filter((x) => !!x.WebhookEventTeams[0]);
      if (alreadySignEvents.length > 0) {
        const ifManyEvents = (alreadySignEvents.length > 1) ? 's' : '';
        return {
          status: 409,
          response: {
            message: `You already registered with ${alreadySignEvents.map((event) => event.name)} event${ifManyEvents}`,
          },
        };
      }
      webhookEventTeamToCreate = eventsFromDb.map((event) => ({ webhookId: alreadyRegisteredId, eventId: event.id }));
    } else {
      const webhooksCreated = await WebhookTeam.create({
        teamId: teamInsideId.id,
        webhookUrl,
        authorizationToken,
      });
      webhookEventTeamToCreate = eventsFromDb.map((event) => ({ webhookId: webhooksCreated.id, eventId: event.id }));
    }
    await WebhookEventTeam.bulkCreate(webhookEventTeamToCreate);
    return { status: 201, response: { message: 'Events Registration Success' } };
  } catch (error) {
    console.error(error.message);
    return { status: 400, response: { message: 'Cannot process request' } };
  }
}

module.exports = eventsWebhookRouter;
module.exports.eventsRegistrationFunc = eventsRegistrationFunc;
