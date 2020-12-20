/**
 * @jest-environment node
 */
const request = require('supertest');
const nock = require('nock');
const app = require('../../../app');
const {
  User, UserTeam, Team, WebhookTeam, WebhookAccessKey,
} = require('../../../models');
const {
  usersMock, usersTeamsMock, teamsMock, webhookTeamMock, webhookAccessKeyMock,
} = require('../../mocks');
const { generateToken } = require('../../utils');
const webhookSendEvents = require('../../../helpers/webhookSendEvents');

describe('Webhook Send Events Process', () => {
  beforeAll(async () => {
    await UserTeam.destroy({ truncate: true, force: true });
    await WebhookTeam.destroy({ truncate: true, force: true });
    await WebhookAccessKey.destroy({ truncate: true, force: true });
    await Team.destroy({ truncate: true, force: true });
    await User.destroy({ truncate: true, force: true });

    await User.bulkCreate(usersMock);
    await Team.bulkCreate(teamsMock);
    await WebhookTeam.bulkCreate(webhookTeamMock);
    await WebhookAccessKey.bulkCreate(webhookAccessKeyMock);
    await UserTeam.bulkCreate(usersTeamsMock);
  });

  test('Check If Webhook Send Events To The Single Registered Entity', async (done) => {
    const webhookPostEventRequest = await nock('http://localhost:8091', {
      reqHeaders: {
        Authorization: `token ${webhookTeamMock[0].authorizationToken}`,
      },
    })
      .post('/api/v1/webhook', {
        eventName: 'startedChallenge',
        userName: 'suvelocity',
        challengeName: 'JWT - Node.js',
      })
      .reply(200);
    const triggerEvent = await request(app)
      .post('/api/v1/webhooks/trigger-events/start-challenge')
      .send({ challengeName: 'JWT - Node.js' })
      .set('authorization', `bearer ${generateToken(usersMock[7])}`);

    expect(triggerEvent.status).toBe(200);

    setTimeout(() => {
      expect(webhookPostEventRequest.isDone()).toEqual(true);
    }, 2000);

    done();
  }, 10000);

  test('Check If Webhook Send Events To The multiple Registered Entity', async (done) => {
    const webhookPostEventRequest = nock('http://localhost:8090', {
      reqHeaders: {
        Authorization: `token ${webhookTeamMock[0].authorizationToken}`,
      },
    })
      .post('/api/v1/webhook', { eventName: 'submittedChallenge', userId: usersMock[4].id })
      .reply(200);

    const webhookPostEventRequest1 = nock('http://localhost:8092', {
      reqHeaders: {
        Authorization: `token ${webhookTeamMock[2].authorizationToken}`,
      },
    })
      .post('/api/v1/webhook', { eventName: 'submittedChallenge', userId: usersMock[4].id })
      .reply(200);

    await webhookSendEvents({ eventName: 'submittedChallenge', userId: usersMock[4].id });
    setTimeout(() => {
      expect(webhookPostEventRequest.isDone()).toEqual(true);
      expect(webhookPostEventRequest1.isDone()).toEqual(true);
    }, 2000);

    done();
  }, 10000);
});
