const request = require('supertest');
const app = require('../../../../app');
const { WebhookTeamError, User } = require('../../../../models');
const { generateToken } = require('../../../utils');
const { webhookTeamErrorMock, usersMock } = require('../../../mocks');

describe('Testing assignments routes', () => {
  beforeEach(async () => {
    await WebhookTeamError.destroy({ truncate: true, force: true });
    await User.destroy({ truncate: true, force: true });
  });

  test('Can admin get all webhook errors', async (done) => {
    await WebhookTeamError.bulkCreate(webhookTeamErrorMock);
    await User.bulkCreate(usersMock);

    const allErrors = await request(app)
      .get('/api/v1/webhooks/admin/errors')
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(allErrors.status).toBe(200);
    expect(allErrors.body).toHaveLength(webhookTeamErrorMock.length);

    const unauthorized = await request(app)
      .get('/api/v1/webhooks/admin/errors')
      .set('authorization', `bearer ${generateToken(usersMock[1])}`);

    expect(unauthorized.status).toBe(401);
    done();
  });

  test('Can admin get webhook errors by query', async (done) => {
    await WebhookTeamError.bulkCreate(webhookTeamErrorMock);
    await User.bulkCreate(usersMock);

    const accessKeysByIdQuery = await request(app)
      .get('/api/v1/webhooks/admin/errors')
      .query({ id: 2 })
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(accessKeysByIdQuery.status).toBe(200);
    expect(accessKeysByIdQuery.body).toHaveLength(1);
    expect(accessKeysByIdQuery.body[0].webhookId)
      .toBe(webhookTeamErrorMock.find((elem) => elem.id === 2).webhookId);

    const unauthorized = await request(app)
      .get('/api/v1/webhooks/admin/errors')
      .query({ name: 'amazon' })
      .set('authorization', `bearer ${generateToken(usersMock[1])}`);

    expect(unauthorized.status).toBe(401);
    done();
  });

  test('Can admin delete webhook error from the system', async (done) => {
    await WebhookTeamError.bulkCreate(webhookTeamErrorMock);
    await User.bulkCreate(usersMock);

    const allErrorsBeforeDelete = await request(app)
      .get('/api/v1/webhooks/admin/errors')
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(allErrorsBeforeDelete.status).toBe(200);
    expect(allErrorsBeforeDelete.body).toHaveLength(webhookTeamErrorMock.length);

    const removeAccessKey = await request(app)
      .delete('/api/v1/webhooks/admin/errors/1')
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(removeAccessKey.status).toBe(204);

    const allErrorsAfterAdded = await request(app)
      .get('/api/v1/webhooks/admin/errors')
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(allErrorsAfterAdded.status).toBe(200);
    expect(allErrorsAfterAdded.body).toHaveLength(webhookTeamErrorMock.length - 1);

    const unauthorized = await request(app)
      .delete('/api/v1/webhooks/admin/errors/1')
      .set('authorization', `bearer ${generateToken(usersMock[1])}`);

    expect(unauthorized.status).toBe(401);
    done();
  });
});
