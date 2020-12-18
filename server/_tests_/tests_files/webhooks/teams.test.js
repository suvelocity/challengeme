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
  webhookTeamRegistration,
} = require('../../mocks');

const notExistTeam = '7a9d9cf9-5f9a-4bf3-b582-6790d51d2782';

describe('Testing assignments routes', () => {
  beforeEach(async () => {
    await User.destroy({ truncate: true, force: true });
    await UserTeam.destroy({ truncate: true, force: true });
    await Team.destroy({ truncate: true, force: true });
    await WebhookAccessKey.destroy({ truncate: true, force: true });
    await WebhookTeam.destroy({ truncate: true, force: true });
    await WebhookEvent.destroy({ truncate: true, force: true });
    await WebhookEventTeam.destroy({ truncate: true, force: true });
  });

  test('Can entity create team with leaders already exist users', async (done) => {
    await WebhookAccessKey.bulkCreate(webhookAccessKeyMock);
    await User.bulkCreate(usersMock);

    const missingUsersOnTheSystem = await request(app)
      .post('/api/v1/webhooks/teams')
      .send(webhookTeamRegistration.fail.onlyLeaders)
      .set('authorization', `bearer ${await generateWebhookToken(webhookAccessKeyMock[0])}`);

    expect(missingUsersOnTheSystem.status).toBe(404);
    expect(missingUsersOnTheSystem.body.message)
      .toBe(`${webhookTeamRegistration.fail.onlyLeaders.leaders.map((leader) => leader.userName)} do not Exist in The System, Please Add Them Inside 'usersToCreate' Array`);

    const successRegistration = await request(app)
      .post('/api/v1/webhooks/teams')
      .send(webhookTeamRegistration.success.onlyLeaders)
      .set('authorization', `bearer ${await generateWebhookToken(webhookAccessKeyMock[0])}`);

    expect(successRegistration.status).toBe(201);
    expect(successRegistration.body.message).toBe(`Create ${webhookTeamRegistration.success.onlyLeaders.teamName} Team Success`);
    expect(successRegistration.body).toHaveProperty('leaders');
    expect(successRegistration.body.leaders).toHaveLength(2);
    expect(successRegistration.body).toHaveProperty('teamId');

    const unauthorized = await request(app)
      .post('/api/v1/webhooks/teams')
      .send(webhookTeamRegistration.success.onlyLeaders)
      .set('authorization', 'bearer unauthorized');

    expect(unauthorized.status).toBe(401);
    done();
  });

  test('Can entity create team with leaders and create users', async (done) => {
    await WebhookAccessKey.bulkCreate(webhookAccessKeyMock);
    await User.bulkCreate(usersMock);

    const missingUsersOnTheSystem = await request(app)
      .post('/api/v1/webhooks/teams')
      .send(webhookTeamRegistration.fail.leadersNotInCreateList)
      .set('authorization', `bearer ${await generateWebhookToken(webhookAccessKeyMock[0])}`);

    expect(missingUsersOnTheSystem.status).toBe(404);
    expect(missingUsersOnTheSystem.body.message)
      .toBe('roy do not Exist in The System, Please Add Them Inside \'usersToCreate\' Array');

    const alreadyExistUsersOnTheSystem1 = await request(app)
      .post('/api/v1/webhooks/teams')
      .send(webhookTeamRegistration.fail.usersAlreadyExist)
      .set('authorization', `bearer ${await generateWebhookToken(webhookAccessKeyMock[0])}`);

    expect(alreadyExistUsersOnTheSystem1.status).toBe(409);
    expect(alreadyExistUsersOnTheSystem1.body.message).toBe('There are usernames that already exists');
    expect(alreadyExistUsersOnTheSystem1.body.userNamesTakenAlready).toStrictEqual(['regularUser']);

    const successRegistration = await request(app)
      .post('/api/v1/webhooks/teams')
      .send(webhookTeamRegistration.success.leadersWithUsers)
      .set('authorization', `bearer ${await generateWebhookToken(webhookAccessKeyMock[0])}`);

    expect(successRegistration.status).toBe(201);
    expect(successRegistration.body.message).toBe(`Create ${webhookTeamRegistration.success.leadersWithUsers.teamName} Team With ${webhookTeamRegistration.success.leadersWithUsers.usersToCreate.length} New Users Success`);
    expect(successRegistration.body).toHaveProperty('leaders');
    expect(successRegistration.body.leaders).toHaveLength(2);
    expect(successRegistration.body).toHaveProperty('teamId');
    expect(successRegistration.body).toHaveProperty('newUsers');
    successRegistration.body.newUsers.forEach((user) => {
      expect(user).toHaveProperty('userName');
      expect(user).toHaveProperty('password');
    });

    const unauthorized = await request(app)
      .post('/api/v1/webhooks/teams')
      .send(webhookTeamRegistration.success.leadersWithUsers)
      .set('authorization', 'bearer unauthorized');

    expect(unauthorized.status).toBe(401);
    done();
  });

  test('Can entity create team with leaders already exist users and register events', async (done) => {
    await WebhookAccessKey.bulkCreate(webhookAccessKeyMock);
    await User.bulkCreate(usersMock);
    await WebhookEvent.bulkCreate(webhookEventMock);

    const missingUsersOnTheSystem1 = await request(app)
      .post('/api/v1/webhooks/teams')
      .send(webhookTeamRegistration.fail.leadersNotExistAndEvents)
      .set('authorization', `bearer ${await generateWebhookToken(webhookAccessKeyMock[0])}`);

    expect(missingUsersOnTheSystem1.status).toBe(404);
    expect(missingUsersOnTheSystem1.body.message)
      .toBe(`${webhookTeamRegistration.fail.leadersNotExistAndEvents.leaders.map((leader) => leader.userName)} do not Exist in The System, Please Add Them Inside 'usersToCreate' Array`);

    const notGoodEvents = await request(app)
      .post('/api/v1/webhooks/teams')
      .send(webhookTeamRegistration.fail.leadersAndBadEvents)
      .set('authorization', `bearer ${await generateWebhookToken(webhookAccessKeyMock[0])}`);

    expect(notGoodEvents.status).toBe(207);
    expect(notGoodEvents.body.message).toBe(`Create ${webhookTeamRegistration.success.onlyLeaders.teamName} Team Success`);
    expect(notGoodEvents.body).toHaveProperty('leaders');
    expect(notGoodEvents.body.leaders).toHaveLength(2);
    expect(notGoodEvents.body.eventRegistrationStatus).toBe(404);
    expect(notGoodEvents.body.eventRegistrationMessage).toBe('There is no such events, You need to registered on /api/v1/webhook/events/registration again');
    expect(notGoodEvents.body).toHaveProperty('teamId');

    const successRegistration = await request(app)
      .post('/api/v1/webhooks/teams')
      .send(webhookTeamRegistration.success.leadersAndEvents)
      .set('authorization', `bearer ${await generateWebhookToken(webhookAccessKeyMock[0])}`);

    expect(successRegistration.status).toBe(201);
    expect(successRegistration.body.message).toBe(`Create ${webhookTeamRegistration.success.leadersAndEvents.teamName} Team Success`);
    expect(successRegistration.body).toHaveProperty('leaders');
    expect(successRegistration.body.leaders).toHaveLength(2);
    expect(successRegistration.body).toHaveProperty('teamId');
    expect(successRegistration.body.eventRegistrationStatus).toBe(201);
    expect(successRegistration.body.eventRegistrationMessage).toBe('Events Registration Success');

    const unauthorized = await request(app)
      .post('/api/v1/webhooks/teams')
      .send(webhookTeamRegistration.success.leadersAndEvents)
      .set('authorization', 'bearer unauthorized');

    expect(unauthorized.status).toBe(401);
    done();
  });

  test('Can entity create team with leaders and create users and register events', async (done) => {
    await WebhookAccessKey.bulkCreate(webhookAccessKeyMock);
    await User.bulkCreate(usersMock);
    await WebhookEvent.bulkCreate(webhookEventMock);

    const notGoodEvents = await request(app)
      .post('/api/v1/webhooks/teams')
      .send(webhookTeamRegistration.fail.fullRequestAndBadEvents)
      .set('authorization', `bearer ${await generateWebhookToken(webhookAccessKeyMock[0])}`);

    expect(notGoodEvents.status).toBe(207);
    expect(notGoodEvents.body.message).toBe(`Create ${webhookTeamRegistration.fail.fullRequestAndBadEvents.teamName} Team With ${webhookTeamRegistration.fail.fullRequestAndBadEvents.usersToCreate.length} New Users Success`);
    expect(notGoodEvents.body).toHaveProperty('leaders');
    expect(notGoodEvents.body.leaders).toHaveLength(2);
    expect(notGoodEvents.body.eventRegistrationStatus).toBe(404);
    expect(notGoodEvents.body.eventRegistrationMessage).toBe('There is no such events, You need to registered on /api/v1/webhook/events/registration again');
    expect(notGoodEvents.body).toHaveProperty('teamId');

    const successRegistration = await request(app)
      .post('/api/v1/webhooks/teams')
      .send(webhookTeamRegistration.success.fullRequest)
      .set('authorization', `bearer ${await generateWebhookToken(webhookAccessKeyMock[0])}`);

    expect(successRegistration.status).toBe(201);
    expect(successRegistration.body.message).toBe(`Create ${webhookTeamRegistration.fail.fullRequestAndBadEvents.teamName} Team With ${webhookTeamRegistration.fail.fullRequestAndBadEvents.usersToCreate.length} New Users Success`);
    expect(successRegistration.body).toHaveProperty('leaders');
    expect(successRegistration.body.leaders).toHaveLength(2);
    expect(successRegistration.body).toHaveProperty('teamId');
    expect(successRegistration.body.eventRegistrationStatus).toBe(201);
    expect(successRegistration.body.eventRegistrationMessage).toBe('Events Registration Success');
    successRegistration.body.newUsers.forEach((user) => {
      expect(user).toHaveProperty('userName');
      expect(user).toHaveProperty('password');
    });

    const unauthorized = await request(app)
      .post('/api/v1/webhooks/teams')
      .send(webhookTeamRegistration.success.fullRequest)
      .set('authorization', 'bearer unauthorized');

    expect(unauthorized.status).toBe(401);
    done();
  });

  test('Can entity add users on team he create', async (done) => {
    await WebhookAccessKey.bulkCreate(webhookAccessKeyMock);
    await WebhookEvent.bulkCreate(webhookEventMock);
    await User.bulkCreate(usersMock);
    await UserTeam.bulkCreate(usersTeamsMock);
    await Team.bulkCreate(teamsMock);
    await WebhookTeam.bulkCreate(webhookTeamMock);
    await WebhookEventTeam.bulkCreate(webhookTeamEventsMock);

    const requestBody = {
      usersToCreate: [{
        userName: 'david',
        email: 'david@email.com',
        leader: 'true',
      },
      {
        userName: 'omer',
        email: 'omer@email.com',
      }],
    };

    const noSuchTeam = await request(app)
      .post(`/api/v1/webhooks/teams/add-users/${notExistTeam}`)
      .send(requestBody)
      .set('authorization', `bearer ${await generateWebhookToken(webhookAccessKeyMock[1])}`);

    expect(noSuchTeam.status).toBe(404);
    expect(noSuchTeam.body.message).toBe(`There is no such team with ${notExistTeam} team id`);

    const successAddUsers = await request(app)
      .post(`/api/v1/webhooks/teams/add-users/${teamsMock[3].externalId}`)
      .send(requestBody)
      .set('authorization', `bearer ${await generateWebhookToken(webhookAccessKeyMock[1])}`);

    expect(successAddUsers.status).toBe(201);
    expect(successAddUsers.body.message).toBe(`Add ${requestBody.usersToCreate.length} users to ${teamsMock[3].name} team Success`);
    expect(successAddUsers.body).toHaveProperty('leaders');
    expect(successAddUsers.body.leaders).toHaveLength(1);
    expect(successAddUsers.body).toHaveProperty('newUsers');
    successAddUsers.body.newUsers.forEach((user) => {
      expect(user).toHaveProperty('userName');
      expect(user).toHaveProperty('password');
    });

    const unauthorized = await request(app)
      .post(`/api/v1/webhooks/teams/add-users/${teamsMock[3].externalId}`)
      .send({
        webhookUrl: 'http://localhost:8090/api/v1/webhook',
        events: ['submittedChallenge', 'startedChallenge'],
      })
      .set('authorization', `bearer ${await generateWebhookToken(webhookAccessKeyMock[0])}`);

    expect(unauthorized.status).toBe(401);
    done();
  });

  test('Can entity change permissions on team he create', async (done) => {
    await WebhookAccessKey.bulkCreate(webhookAccessKeyMock);
    await WebhookEvent.bulkCreate(webhookEventMock);
    await User.bulkCreate(usersMock);
    await UserTeam.bulkCreate(usersTeamsMock);
    await Team.bulkCreate(teamsMock);
    await WebhookTeam.bulkCreate(webhookTeamMock);
    await WebhookEventTeam.bulkCreate(webhookTeamEventsMock);

    const requestBody = {
      usersToBeLeaders: [
        {
          userName: 'danTheKing',
        },
        {
          userName: 'mosesTheKing',
        }],
    };

    const noSuchTeam = await request(app)
      .patch(`/api/v1/webhooks/teams/change-permissions/${notExistTeam}`)
      .send(requestBody)
      .set('authorization', `bearer ${await generateWebhookToken(webhookAccessKeyMock[1])}`);

    expect(noSuchTeam.status).toBe(404);
    expect(noSuchTeam.body.message).toBe(`There is no such team with ${notExistTeam} team id`);

    const thereNoSuchUsers = await request(app)
      .patch(`/api/v1/webhooks/teams/change-permissions/${teamsMock[4].externalId}`)
      .send(requestBody)
      .set('authorization', `bearer ${await generateWebhookToken(webhookAccessKeyMock[0])}`);

    expect(thereNoSuchUsers.status).toBe(404);
    expect(thereNoSuchUsers.body.message).toBe('danTheKing,mosesTheKing Are not exist on this team, Please check the \'usersToBeLeaders\' list that will contain only team members');

    const successChange = await request(app)
      .patch(`/api/v1/webhooks/teams/change-permissions/${teamsMock[3].externalId}`)
      .send(requestBody)
      .set('authorization', `bearer ${await generateWebhookToken(webhookAccessKeyMock[1])}`);

    expect(successChange.status).toBe(200);
    expect(successChange.body.message).toBe(`Update ${requestBody.usersToBeLeaders.length} Users Permission`);

    const unauthorized = await request(app)
      .patch(`/api/v1/webhooks/teams/change-permissions/${teamsMock[3].externalId}`)
      .send(requestBody)
      .set('authorization', `bearer ${await generateWebhookToken(webhookAccessKeyMock[0])}`);

    expect(unauthorized.status).toBe(401);
    done();
  });
});
