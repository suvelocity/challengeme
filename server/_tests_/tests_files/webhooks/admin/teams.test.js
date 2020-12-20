const request = require('supertest');
const app = require('../../../../app');
const { WebhookTeam, User } = require('../../../../models');
const { generateToken } = require('../../../utils');
const { webhookTeamMock, usersMock } = require('../../../mocks');

describe('Testing assignments routes', () => {
  beforeEach(async () => {
    await WebhookTeam.destroy({ truncate: true, force: true });
    await User.destroy({ truncate: true, force: true });
  });

  test('Can admin get all webhook teams', async (done) => {
    await WebhookTeam.bulkCreate(webhookTeamMock);
    await User.bulkCreate(usersMock);
    const allTeams = await request(app)
      .get('/api/v1/webhooks/admin/teams')
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(allTeams.status).toBe(200);
    expect(allTeams.body).toHaveLength(webhookTeamMock.length);

    const unauthorized = await request(app)
      .get('/api/v1/webhooks/admin/teams')
      .set('authorization', `bearer ${generateToken(usersMock[1])}`);

    expect(unauthorized.status).toBe(401);
    done();
  });

  test('Can admin get webhook teams by query', async (done) => {
    await WebhookTeam.bulkCreate(webhookTeamMock);
    await User.bulkCreate(usersMock);

    const teamsByIdQuery = await request(app)
      .get('/api/v1/webhooks/admin/teams')
      .query({ id: 1 })
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(teamsByIdQuery.status).toBe(200);
    expect(teamsByIdQuery.body).toHaveLength(1);
    expect(teamsByIdQuery.body[0].webhookUrl)
      .toBe(webhookTeamMock.find((elem) => elem.id === 1).webhookUrl);

    const unauthorized = await request(app)
      .get('/api/v1/webhooks/admin/teams')
      .set('authorization', `bearer ${generateToken(usersMock[1])}`);

    expect(unauthorized.status).toBe(401);
    done();
  });

  test('Can admin add new webhook team to the system', async (done) => {
    await WebhookTeam.bulkCreate(webhookTeamMock);
    await User.bulkCreate(usersMock);

    const allTeamsBeforeAdded = await request(app)
      .get('/api/v1/webhooks/admin/teams')
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(allTeamsBeforeAdded.status).toBe(200);
    expect(allTeamsBeforeAdded.body).toHaveLength(webhookTeamMock.length);

    const newTeam = await request(app)
      .post('/api/v1/webhooks/admin/teams')
      .send({
        teamId: 1,
        webhookUrl: 'http://localhost:8095/api/v1/webhook',
        authorizationToken: 'sdfndkjfndsjkfnsd',
        events: ['startedChallenge'],
      })
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(newTeam.status).toBe(201);

    const allTeamsAfterAdded = await request(app)
      .get('/api/v1/webhooks/admin/teams')
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(allTeamsAfterAdded.status).toBe(200);
    expect(allTeamsAfterAdded.body).toHaveLength(webhookTeamMock.length + 1);

    const unauthorized = await request(app)
      .post('/api/v1/webhooks/admin/teams')
      .send({
        teamId: 1,
        webhookUrl: 'http://localhost:8097/api/v1/webhook',
        authorizationToken: 'sdfndkjfndsjkfnsd',
        events: ['submittedChallenge'],
      })
      .set('authorization', `bearer ${generateToken(usersMock[1])}`);

    expect(unauthorized.status).toBe(401);
    done();
  });

  test('Can admin edit webhook team on the system', async (done) => {
    await WebhookTeam.bulkCreate(webhookTeamMock);
    await User.bulkCreate(usersMock);

    const teamsByIdQuery = await request(app)
      .get('/api/v1/webhooks/admin/teams')
      .query({ id: 1 })
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(teamsByIdQuery.status).toBe(200);
    expect(teamsByIdQuery.body).toHaveLength(1);
    expect(teamsByIdQuery.body[0].webhookUrl)
      .toBe(webhookTeamMock.find((elem) => elem.id === 1).webhookUrl);

    const changedAccessKet = await request(app)
      .patch('/api/v1/webhooks/admin/teams/1')
      .send({
        webhookUrl: 'http://localhost:8095/api/v1/webhook',
        authorizationToken: 'sdfndkjfndsjkfnsd',
      })
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(changedAccessKet.status).toBe(200);
    expect(changedAccessKet.body.message).toBe('Update Success');

    const teamsByIdQuery2 = await request(app)
      .get('/api/v1/webhooks/admin/teams')
      .query({ id: 1 })
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(teamsByIdQuery2.status).toBe(200);
    expect(teamsByIdQuery2.body).toHaveLength(1);
    expect(teamsByIdQuery2.body[0].webhookUrl).toBe('http://localhost:8095/api/v1/webhook');

    const unauthorized = await request(app)
      .patch('/api/v1/webhooks/admin/teams/1')
      .send({
        webhookUrl: 'http://localhost:8095/api/v1/webhook',
        authorizationToken: 'sdfndkjfndsjkfnsd',
      })
      .set('authorization', `bearer ${generateToken(usersMock[1])}`);

    expect(unauthorized.status).toBe(401);
    done();
  });

  test('Can admin delete webhook team from the system', async (done) => {
    await WebhookTeam.bulkCreate(webhookTeamMock);
    await User.bulkCreate(usersMock);

    const allTeamsBeforeDelete = await request(app)
      .get('/api/v1/webhooks/admin/teams')
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(allTeamsBeforeDelete.status).toBe(200);
    expect(allTeamsBeforeDelete.body).toHaveLength(webhookTeamMock.length);

    const removeTeam = await request(app)
      .delete('/api/v1/webhooks/admin/teams/1')
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(removeTeam.status).toBe(204);

    const allTeamsAfterAdded = await request(app)
      .get('/api/v1/webhooks/admin/teams')
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(allTeamsAfterAdded.status).toBe(200);
    expect(allTeamsAfterAdded.body).toHaveLength(webhookTeamMock.length - 1);

    const unauthorized = await request(app)
      .delete('/api/v1/webhooks/admin/teams/1')
      .set('authorization', `bearer ${generateToken(usersMock[1])}`);

    expect(unauthorized.status).toBe(401);
    done();
  });
});
