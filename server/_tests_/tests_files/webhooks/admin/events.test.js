const request = require('supertest');
const app = require('../../../../app');
const { WebhookEvent, User } = require('../../../../models');
const { generateToken } = require('../../../utils');
const { webhookEventMock, usersMock } = require('../../../mocks');

describe('Testing assignments routes', () => {
  beforeEach(async () => {
    await WebhookEvent.destroy({ truncate: true, force: true });
    await User.destroy({ truncate: true, force: true });
  });

  test('Can admin get all webhook events', async (done) => {
    await WebhookEvent.bulkCreate(webhookEventMock);
    await User.bulkCreate(usersMock);
    const allEvents = await request(app)
      .get('/api/v1/webhooks/admin/events')
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(allEvents.status).toBe(200);
    expect(allEvents.body).toHaveLength(webhookEventMock.length);

    const unauthorized = await request(app)
      .get('/api/v1/webhooks/admin/events')
      .set('authorization', `bearer ${generateToken(usersMock[1])}`);

    expect(unauthorized.status).toBe(401);
    done();
  });

  test('Can admin get webhook events by query', async (done) => {
    await WebhookEvent.bulkCreate(webhookEventMock);
    await User.bulkCreate(usersMock);

    const eventsByIdQuery = await request(app)
      .get('/api/v1/webhooks/admin/events')
      .query({ id: 1 })
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(eventsByIdQuery.status).toBe(200);
    expect(eventsByIdQuery.body).toHaveLength(1);
    expect(eventsByIdQuery.body[0].name)
      .toBe(webhookEventMock.find((elem) => elem.id === 1).name);

    const eventsByNameQuery = await request(app)
      .get('/api/v1/webhooks/admin/events')
      .query({ name: 'submittedChallenge' })
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(eventsByNameQuery.status).toBe(200);
    expect(eventsByNameQuery.body).toHaveLength(1);
    expect(eventsByNameQuery.body[0].name)
      .toBe(webhookEventMock.find((elem) => elem.name === 'submittedChallenge').name);

    const unauthorized = await request(app)
      .get('/api/v1/webhooks/admin/events')
      .query({ name: 'submittedChallenge' })
      .set('authorization', `bearer ${generateToken(usersMock[1])}`);

    expect(unauthorized.status).toBe(401);
    done();
  });

  test('Can admin add new webhook event to the system', async (done) => {
    await WebhookEvent.bulkCreate(webhookEventMock);
    await User.bulkCreate(usersMock);

    const allEventsBeforeAdded = await request(app)
      .get('/api/v1/webhooks/admin/events')
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(allEventsBeforeAdded.status).toBe(200);
    expect(allEventsBeforeAdded.body).toHaveLength(webhookEventMock.length);

    const newEvent = await request(app)
      .post('/api/v1/webhooks/admin/events')
      .send({ name: 'finishRegistration' })
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(newEvent.status).toBe(201);

    const allEventsAfterAdded = await request(app)
      .get('/api/v1/webhooks/admin/events')
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(allEventsAfterAdded.status).toBe(200);
    expect(allEventsAfterAdded.body).toHaveLength(webhookEventMock.length + 1);

    const unauthorized = await request(app)
      .post('/api/v1/webhooks/admin/events')
      .send({ name: 'finishRegistration' })
      .set('authorization', `bearer ${generateToken(usersMock[1])}`);

    expect(unauthorized.status).toBe(401);
    done();
  });

  test('Can admin edit webhook event on the system', async (done) => {
    await WebhookEvent.bulkCreate(webhookEventMock);
    await User.bulkCreate(usersMock);

    const eventsByIdQuery = await request(app)
      .get('/api/v1/webhooks/admin/events')
      .query({ id: 1 })
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(eventsByIdQuery.status).toBe(200);
    expect(eventsByIdQuery.body).toHaveLength(1);
    expect(eventsByIdQuery.body[0].name)
      .toBe(webhookEventMock.find((elem) => elem.id === 1).name);

    const changedAccessKet = await request(app)
      .patch('/api/v1/webhooks/admin/events/1')
      .send({ name: 'finishRegistration' })
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(changedAccessKet.status).toBe(200);
    expect(changedAccessKet.body.message).toBe('Update Success');

    const eventsByIdQuery2 = await request(app)
      .get('/api/v1/webhooks/admin/events')
      .query({ id: 1 })
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(eventsByIdQuery2.status).toBe(200);
    expect(eventsByIdQuery2.body).toHaveLength(1);
    expect(eventsByIdQuery2.body[0].name).toBe('finishRegistration');

    const unauthorized = await request(app)
      .patch('/api/v1/webhooks/admin/events/1')
      .send({ name: 'finishRegistration' })
      .set('authorization', `bearer ${generateToken(usersMock[1])}`);

    expect(unauthorized.status).toBe(401);
    done();
  });

  test('Can admin delete webhook event from the system', async (done) => {
    await WebhookEvent.bulkCreate(webhookEventMock);
    await User.bulkCreate(usersMock);

    const allEventsBeforeDelete = await request(app)
      .get('/api/v1/webhooks/admin/events')
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(allEventsBeforeDelete.status).toBe(200);
    expect(allEventsBeforeDelete.body).toHaveLength(webhookEventMock.length);

    const removeEvent = await request(app)
      .delete('/api/v1/webhooks/admin/events/1')
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(removeEvent.status).toBe(204);

    const allEventsAfterAdded = await request(app)
      .get('/api/v1/webhooks/admin/events')
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(allEventsAfterAdded.status).toBe(200);
    expect(allEventsAfterAdded.body).toHaveLength(webhookEventMock.length - 1);

    const unauthorized = await request(app)
      .delete('/api/v1/webhooks/admin/events/1')
      .set('authorization', `bearer ${generateToken(usersMock[1])}`);

    expect(unauthorized.status).toBe(401);
    done();
  });
});
