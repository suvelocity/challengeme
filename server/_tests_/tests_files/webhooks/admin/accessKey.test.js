const request = require('supertest');
const app = require('../../../../app');
const { WebhookAccessKey, User } = require('../../../../models');
const { generateToken } = require('../../../utils');
const { webhookAccessKeyMock, usersMock } = require('../../../mocks');

describe('Testing assignments routes', () => {
  beforeEach(async () => {
    await WebhookAccessKey.destroy({ truncate: true, force: true });
    await User.destroy({ truncate: true, force: true });
  });

  test('Can admin get all webhook access keys', async (done) => {
    await WebhookAccessKey.bulkCreate(webhookAccessKeyMock);
    await User.bulkCreate(usersMock);
    const allAccessKeys = await request(app)
      .get('/api/v1/webhooks/admin/access-key')
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(allAccessKeys.status).toBe(200);
    expect(allAccessKeys.body).toHaveLength(webhookAccessKeyMock.length);

    const unauthorized = await request(app)
      .get('/api/v1/webhooks/admin/access-key')
      .set('authorization', `bearer ${generateToken(usersMock[1])}`);

    expect(unauthorized.status).toBe(401);
    done();
  });

  test('Can admin get webhook access keys by query', async (done) => {
    await WebhookAccessKey.bulkCreate(webhookAccessKeyMock);
    await User.bulkCreate(usersMock);

    const accessKeysByIdQuery = await request(app)
      .get('/api/v1/webhooks/admin/access-key')
      .query({ id: 1 })
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(accessKeysByIdQuery.status).toBe(200);
    expect(accessKeysByIdQuery.body).toHaveLength(1);
    expect(accessKeysByIdQuery.body[0].entityName)
      .toBe(webhookAccessKeyMock.find((elem) => elem.id === 1).entityName);

    const accessKeysByNameQuery = await request(app)
      .get('/api/v1/webhooks/admin/access-key')
      .query({ name: 'amazon' })
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(accessKeysByNameQuery.status).toBe(200);
    expect(accessKeysByNameQuery.body).toHaveLength(1);
    expect(accessKeysByNameQuery.body[0].entityName)
      .toBe(webhookAccessKeyMock.find((elem) => elem.entityName === 'amazon').entityName);

    const unauthorized = await request(app)
      .get('/api/v1/webhooks/admin/access-key')
      .query({ name: 'amazon' })
      .set('authorization', `bearer ${generateToken(usersMock[1])}`);

    expect(unauthorized.status).toBe(401);
    done();
  });

  test('Can admin add new webhook access key to the system', async (done) => {
    await WebhookAccessKey.bulkCreate(webhookAccessKeyMock);
    await User.bulkCreate(usersMock);

    const allAccessKeysBeforeAdded = await request(app)
      .get('/api/v1/webhooks/admin/access-key')
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(allAccessKeysBeforeAdded.status).toBe(200);
    expect(allAccessKeysBeforeAdded.body).toHaveLength(webhookAccessKeyMock.length);

    const newAccessKey = await request(app)
      .post('/api/v1/webhooks/admin/access-key')
      .send({ entityName: 'david', email: 'david@email.com' })
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(newAccessKey.status).toBe(201);
    expect(typeof newAccessKey.body.key).toBe('string');

    const allAccessKeysAfterAdded = await request(app)
      .get('/api/v1/webhooks/admin/access-key')
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(allAccessKeysAfterAdded.status).toBe(200);
    expect(allAccessKeysAfterAdded.body).toHaveLength(webhookAccessKeyMock.length + 1);

    const unauthorized = await request(app)
      .post('/api/v1/webhooks/admin/access-key')
      .send({ entityName: 'david', email: 'david@email.com' })
      .set('authorization', `bearer ${generateToken(usersMock[1])}`);

    expect(unauthorized.status).toBe(401);
    done();
  });

  test('Can admin edit webhook access key on the system', async (done) => {
    await WebhookAccessKey.bulkCreate(webhookAccessKeyMock);
    await User.bulkCreate(usersMock);

    const accessKeysByIdQuery = await request(app)
      .get('/api/v1/webhooks/admin/access-key')
      .query({ id: 1 })
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(accessKeysByIdQuery.status).toBe(200);
    expect(accessKeysByIdQuery.body).toHaveLength(1);
    expect(accessKeysByIdQuery.body[0].entityName)
      .toBe(webhookAccessKeyMock.find((elem) => elem.id === 1).entityName);

    const changedAccessKet = await request(app)
      .patch('/api/v1/webhooks/admin/access-key/1')
      .send({ entityName: 'david', email: 'david@email.com' })
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(changedAccessKet.status).toBe(200);
    expect(changedAccessKet.body.message).toBe('Update Success');

    const accessKeysByIdQuery2 = await request(app)
      .get('/api/v1/webhooks/admin/access-key')
      .query({ id: 1 })
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(accessKeysByIdQuery2.status).toBe(200);
    expect(accessKeysByIdQuery2.body).toHaveLength(1);
    expect(accessKeysByIdQuery2.body[0].entityName).toBe('david');

    const unauthorized = await request(app)
      .patch('/api/v1/webhooks/admin/access-key/1')
      .send({ entityName: 'david', email: 'david@email.com' })
      .set('authorization', `bearer ${generateToken(usersMock[1])}`);

    expect(unauthorized.status).toBe(401);
    done();
  });

  test('Can admin delete webhook access key from the system', async (done) => {
    await WebhookAccessKey.bulkCreate(webhookAccessKeyMock);
    await User.bulkCreate(usersMock);

    const allAccessKeysBeforeDelete = await request(app)
      .get('/api/v1/webhooks/admin/access-key')
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(allAccessKeysBeforeDelete.status).toBe(200);
    expect(allAccessKeysBeforeDelete.body).toHaveLength(webhookAccessKeyMock.length);

    const removeAccessKey = await request(app)
      .delete('/api/v1/webhooks/admin/access-key/1')
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(removeAccessKey.status).toBe(204);

    const allAccessKeysAfterAdded = await request(app)
      .get('/api/v1/webhooks/admin/access-key')
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(allAccessKeysAfterAdded.status).toBe(200);
    expect(allAccessKeysAfterAdded.body).toHaveLength(webhookAccessKeyMock.length - 1);

    const unauthorized = await request(app)
      .delete('/api/v1/webhooks/admin/access-key/1')
      .set('authorization', `bearer ${generateToken(usersMock[1])}`);

    expect(unauthorized.status).toBe(401);
    done();
  });
});
