const request = require('supertest');
const app = require('../../../app');
const {
  WebhookEvent,
  WebhookEventTeam,
  WebhookTeam,
  WebhookAccessKey,
  User,
  Team,
  UserTeam,
} = require('../../../models');
const { generateWebhookToken } = require('../../utils');
const {
  webhookEventMock,
  webhookAccessKeyMock,
  webhookTeamMock,
  webhookTeamEventsMock,
  usersMock,
  usersTeamsMock,
  teamsMock,
} = require('../../mocks');

describe('Testing assignments routes', () => {
  beforeEach(async () => {
    await WebhookAccessKey.destroy({ truncate: true, force: true });
    await WebhookEvent.destroy({ truncate: true, force: true });
    await User.destroy({ truncate: true, force: true });
    await UserTeam.destroy({ truncate: true, force: true });
    await Team.destroy({ truncate: true, force: true });
    await WebhookTeam.destroy({ truncate: true, force: true });
    await WebhookEventTeam.destroy({ truncate: true, force: true });
  });

  test('Can entity get all webhook events available', async (done) => {
    await WebhookAccessKey.bulkCreate(webhookAccessKeyMock);
    await WebhookEvent.bulkCreate(webhookEventMock);
    await User.bulkCreate(usersMock);

    const allEvents = await request(app)
      .get('/api/v1/webhooks/events/all')
      .set('authorization', `bearer ${await generateWebhookToken(webhookAccessKeyMock[0])}`);

    expect(allEvents.status).toBe(200);
    expect(allEvents.body).toHaveLength(webhookEventMock.length);

    const unauthorized = await request(app)
      .get('/api/v1/webhooks/events/all')
      .set('authorization', 'bearer unauthorized');

    expect(unauthorized.status).toBe(401);
    done();
  });

  test('Can entity get webhook events by query available', async (done) => {
    await WebhookAccessKey.bulkCreate(webhookAccessKeyMock);
    await WebhookEvent.bulkCreate(webhookEventMock);
    await User.bulkCreate(usersMock);

    const eventsByNameQuery = await request(app)
      .get('/api/v1/webhooks/events/all')
      .query({ name: 'submittedChallenge' })
      .set('authorization', `bearer ${await generateWebhookToken(webhookAccessKeyMock[0])}`);

    expect(eventsByNameQuery.status).toBe(200);
    expect(eventsByNameQuery.body).toHaveLength(1);
    expect(eventsByNameQuery.body[0])
      .toBe(webhookEventMock.find((elem) => elem.name === 'submittedChallenge').name);

    const unauthorized = await request(app)
      .get('/api/v1/webhooks/events/all')
      .query({ name: 'submittedChallenge' })
      .set('authorization', 'bearer unauthorized');

    expect(unauthorized.status).toBe(401);
    done();
  });

  test('Can entity get webhook events he registered to', async (done) => {
    await WebhookAccessKey.bulkCreate(webhookAccessKeyMock);
    await WebhookEvent.bulkCreate(webhookEventMock);
    await User.bulkCreate(usersMock);
    await UserTeam.bulkCreate(usersTeamsMock);
    await Team.bulkCreate(teamsMock);

    const teamNotRRegisteredToEvents = await request(app)
      .get(`/api/v1/webhooks/events/registered/${teamsMock[4].externalId}`)
      .set('authorization', `bearer ${await generateWebhookToken(webhookAccessKeyMock[0])}`);

    expect(teamNotRRegisteredToEvents.status).toBe(200);
    expect(teamNotRRegisteredToEvents.body.message).toBe('This team are not registered on any event on our system');

    await WebhookTeam.bulkCreate(webhookTeamMock);
    await WebhookEventTeam.bulkCreate(webhookTeamEventsMock);

    const allEventsTeamRegistered = await request(app)
      .get(`/api/v1/webhooks/events/registered/${teamsMock[4].externalId}`)
      .set('authorization', `bearer ${await generateWebhookToken(webhookAccessKeyMock[0])}`);

    expect(allEventsTeamRegistered.status).toBe(200);
    expect(allEventsTeamRegistered.body).toHaveLength(1);
    expect(allEventsTeamRegistered.body[0].events).toHaveLength(2);

    const unauthorized = await request(app)
      .get(`/api/v1/webhooks/events/registered/${teamsMock[3].externalId}`)
      .set('authorization', 'bearer unauthorized');

    expect(unauthorized.status).toBe(401);
    done();
  });

  test('Can entity register to new webhook events on the system', async (done) => {
    await WebhookAccessKey.bulkCreate(webhookAccessKeyMock);
    await WebhookEvent.bulkCreate(webhookEventMock);
    await User.bulkCreate(usersMock);
    await UserTeam.bulkCreate(usersTeamsMock);
    await Team.bulkCreate(teamsMock);
    await WebhookTeam.bulkCreate(webhookTeamMock);
    await WebhookEventTeam.bulkCreate(webhookTeamEventsMock);

    const notExistTeam = '7a9d9cf9-5f9a-4bf3-b582-6790d51d2782';

    const noSuchTeam = await request(app)
      .post(`/api/v1/webhooks/events/registration/${notExistTeam}`)
      .send({
        webhookUrl: 'http://localhost:8090/api/v1/webhook',
        events: ['submittedChallenge', 'startedChallenge'],
        authorizationToken: '1234567abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
      })
      .set('authorization', `bearer ${await generateWebhookToken(webhookAccessKeyMock[1])}`);

    expect(noSuchTeam.status).toBe(404);
    expect(noSuchTeam.body.message).toBe(`There is no such team with ${notExistTeam} team id`);

    const alreadyRegisteredToEvents = await request(app)
      .post(`/api/v1/webhooks/events/registration/${teamsMock[3].externalId}`)
      .send({
        webhookUrl: 'http://localhost:8090/api/v1/webhook',
        events: ['submittedChallenge', 'startedChallenge'],
        authorizationToken: '1234567abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
      })
      .set('authorization', `bearer ${await generateWebhookToken(webhookAccessKeyMock[1])}`);

    expect(alreadyRegisteredToEvents.status).toBe(409);
    expect(alreadyRegisteredToEvents.body.message).toBe('You already registered with submittedChallenge event');

    const noSuchAllEvents = await request(app)
      .post(`/api/v1/webhooks/events/registration/${teamsMock[3].externalId}`)
      .send({
        webhookUrl: 'http://localhost:8090/api/v1/webhook',
        events: ['efg', 'abcd'],
        authorizationToken: '1234567abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
      })
      .set('authorization', `bearer ${await generateWebhookToken(webhookAccessKeyMock[1])}`);

    expect(noSuchAllEvents.status).toBe(404);
    expect(noSuchAllEvents.body.message).toBe('There is no such events');

    const noSuchEvents1 = await request(app)
      .post(`/api/v1/webhooks/events/registration/${teamsMock[3].externalId}`)
      .send({
        webhookUrl: 'http://localhost:8090/api/v1/webhook',
        events: ['submittedChallenge', 'abcd'],
        authorizationToken: '1234567abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
      })
      .set('authorization', `bearer ${await generateWebhookToken(webhookAccessKeyMock[1])}`);

    expect(noSuchEvents1.status).toBe(404);
    expect(noSuchEvents1.body.message).toBe('There is no such events as abcd');

    const eventsRegisteredSuccess = await request(app)
      .post(`/api/v1/webhooks/events/registration/${teamsMock[3].externalId}`)
      .send({
        webhookUrl: 'http://localhost:8093/api/v1/webhook',
        events: ['startedChallenge', 'submittedChallenge'],
        authorizationToken: '1234567abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
      })
      .set('authorization', `bearer ${await generateWebhookToken(webhookAccessKeyMock[1])}`);

    expect(eventsRegisteredSuccess.status).toBe(201);
    expect(eventsRegisteredSuccess.body.message).toBe('Events Registration Success');

    const unauthorized = await request(app)
      .post(`/api/v1/webhooks/events/registration/${teamsMock[3].externalId}`)
      .set('authorization', `bearer ${await generateWebhookToken(webhookAccessKeyMock[0])}`);

    expect(unauthorized.status).toBe(401);
    done();
  });

  test('Can entity logout from webhook events on the system', async (done) => {
    await WebhookAccessKey.bulkCreate(webhookAccessKeyMock);
    await WebhookEvent.bulkCreate(webhookEventMock);
    await User.bulkCreate(usersMock);
    await UserTeam.bulkCreate(usersTeamsMock);
    await Team.bulkCreate(teamsMock);
    await WebhookTeam.bulkCreate(webhookTeamMock);
    await WebhookEventTeam.bulkCreate(webhookTeamEventsMock);

    const notExistTeam = '7a9d9cf9-5f9a-4bf3-b582-6790d51d2782';

    const noSuchTeam = await request(app)
      .delete(`/api/v1/webhooks/events/logout/${notExistTeam}`)
      .send({
        webhookUrl: 'http://localhost:8090/api/v1/webhook',
        events: ['submittedChallenge', 'startedChallenge'],
      })
      .set('authorization', `bearer ${await generateWebhookToken(webhookAccessKeyMock[1])}`);

    expect(noSuchTeam.status).toBe(404);
    expect(noSuchTeam.body.message).toBe(`There is no such team with ${notExistTeam} team id`);

    const notRegisteredToEvents = await request(app)
      .delete(`/api/v1/webhooks/events/logout/${teamsMock[3].externalId}`)
      .send({
        webhookUrl: 'http://localhost:8093/api/v1/webhook',
        events: ['submittedChallenge', 'startedChallenge'],
      })
      .set('authorization', `bearer ${await generateWebhookToken(webhookAccessKeyMock[1])}`);

    expect(notRegisteredToEvents.status).toBe(406);
    expect(notRegisteredToEvents.body.message).toBe('You are not registered to this events: \'submittedChallenge,startedChallenge\' with the specified webhookUrl');

    const notRegisteredToPartOfEvents = await request(app)
      .delete(`/api/v1/webhooks/events/logout/${teamsMock[3].externalId}`)
      .send({
        webhookUrl: 'http://localhost:8090/api/v1/webhook',
        events: ['submittedChallenge', 'startedChallenge'],
      })
      .set('authorization', `bearer ${await generateWebhookToken(webhookAccessKeyMock[1])}`);

    expect(notRegisteredToPartOfEvents.status).toBe(406);
    expect(notRegisteredToPartOfEvents.body.message).toBe('You are not registered to this events: \'startedChallenge\' with the specified webhookUrl');

    const eventsLogoutSuccess = await request(app)
      .delete(`/api/v1/webhooks/events/logout/${teamsMock[4].externalId}`)
      .send({
        webhookUrl: 'http://localhost:8091/api/v1/webhook',
        events: ['submittedChallenge', 'startedChallenge'],
      })
      .set('authorization', `bearer ${await generateWebhookToken(webhookAccessKeyMock[0])}`);

    expect(eventsLogoutSuccess.status).toBe(200);
    expect(eventsLogoutSuccess.body.message).toBe('Logout from submittedChallenge,startedChallenge Events Success');

    const unauthorized = await request(app)
      .delete(`/api/v1/webhooks/events/logout/${teamsMock[3].externalId}`)
      .send({
        webhookUrl: 'http://localhost:8090/api/v1/webhook',
        events: ['submittedChallenge', 'startedChallenge'],
      })
      .set('authorization', `bearer ${await generateWebhookToken(webhookAccessKeyMock[0])}`);

    expect(unauthorized.status).toBe(401);
    done();
  });

  test('Can entity change authorization webhook on the system', async (done) => {
    await WebhookAccessKey.bulkCreate(webhookAccessKeyMock);
    await WebhookEvent.bulkCreate(webhookEventMock);
    await User.bulkCreate(usersMock);
    await UserTeam.bulkCreate(usersTeamsMock);
    await Team.bulkCreate(teamsMock);
    await WebhookTeam.bulkCreate(webhookTeamMock);
    await WebhookEventTeam.bulkCreate(webhookTeamEventsMock);

    const notExistTeam = '7a9d9cf9-5f9a-4bf3-b582-6790d51d2782';

    const noSuchTeam = await request(app)
      .patch(`/api/v1/webhooks/events/authorization/${notExistTeam}`)
      .send({
        webhookUrl: 'http://localhost:8090/api/v1/webhook',
        authorizationToken: 'aaccc',
      })
      .set('authorization', `bearer ${await generateWebhookToken(webhookAccessKeyMock[1])}`);

    expect(noSuchTeam.status).toBe(404);
    expect(noSuchTeam.body.message).toBe(`There is no such team with ${notExistTeam} team id`);

    const thereIsNoWebhookExist = await request(app)
      .patch(`/api/v1/webhooks/events/authorization/${teamsMock[3].externalId}`)
      .send({
        webhookUrl: 'http://localhost:8093/api/v1/webhook',
        authorizationToken: 'aaccc',
      })
      .set('authorization', `bearer ${await generateWebhookToken(webhookAccessKeyMock[1])}`);

    expect(thereIsNoWebhookExist.status).toBe(404);
    expect(thereIsNoWebhookExist.body.message).toBe('Update Authorization Token Fail, There is no webhook url \'http://localhost:8093/api/v1/webhook\' fot this team');

    const changeAuthorizationSuccess = await request(app)
      .patch(`/api/v1/webhooks/events/authorization/${teamsMock[3].externalId}`)
      .send({
        webhookUrl: 'http://localhost:8090/api/v1/webhook',
        authorizationToken: 'aaccc',
      })
      .set('authorization', `bearer ${await generateWebhookToken(webhookAccessKeyMock[1])}`);

    expect(changeAuthorizationSuccess.status).toBe(200);
    expect(changeAuthorizationSuccess.body.message).toBe('Update Authorization Token Success');

    const webhookFromDb = await WebhookTeam.findOne({
      where: {
        teamId: teamsMock[3].id,
        webhookUrl: 'http://localhost:8090/api/v1/webhook',
      },
    });

    expect(webhookFromDb.authorizationToken).toBe('aaccc');

    const unauthorized = await request(app)
      .patch(`/api/v1/webhooks/events/authorization/${teamsMock[3].externalId}`)
      .send({
        webhookUrl: 'http://localhost:8090/api/v1/webhook',
        authorizationToken: 'aaccc',
      })
      .set('authorization', `bearer ${await generateWebhookToken(webhookAccessKeyMock[0])}`);

    expect(unauthorized.status).toBe(401);
    done();
  });

  test('Can entity change url webhook on the system', async (done) => {
    await WebhookAccessKey.bulkCreate(webhookAccessKeyMock);
    await WebhookEvent.bulkCreate(webhookEventMock);
    await User.bulkCreate(usersMock);
    await UserTeam.bulkCreate(usersTeamsMock);
    await Team.bulkCreate(teamsMock);
    await WebhookTeam.bulkCreate(webhookTeamMock);
    await WebhookEventTeam.bulkCreate(webhookTeamEventsMock);

    const notExistTeam = '7a9d9cf9-5f9a-4bf3-b582-6790d51d2782';

    const noSuchTeam = await request(app)
      .patch(`/api/v1/webhooks/events/url/${notExistTeam}`)
      .send({
        oldWebhookUrl: 'http://localhost:8090/api/v1/webhook',
        newWebhookUrl: 'http://localhost:8093/api/v1/webhook',
      })
      .set('authorization', `bearer ${await generateWebhookToken(webhookAccessKeyMock[1])}`);

    expect(noSuchTeam.status).toBe(404);
    expect(noSuchTeam.body.message).toBe(`There is no such team with ${notExistTeam} team id`);

    const thereIsNoWebhookExist = await request(app)
      .patch(`/api/v1/webhooks/events/url/${teamsMock[3].externalId}`)
      .send({
        oldWebhookUrl: 'http://localhost:8093/api/v1/webhook',
        newWebhookUrl: 'http://localhost:8098/api/v1/webhook',
      })
      .set('authorization', `bearer ${await generateWebhookToken(webhookAccessKeyMock[1])}`);

    expect(thereIsNoWebhookExist.status).toBe(404);
    expect(thereIsNoWebhookExist.body.message).toBe('Update url Fail, There is no webhook url \'http://localhost:8093/api/v1/webhook\' fot this team');

    const changeUrlSuccess = await request(app)
      .patch(`/api/v1/webhooks/events/url/${teamsMock[3].externalId}`)
      .send({
        oldWebhookUrl: 'http://localhost:8090/api/v1/webhook',
        newWebhookUrl: 'http://localhost:8098/api/v1/webhook',
      })
      .set('authorization', `bearer ${await generateWebhookToken(webhookAccessKeyMock[1])}`);

    expect(changeUrlSuccess.status).toBe(200);
    expect(changeUrlSuccess.body.message).toBe('Update Url Success');

    const webhookFromDb = await WebhookTeam.findOne({
      where: {
        teamId: teamsMock[3].id,
        webhookUrl: 'http://localhost:8098/api/v1/webhook',
      },
    });

    expect(webhookFromDb).toBeDefined();

    const unauthorized = await request(app)
      .patch(`/api/v1/webhooks/events/url/${teamsMock[3].externalId}`)
      .send({
        oldWebhookUrl: 'http://localhost:8090/api/v1/webhook',
        newWebhookUrl: 'http://localhost:8098/api/v1/webhook',
      })
      .set('authorization', `bearer ${await generateWebhookToken(webhookAccessKeyMock[0])}`);

    expect(unauthorized.status).toBe(401);
    done();
  });
});
